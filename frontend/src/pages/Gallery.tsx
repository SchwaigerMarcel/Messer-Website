import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Gallery() {
  // Fehler behoben: useState korrekt initialisiert mit Typ-String-Array
  const [media, setMedia] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Galerie | Messerschmiede Schwaiger";
    
    // Daten vom neuen Backend-Endpunkt abrufen
    const fetchGallery = async () => {
      try {
        const response = await fetch("https://messerschmiede-schwaiger.at/api/gallery");
        if (response.ok) {
          const data = await response.json();
          setMedia(data);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Galerie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-amber-500 animate-pulse uppercase tracking-widest">Lade Handwerk...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen pt-24 pb-12 px-4 overflow-x-hidden">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-500 text-center mb-12 uppercase tracking-widest"
      >
        Galerie
      </motion.h1>
      
      {media.length === 0 ? (
        <p className="text-neutral-500 text-center">Noch keine Werke in der Galerie.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
          {/* Fehler behoben: Parameter 'item' und 'index' haben jetzt Typen */}
          {media.map((item: string, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
              className="break-inside-avoid border border-amber-900/20 group hover:border-amber-600/50 transition-all overflow-hidden bg-neutral-900"
            >
              {item.toLowerCase().endsWith('.mp4') || item.toLowerCase().endsWith('.mov') ? (
                <video 
                  src={`https://messerschmiede-schwaiger.at/api/images/gallery/${item}`} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-auto"
                />
              ) : (
                <img 
                  src={`https://messerschmiede-schwaiger.at/api/images/gallery/${item}`} 
                  alt={`Schmiedearbeit ${index + 1}`} 
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}