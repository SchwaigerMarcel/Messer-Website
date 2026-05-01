import { motion } from "framer-motion"; // Falls motion/react nicht geht, wieder auf framer-motion wechseln
import { Zap, ThermometerSun, Shield, CheckCircle, Users, Award } from "lucide-react";
import { useEffect } from "react";

export function Härteservice() {
  useEffect(() => {
    // --- SEO & UX ---
    window.scrollTo(0, 0);
    document.title = "Härteservice | Messerschmiede Schwaiger";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Professionelle Wärmebehandlung für Ihre Messerklingen. Digital gesteuerter Härteofen mit ±2°C Präzision für optimale Gefügebildung und Standzeit.");
    }
  }, []);
  const heroHeight = "400px";
  return (
    <div className="bg-neutral-950">
      {/* Hero Section */}
      <section 
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: heroHeight }}
      >
        <div className="absolute inset-0 z-0 w-full" style={{ height: heroHeight }}>
          <img
            src="/api/images/page/härteservice.jpg"
            alt="Härteofen"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-w-full object-cover object-center"
            // Diese Styles hier gewinnen gegen die index.html:
            style={{ 
              height: heroHeight, 
              minHeight: heroHeight,
              maxWidth: 'none' // Ersetzt !max-w-none
            }} 
          />
          <div className="absolute inset-0 bg-black/50" style={{ height: heroHeight }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-6 inline-block"
          >
            <ThermometerSun className="text-amber-500 w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
          </motion.div>
          
          <motion.h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-amber-500 mb-4 uppercase">
            Härteservice
          </motion.h1>

          <motion.p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            Wärmebehandlung für Messerklingen bis auf ±2°C genau
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 sm:py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
              Wir übernehmen die fachgerechte Härtung Ihrer selbst geschmiedeten oder geschliffenen Klingen.
            </p>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
              Unser digitaler Härteofen garantiert eine Temperaturgenauigkeit von ±2°C. Dies ermöglicht ein exaktes Arbeiten nach den technischen Vorgaben der jeweiligen Stahlsorte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 sm:py-20 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center uppercase"
          >
            Technische Daten
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-900/30 rounded-full flex-shrink-0">
                  <ThermometerSun className="text-amber-500 w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl text-amber-500 uppercase tracking-wide">
                  Digitaler Härteofen
                </h3>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed text-sm sm:text-base">
                Die Temperatur wird digital überwacht und konstant gehalten. Damit vermeiden wir Überhitzung und stellen die Gefügebildung sicher.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Präzise PID Regelung (±2°C Toleranz)</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Gleichmäßige Kammerhitze für verzugsarmes Härten</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Manuelle Steuerung für individuelle Haltezeiten</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-900/30 rounded-full flex-shrink-0">
                  <Shield className="text-amber-500 w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl text-amber-500 uppercase tracking-wide">
                  Ergebnisqualität
                </h3>
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed text-sm sm:text-base">
                Wir härten nach den spezifischen Parametern der Stahlhersteller. Jede Klinge wird nach dem Abschrecken fachgerecht angelassen.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Abschrecken in Härteöl oder an Luft</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Mindestens zweifaches Anlassen inklusive</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Schutzfolie gegen Verzunderung/Verkohlung bei Bedarf</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section (So funktioniert's) */}
      <section className="py-12 sm:py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center uppercase"
          >
            Ablauf
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "1",
                icon: Users,
                title: "Kontakt",
                desc: "Anfrage mit Stahlsorte, Abmessungen und Bild"
              },
              {
                step: "2",
                icon: ThermometerSun,
                title: "Angebot",
                desc: "Kalkulation basierend auf Klingenanzahl und Aufwand"
              },
              {
                step: "3",
                icon: Zap,
                title: "Versand",
                desc: "Vorgeschliffene Klingen sicher verpackt einsenden"
              },
              {
                step: "4",
                icon: Award,
                title: "Rückgabe",
                desc: "Erhalt der fertig gehärteten und angelassenen Klingen"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-amber-900/30 rounded-full">
                    <item.icon className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg text-amber-500 mb-3 uppercase tracking-wide font-bold">{item.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-neutral-950 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-6 uppercase">
            Härtung anfragen
          </h2>
          <p className="text-neutral-300 mb-8">
            Geben Sie bitte Stahlsorte, Abmessungen und ein Bild der Klingen an.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@messerschmiede-schwaiger.at" className="bg-amber-600 text-white px-8 py-3 hover:bg-amber-700 transition-colors uppercase text-sm font-bold">
              E-Mail Anfrage
            </a>
            <a href="tel:+4367763547065" className="border border-amber-600 text-amber-500 px-8 py-3 hover:bg-amber-600 hover:text-white transition-colors uppercase text-sm font-bold">
              Anrufen
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}