import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const GAP = 12;
const MEDIA_BASE = "https://messerschmiede-schwaiger.at/api/images/gallery";

// How many images to preload ahead of the last fully-loaded one.
// 1 = strictly sequential, 2-3 = slight look-ahead for smoother UX.
const PRELOAD_AHEAD = 2;

function getColumnCount(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): T {
  let t: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ─── Sequential Loader ────────────────────────────────────────────────────────
// Manages which indices are allowed to start loading.
// loadedUpTo = highest index that has fully loaded.
// allowedUpTo = loadedUpTo + PRELOAD_AHEAD (next items are pre-fetched).

function useSequentialLoader(total: number) {
  // Index of the highest item that has finished loading (-1 = nothing done yet)
  const [loadedUpTo, setLoadedUpTo] = useState(-1);

  const markLoaded = useCallback((index: number) => {
    setLoadedUpTo((prev) => {
      // Only advance if this is the next expected item.
      // Out-of-order completions (e.g. cached images) advance to their index.
      return Math.max(prev, index);
    });
  }, []);

  // How far ahead we allow loading
  const allowedUpTo = Math.min(loadedUpTo + PRELOAD_AHEAD, total - 1);

  return { allowedUpTo, markLoaded };
}

// ─── Layout Engine ────────────────────────────────────────────────────────────

interface PositionedItem {
  index: number;
  top: number;
  left: number;
  width: number;
}

function computeLayout(
  heights: Map<number, number>,
  containerWidth: number,
  columnCount: number,
  itemCount: number
): { positions: PositionedItem[]; totalHeight: number } {
  const colWidth = (containerWidth - GAP * (columnCount - 1)) / columnCount;
  const colHeights = new Array<number>(columnCount).fill(0);
  const positions: PositionedItem[] = [];

  for (let i = 0; i < itemCount; i++) {
    const h = heights.get(i);
    if (h === undefined) continue;

    const col = colHeights.indexOf(Math.min(...colHeights));

    positions.push({
      index: i,
      top: colHeights[col],
      left: col * (colWidth + GAP),
      width: colWidth,
    });

    colHeights[col] += h + GAP;
  }

  const totalHeight = Math.max(0, Math.max(...colHeights) - GAP);
  return { positions, totalHeight };
}

// ─── MediaCard ────────────────────────────────────────────────────────────────

interface MediaCardProps {
  src: string;
  index: number;
  /** Whether this item is allowed to start loading yet */
  canLoad: boolean;
  /** Called once the media has fully loaded and has a real height */
  onReady: (index: number, height: number) => void;
  /** Show the visible card (true) or the invisible probe (false) */
  visible?: boolean;
}

function MediaCard({ src, index, canLoad, onReady, visible = true }: MediaCardProps) {
  const ref = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const reportedHeight = useRef(-1);
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const lowerSrc = src.toLowerCase();
  const isVideo =
    lowerSrc.endsWith(".mp4") ||
    lowerSrc.endsWith(".webm") ||
    lowerSrc.endsWith(".mov");

  // Report height once the element has real dimensions in the DOM
  useEffect(() => {
    if (!canLoad) return;
    const el = ref.current;
    if (!el) return;

    const tryReport = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0 && h !== reportedHeight.current) {
        reportedHeight.current = h;
        onReady(index, h);
      }
    };

    const ro = new ResizeObserver(tryReport);
    ro.observe(el);
    tryReport();

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canLoad]);

  const fullSrc = canLoad ? `${MEDIA_BASE}/${src}` : undefined;

  const handleLoad = () => {
    setFullyLoaded(true);
    const el = ref.current;
    if (el) {
      const h = el.getBoundingClientRect().height;
      if (h > 0) {
        reportedHeight.current = h;
        onReady(index, h);
      }
    }
  };

  if (isVideo) {
    return (
      <video
        ref={ref}
        src={fullSrc}
        className="block w-full rounded-md"
        style={visible ? { opacity: fullyLoaded ? 1 : 0, transition: "opacity 0s" } : undefined}
        muted
        loop
        playsInline
        autoPlay
        preload={canLoad ? "metadata" : "none"}
        onLoadedMetadata={handleLoad}
        onCanPlay={handleLoad}
      />
    );
  }

  return (
    <img
      ref={ref}
      src={fullSrc}
      alt={`Galerie ${index + 1}`}
      decoding="sync"
      className="block w-full rounded-md"
      // Hidden until fully decoded — no progressive pixel rows
      style={visible ? { opacity: fullyLoaded ? 1 : 0, transition: "opacity 0s" } : undefined}
      onLoad={handleLoad}
      onError={handleLoad} // also unblock queue on error
    />
  );
}

// ─── MasonryGrid ──────────────────────────────────────────────────────────────

interface MasonryGridProps {
  media: string[];
}

function MasonryGrid({ media }: MasonryGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [columnCount, setColumnCount] = useState(0);

  const heights = useRef<Map<number, number>>(new Map());
  const heightsEpoch = useRef(0);

  const [, forceRender] = useState(0);
  const scheduleRender = useCallback(() => forceRender((n) => n + 1), []);

  // Sequential loader: controls which items may start fetching
  const { allowedUpTo, markLoaded } = useSequentialLoader(media.length);

  // ── ResizeObserver on sentinel ─────────────────────────────────────────────
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const apply = (width: number) => {
      if (width <= 0) return;
      const cols = getColumnCount(width);
      setContainerWidth(width);
      setColumnCount((prev) => {
        if (prev !== cols) {
          heights.current = new Map();
          heightsEpoch.current += 1;
          scheduleRender();
        }
        return cols;
      });
    };

    const ro = new ResizeObserver(
      debounce((entries: ResizeObserverEntry[]) => {
        apply(entries[0].contentRect.width);
      }, 80)
    );

    ro.observe(el);
    apply(el.getBoundingClientRect().width);

    return () => ro.disconnect();
  }, [scheduleRender]);

  // ── Height + load callback ─────────────────────────────────────────────────
  const currentEpoch = heightsEpoch.current;

  const handleReady = useCallback(
    (index: number, h: number) => {
      if (heights.current.get(index) !== h) {
        heights.current.set(index, h);
        scheduleRender();
      }
      // Advance the sequential loader
      markLoaded(index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scheduleRender, markLoaded]
  );

  // ── Layout ────────────────────────────────────────────────────────────────
  const { positions, totalHeight } =
    containerWidth > 0 && columnCount > 0
      ? computeLayout(heights.current, containerWidth, columnCount, media.length)
      : { positions: [], totalHeight: 0 };

  const colWidth =
    containerWidth > 0 && columnCount > 0
      ? (containerWidth - GAP * (columnCount - 1)) / columnCount
      : 0;

  const placedIndices = new Set(positions.map((p) => p.index));

  // Probe items: not yet placed, but allowed to load (for height measurement)
  const probingIndices =
    colWidth > 0
      ? media.map((_, i) => i).filter((i) => !placedIndices.has(i) && i <= allowedUpTo)
      : [];

  return (
    <div style={{ position: "relative", width: "100%" }}>

      {/* Sentinel — gives ResizeObserver the real container width */}
      <div
        ref={sentinelRef}
        style={{ width: "100%", height: 0, overflow: "hidden" }}
        aria-hidden="true"
      />

      {/* Invisible probe area — items load here to get their height measured */}
      {probingIndices.length > 0 && colWidth > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: colWidth,
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          {probingIndices.map((i) => (
            <MediaCard
              key={`probe-${i}-${columnCount}`}
              src={media[i]}
              index={i}
              canLoad={i <= allowedUpTo}
              onReady={handleReady}
              visible={false}
            />
          ))}
        </div>
      )}

      {/* Positioned masonry layout — items appear only after fully loaded */}
      <div style={{ position: "relative", width: "100%", height: totalHeight }}>
        {positions.map((pos) => (
          <motion.div
            key={`item-${pos.index}-${columnCount}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              width: pos.width,
            }}
            className="overflow-hidden rounded-md group cursor-pointer"
            whileHover={{ scale: 1.015, zIndex: 10 }}
          >
            <MediaCard
              src={media[pos.index]}
              index={pos.index}
              canLoad={pos.index <= allowedUpTo}
              onReady={handleReady}
              visible
            />
            <div
              className="absolute inset-0 rounded-md bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function Gallery() {
  const [media, setMedia] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Galerie | Messerschmiede Schwaiger";

    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "https://messerschmiede-schwaiger.at/api/gallery"
        );
        if (response.ok) {
          const data: string[] = await response.json();
          setMedia(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-amber-500 text-lg tracking-widest uppercase"
        >
          Lade…
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen pt-24 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-amber-500 text-center text-4xl mb-10"
      >
        Galerie
      </motion.h1>

      <div className="max-w-7xl mx-auto pb-16">
        {media.length === 0 ? (
          <p className="text-neutral-400 text-center">Keine Bilder vorhanden.</p>
        ) : (
          <MasonryGrid media={media} />
        )}
      </div>
    </div>
  );
}