import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const GAP = 12;
const MEDIA_BASE = "https://messerschmiede-schwaiger.at/api/images/gallery";

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
  onHeight: (index: number, height: number) => void;
}

function MediaCard({ src, index, onHeight }: MediaCardProps) {
  const ref = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const reported = useRef(false);

  const fullSrc = `${MEDIA_BASE}/${src}`;
  const lowerSrc = src.toLowerCase();
  const isVideo =
    lowerSrc.endsWith(".mp4") ||
    lowerSrc.endsWith(".webm") ||
    lowerSrc.endsWith(".mov");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryReport = () => {
      if (reported.current) return;
      const h = el.getBoundingClientRect().height;
      if (h > 0) {
        reported.current = true;
        onHeight(index, h);
      }
    };

    const ro = new ResizeObserver(tryReport);
    ro.observe(el);
    tryReport();

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isVideo) {
    return (
      <video
        ref={ref}
        src={fullSrc}
        className="block w-full rounded-md"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
    );
  }

  return (
    <img
      ref={ref}
      src={fullSrc}
      alt={`Galerie ${index + 1}`}
      loading="lazy"
      decoding="async"
      className="block w-full rounded-md"
    />
  );
}

// ─── MasonryGrid ──────────────────────────────────────────────────────────────

interface MasonryGridProps {
  media: string[];
}

function MasonryGrid({ media }: MasonryGridProps) {
  // sentinelRef: a normal in-flow div that gives us the real container width.
  // This is separate from the probe container so nothing interferes with it.
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [columnCount, setColumnCount] = useState(0);

  // Measured heights. Key = item index. Reset when columnCount changes.
  const heights = useRef<Map<number, number>>(new Map());
  // Track which columnCount the heights belong to, to discard stale callbacks.
  const heightsEpoch = useRef(0);

  const [, forceRender] = useState(0);
  const scheduleRender = useCallback(() => forceRender((n) => n + 1), []);

  // ── ResizeObserver on the sentinel ────────────────────────────────────────
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const apply = (width: number) => {
      if (width <= 0) return;
      const cols = getColumnCount(width);

      setContainerWidth(width);
      setColumnCount((prev) => {
        if (prev !== cols) {
          // Column count changed — measurements are no longer valid
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
    // Read synchronously so the very first render already has real values
    apply(el.getBoundingClientRect().width);

    return () => ro.disconnect();
  }, [scheduleRender]);

  // ── Height callback from probe items ──────────────────────────────────────
  const currentEpoch = heightsEpoch.current;
  const handleHeight = useCallback(
    (index: number, h: number, epoch: number) => {
      if (epoch !== heightsEpoch.current) return; // stale measurement
      if (heights.current.get(index) === h) return; // no change
      heights.current.set(index, h);
      scheduleRender();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scheduleRender]
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

  const probingIndices =
    colWidth > 0
      ? media.map((_, i) => i).filter((i) => !placedIndices.has(i))
      : [];

  return (
    // Wrapper is position:relative so the absolute children are contained.
    // It has real width from being a normal block element inside the page flow.
    <div style={{ position: "relative", width: "100%" }}>

      {/* ── Sentinel: in-flow, full-width, zero-height ──────────────────────
          The ResizeObserver watches THIS element for the container width.
          It lives in the normal flow so the browser always gives it the
          correct width — unlike fixed/absolute positioned elements.        */}
      <div
        ref={sentinelRef}
        style={{ width: "100%", height: 0, overflow: "hidden" }}
        aria-hidden="true"
      />

      {/* ── Probe container: off-screen, real column width ──────────────────
          Items here are rendered at the exact column width they'll have in
          the final layout so their natural aspect-ratio height is correct.
          Uses the sentinel's measured colWidth, NOT 100%.                  */}
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
          {probingIndices.map((i) => {
            const epoch = currentEpoch;
            return (
              <MediaCard
                key={`probe-${i}-${columnCount}`}
                src={media[i]}
                index={i}
                onHeight={(idx, h) => handleHeight(idx, h, epoch)}
              />
            );
          })}
        </div>
      )}

      {/* ── Positioned masonry layout ──────────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: totalHeight }}>
        {positions.map((pos) => (
          <motion.div
            key={`item-${pos.index}-${columnCount}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: Math.min(pos.index * 0.04, 0.6),
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
              onHeight={(idx, h) => handleHeight(idx, h, currentEpoch)}
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