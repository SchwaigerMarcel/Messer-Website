import { motion } from "framer-motion";
import { Scissors, CheckCircle, Sparkles, Clock, Shield, Award } from "lucide-react";

export function Schleifservice() {
  // --- ZENTRALE HÖHENSTEUERUNG ---
  const heroHeight = "450px"; 

  return (
    <div className="bg-neutral-950 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: heroHeight }}
      >
        <div className="absolute inset-0 z-0 w-full" style={{ height: heroHeight }}>
          <img
            src="/api/images/page/schleifservice1.jpg"
            alt="Messerschleifen"
            // Zentrierung aus der Mitte heraus
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-w-full object-cover object-center"
            style={{ 
              height: heroHeight, 
              minHeight: heroHeight,
              maxWidth: 'none' // Überschreibt index.html ohne !important
            }} 
          />
          {/* Verlauf-Overlay passend zur Höhe */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/70 to-neutral-950" 
            style={{ height: heroHeight }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-6 inline-block"
          >
            <Scissors className="text-amber-500 w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-amber-500 mb-4 sm:mb-6 leading-tight uppercase"
          >
            Schleifservice
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto px-2"
          >
            Rasiermesserscharf in Perfektion
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 sm:py-20 bg-neutral-900 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
              Ein stumpfes Messer ist nicht nur frustrierend, sondern auch gefährlich. Wir verleihen Ihrem Messer nicht nur neuen Glanz, sondern die Schärfe, auf die es ankommt – mit professioneller Präzision und jahrelanger Erfahrung.
            </p>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
              Egal ob Küchenmesser, Jagdmesser oder Outdoor-Werkzeug: Wir schleifen alle Messertypen fachgerecht und zuverlässig.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-12 sm:py-20 bg-neutral-950 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center uppercase"
          >
            Unsere Schleif-Optionen
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Maschinelles Schleifen */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-900/30 rounded-full flex-shrink-0">
                  <Scissors className="text-amber-500 w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl text-amber-500 uppercase tracking-wide mb-1">
                    Maschinelles Schleifen
                  </h3>
                  <p className="text-3xl sm:text-4xl text-amber-500 font-serif">€5</p>
                </div>
              </div>

              <p className="text-neutral-300 mb-6 leading-relaxed text-sm sm:text-base">
                Schnell, effizient und kostengünstig. Ideal für Alltagsmesser und regelmäßige Nachschärfung.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Professionelle Schleifmaschinen mit präzisen Winkeln</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Gleichmäßiger Schliff mit reproduzierbaren Ergebnissen</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Für alle gängigen Küchen- und Outdoor-Messer</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-neutral-950 border border-amber-900/10">
                <p className="text-amber-600 text-xs sm:text-sm uppercase tracking-wide mb-2">Perfekt für:</p>
                <p className="text-neutral-400 text-xs sm:text-sm">Küchenmesser, Taschenmesser, Arbeitsmesser, regelmäßige Wartung</p>
              </div>
            </motion.div>

            {/* Japanische Wassersteine */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-amber-950/30 to-amber-900/20 border-2 border-amber-600/50 p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded uppercase tracking-wide">Premium</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-900/50 rounded-full flex-shrink-0">
                  <Sparkles className="text-amber-500 w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl text-amber-500 uppercase tracking-wide mb-1">
                    Japanische Wassersteine
                  </h3>
                  <p className="text-3xl sm:text-4xl text-amber-500 font-serif">€25</p>
                </div>
              </div>

              <p className="text-neutral-300 mb-6 leading-relaxed text-sm sm:text-base">
                Handschliff nach japanischer Tradition. Extrem scharf mit spiegelglattem Finish. Die Königsklasse des Messerschleifens.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Stufenweiser Schliff mit Steinen bis 8000er Körnung</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Rasiermesserschärfe mit spiegelglattem Finish</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-300 text-sm sm:text-base">Schonende Behandlung – erhält die Klingenstruktur</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-neutral-950/50 border border-amber-600/30">
                <p className="text-amber-600 text-xs sm:text-sm uppercase tracking-wide mb-2">Perfekt für:</p>
                <p className="text-neutral-400 text-xs sm:text-sm">Hochwertige Küchenmesser, Sammlerstücke, Damastmesser, japanische Messer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-20 bg-neutral-900 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center uppercase"
          >
            So funktioniert's
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Clock,
                title: "Messer abgeben",
                desc: "Bringen Sie Ihr Messer persönlich vorbei oder senden Sie es uns zu. Wir prüfen den Zustand."
              },
              {
                step: "2",
                icon: Scissors,
                title: "Professioneller Schliff",
                desc: "Wir schleifen Ihr Messer mit der gewählten Option – präzise und sorgfältig."
              },
              {
                step: "3",
                icon: Sparkles,
                title: "Abholung",
                desc: "Sie erhalten Ihr rasiermesserscharfes Messer zurück. Vor Ort oder per Post."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
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
                <h3 className="text-lg sm:text-xl text-amber-500 mb-3 uppercase tracking-wide">{item.title}</h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-12 sm:py-20 bg-neutral-950 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-12 sm:mb-16 text-center uppercase"
          >
            Warum bei uns schleifen?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Award,
                title: "Echtes Handwerk",
                desc: "Präzises Schleifen von Hand, ohne industrielle Massenabfertigung."
              },
              {
                icon: Shield,
                title: "Sorgsame Behandlung",
                desc: "Manueller Schliff, der Material schont und die Lebensdauer Ihres Messers verlängert."
              },
              {
                icon: Clock,
                title: "Kurze Wartezeiten",
                desc: "Bearbeitung innerhalb weniger Werktage nach Erhalt des Messers."
              },
              {
                icon: Sparkles,
                title: "Maximale Schärfe",
                desc: "Feinabzug für eine langanhaltende und rasiermesserscharfe Schneide."
              },
              {
                icon: CheckCircle,
                title: "Faire Preise",
                desc: "Ehrliche Abrechnung pro Messer, ohne versteckte Zusatzkosten."
              },
              {
                icon: Scissors,
                title: "Breites Spektrum",
                desc: "Fachgerechter Service für fast alle Messertypen – von Küchenmessern bis zu Outdoor-Werkzeugen."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-neutral-900 border border-amber-900/20 p-6 hover:border-amber-600/50 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-900/30 rounded-full mb-4">
                  <item.icon className="text-amber-500 w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg text-amber-500 mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-6 uppercase">
            Bereit für perfekte Schärfe?
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 mb-8 max-w-2xl mx-auto font-light">
            Kontaktieren Sie uns für Ihren Schleiftermin oder bringen Sie Ihr Messer direkt vorbei.
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