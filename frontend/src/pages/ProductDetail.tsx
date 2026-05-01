import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Check, Loader2, ChevronLeft, ChevronRight, Phone, Mail, X } from "lucide-react";

const API_BASE_URL = "https://messerschmiede-schwaiger.at/api";

interface Spec {
  label: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: string | number;
  description: string;
  long_description: string;
  image: string;      // Der Ordnername des Produkts
  images: string[];   // Enthält Pfade wie ["main/bild1.jpg", "galerie2.jpg"]
  features: string[];
  specifications: Spec[];
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!product?.images) return;
    setCurrentImgIdx((prev) => (prev + 1) % product.images.length);
  }, [product?.images]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!product?.images) return;
    setCurrentImgIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  }, [product?.images]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    fetch(`${API_BASE_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Fehler! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        // SEO: Titel dynamisch setzen
        document.title = `${data.name} - ${data.category} | Messerschmiede Schwaiger`;
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      });
  }, [id]);

  // Keyboard Navigation für Lightbox & Slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);

  const getImageUrl = (imgName: string) => 
    `${API_BASE_URL}/images/${product?.image}/${imgName}`;

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen flex flex-col items-center justify-center text-amber-500">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-neutral-500 font-serif italic">Meisterstück wird geladen...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-neutral-950 min-h-screen flex flex-col items-center justify-center text-white p-4">
        <p className="text-xl mb-6">Messer wurde nicht gefunden.</p>
        <Link to="/produkte" className="bg-amber-600 px-6 py-2 uppercase text-sm tracking-widest hover:bg-amber-700 transition-colors">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen py-8 md:py-16">
      {/* LIGHTBOX */}
      {isLightboxOpen && product.images && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors z-[110]">
            <X size={40} />
          </button>
          <img
            src={getImageUrl(product.images[currentImgIdx])}
            alt={product.name}
            className="max-w-full max-h-full object-contain shadow-2xl transition-all"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/produkte")}
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-amber-500 transition-colors mb-10 group uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Zurück zur Kollektion
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* BILDER SLIDER */}
          <div className="space-y-4">
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative aspect-square bg-neutral-900 border border-amber-900/10 group overflow-hidden shadow-2xl cursor-zoom-in rounded-sm"
            >
              {product.images && product.images.length > 0 ? (
                <img
                  src={getImageUrl(product.images[currentImgIdx])}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-700">Kein Bild verfügbar</div>
              )}

              {/* PFEILE */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 p-2 text-white hover:bg-amber-600 rounded-full z-10 transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 p-2 text-white hover:bg-amber-600 rounded-full z-10 transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS (Vorschau-Bilder unten) */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIdx(idx)}
                    className={`relative w-20 h-20 flex-shrink-0 border-2 transition-all ${
                      idx === currentImgIdx ? "border-amber-600 scale-95" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={getImageUrl(img)} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUKT-INFOS */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-amber-600 text-xs md:text-sm uppercase tracking-[0.2em] mb-3 font-bold">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 uppercase tracking-tighter">{product.name}</h1>
              <div className="h-1 w-20 bg-amber-600 mb-6"></div>
              <p className="text-3xl md:text-4xl text-amber-500 font-serif">
                €{(Number(product.price) || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-neutral-300 leading-relaxed text-lg mb-10 whitespace-pre-line italic font-light">
                {product.long_description || product.description}
              </p>
            </div>

            {/* Eigenschaften & Specs in Tabs oder Sektionen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {product.features && product.features.length > 0 && (
                <div>
                  <h2 className="text-amber-500 uppercase text-sm tracking-widest font-bold mb-4 border-b border-amber-900/30 pb-2">Highlights</h2>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-400 text-sm">
                        <Check className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.specifications && product.specifications.length > 0 && (
                <div>
                  <h2 className="text-amber-500 uppercase text-sm tracking-widest font-bold mb-4 border-b border-amber-900/30 pb-2">Datenblatt</h2>
                  <dl className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <dt className="text-neutral-500">{spec.label}</dt>
                        <dd className="text-neutral-300 font-medium">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* Kontakt-Box */}
            <div className="mt-auto bg-neutral-900 border-l-4 border-amber-600 p-8 shadow-2xl">
              <h3 className="text-xl text-white mb-4 uppercase tracking-wider font-serif">Interesse an diesem Unikat?</h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Da jedes unserer Messer ein handgefertigtes Einzelstück ist, bitten wir um direkte Kontaktaufnahme für Kaufanfragen oder Reservierungen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:info@messerschmiede-schwaiger.at" className="flex-1 bg-amber-600 text-white py-3 px-4 flex items-center justify-center gap-2 hover:bg-amber-700 transition-all uppercase text-xs font-bold tracking-widest">
                  <Mail size={16} /> Anfrage per Mail
                </a>
                <a href="tel:+4367763547065" className="flex-1 border border-amber-600 text-amber-500 py-3 px-4 flex items-center justify-center gap-2 hover:bg-amber-600 hover:text-white transition-all uppercase text-xs font-bold tracking-widest">
                  <Phone size={16} /> +43 677 635 47065
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}