import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, Hammer, Award, ArrowRight, Scissors, Zap } from "lucide-react";

// Interface an die neue Backend-Struktur angepasst
interface Product {
  id: number;
  name: string;
  price: string | number;
  description: string;
  category: string;
  image: string;      // Ordnername
  mainImage?: string; // Pfad vom Backend (z.B. "amber/main/bild.jpg")
}

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const API_BASE = "https://messerschmiede-schwaiger.at/api";
  const heroHeight = "500px";

  useEffect(() => {
    // --- SEO OPTIMIERUNG ---
    document.title = "Messerschmiede Schwaiger | Handgefertigte Messer & Unikate";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Exklusive handgeschmiedete Messer aus Meisterhand. Entdecken Sie unsere Unikate, Profi-Schleifservice und präzisen Härteservice in Oberösterreich.");
    }

    // --- DATEN FETCH ---
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Die ersten 3 Messer als "Featured"
          setFeaturedProducts(data.slice(0, 3));
        }
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Home-Produkte:", err);
      });
  }, []);

  return (
    <div className="bg-neutral-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden py-8 md:py-12">
        <div className="absolute inset-0 z-0 w-full" style={{ height: heroHeight }}>
          {/* Korrigiertes Hintergrundbild */}
          <img
            src={`${API_BASE}/images/page/Schmiede.jpg`}
            alt="Schmiede"
            // Zentrierung aus der Mitte und volle Abdeckung
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-w-full object-cover object-center"
            style={{
              height: heroHeight,
              minHeight: heroHeight,
              maxWidth: 'none' // Ignoriert das max-width der index.html
            }}
          />

          {/* Verlauf-Overlay passend zur festen Höhe */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950"
            style={{ height: heroHeight }}
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 min-w-0">
          <div className="flex flex-col items-center justify-center text-center w-full min-w-0">
            <Flame className="text-amber-500 w-10 h-10 md:w-16 md:h-16 mb-4 md:mb-6 shrink-0" />

            <h1 className="font-serif text-white mb-6 leading-[1.1] uppercase w-full text-[8vw] sm:text-[7vw] lg:text-7xl break-words hyphens-auto tracking-tighter sm:tracking-wide text-center">
              <span className="block sm:inline">Handgeschmiedete</span>
              <br className="hidden sm:block" />
              <span className="text-amber-500 block sm:inline"> Meisterwerke</span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-neutral-300 mb-8 max-w-[90%] sm:max-w-2xl mx-auto leading-relaxed">
              Jedes Messer ein Unikat. <br />
              Geschmiedet mit Leidenschaft und Präzision.
            </p>

            <div className="flex justify-center w-full px-4">
              <Link
                to="/produkte"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 md:px-8 md:py-4 uppercase tracking-wide transition-all text-xs sm:text-base whitespace-nowrap shadow-xl origin-center scale-150 md:scale-100"
              >
                Messer entdecken <ArrowRight size={18} className="shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="hidden md:block py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Hammer className="text-amber-500 w-8 h-8" />}
              title="Handarbeit"
              text="Jedes Messer wird von Hand geschmiedet und individuell bearbeitet."
            />
            <FeatureCard
              icon={<Award className="text-amber-500 w-8 h-8" />}
              title="Meisterqualität"
              text="Handwerkskunst für langlebige und scharfe Messer."
            />
            <FeatureCard
              icon={<Flame className="text-amber-500 w-8 h-8" />}
              title="Beste Materialien"
              text="Hochwertige Stähle und edle Hölzer für höchste Langlebigkeit."
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="pt-2 pb-20 md:py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-amber-500 mb-4 uppercase">Ausgewählte Messer</h2>
            <p className="text-neutral-400">Eine Auswahl unserer handfertigten Meisterstücke</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              // NEUE LOGIK: Nutzt das mainImage Feld aus der server.js
              const imagePath = product.mainImage
                ? `${API_BASE}/images/${product.mainImage}`
                : `${API_BASE}/images/${product.image}/main.jpg`;

              return (
                <Link
                  key={product.id}
                  to={`/produkte/${product.id}`}
                  className="group bg-neutral-900 border border-amber-900/20 hover:border-amber-600/50 transition-all overflow-hidden flex flex-col"
                >
                  <div className="aspect-square overflow-hidden bg-neutral-800">
                    <img
                      src={`${imagePath}`} // Zeitstempel gegen Cache-Probleme
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('placeholder')) {
                          target.src = "https://via.placeholder.com/600x600.png?text=Bild+nicht+gefunden";
                        }
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-amber-600 text-xs uppercase tracking-wide mb-2">{product.category}</p>
                    <h3 className="text-xl text-white mb-2 group-hover:text-amber-500 transition-colors font-serif italic">{product.name}</h3>
                    <p className="text-2xl text-amber-500 font-serif">
                      €{Number(product.price).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </Link>
              );
            })}
            <div className="col-span-full flex justify-center w-full px-4">
              <Link
                to="/produkte"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 md:px-8 md:py-4 uppercase tracking-wide transition-all text-xs sm:text-base whitespace-nowrap shadow-xl origin-center scale-150 md:scale-100"
              >
                Alle Messer <ArrowRight size={18} className="shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceLink
            to="/schleifservice"
            icon={<Scissors size={32} />}
            title="Schleifservice"
            desc="Professionelles Schleifen für rasiermesserscharfe Ergebnisse."
          />
          <ServiceLink
            to="/härteservice"
            icon={<Zap size={32} />}
            title="Härteservice"
            desc="Hochpräzise Wärmebehandlung für Ihre eigenen Klingen."
          />
        </div>
      </section>
    </div>
  );
}

// Hilfskomponenten (unverändert)
function FeatureCard({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-900/20 rounded-full mb-8 group-hover:bg-amber-900/40 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl text-amber-500 mb-4 uppercase tracking-widest">{title}</h3>
      <p className="text-neutral-400 leading-relaxed text-sm">{text}</p>
    </div>
  );
}

function ServiceLink({ to, icon, title, desc }: { to: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Link to={to} className="group flex flex-col justify-between bg-neutral-950 border border-amber-900/20 hover:border-amber-600/50 transition-all p-8 h-full">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-amber-900/30 flex items-center justify-center rounded-full text-amber-500">
            {icon}
          </div>
          <h3 className="text-2xl text-amber-500 uppercase tracking-wide">{title}</h3>
        </div>
        <p className="text-neutral-300 mb-6">{desc}</p>
      </div>

      <div className="flex justify-end">
        <div className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 bg-amber-600 text-black md:bg-transparent md:text-amber-500 md:border md:border-amber-600/50 md:group-hover:bg-amber-600 md:group-hover:text-black md:group-hover:translate-x-2">
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}