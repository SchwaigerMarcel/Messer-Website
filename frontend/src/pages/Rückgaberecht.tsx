import { motion } from "framer-motion";
import { ShieldCheck, RotateCcw, AlertTriangle, Scale, Clock, CreditCard, Package, Mail } from "lucide-react";

export function Rückgaberecht() {
  return (
    <div className="bg-neutral-950 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-amber-600 text-[0.65rem] uppercase tracking-[0.3em] mb-4">
            Online-Shop · Österreich
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white uppercase tracking-tight leading-tight mb-5">
            Rückgabe- &amp; <span className="text-amber-500">Widerrufsbelehrung</span>
          </h1>
          <div className="w-12 h-px bg-amber-700 mb-6" />
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xl">
            Informationen zu Ihrem gesetzlichen Widerrufsrecht gemäß ECG, FAGG und EU-Verbraucherschutzrichtlinien.
          </p>
        </motion.div>

        <div className="space-y-5">

          {/* 1 — Widerrufsrecht */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="bg-neutral-900 border border-neutral-800 hover:border-amber-900/40 transition-colors duration-300"
          >
            {/* Card header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-neutral-800">
              <div className="w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-amber-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-amber-600 text-[0.6rem] uppercase tracking-[0.2em] mb-0.5">Abschnitt 1</p>
                <h2 className="text-white text-sm font-medium uppercase tracking-[0.12em]">Widerrufsrecht</h2>
              </div>
            </div>

            {/* Card body */}
            <div className="px-6 py-6 space-y-5">

              {/* 14-Tage highlight */}
              <div className="flex items-start gap-4 bg-neutral-950 border border-amber-900/25 border-l-2 border-l-amber-600 p-5">
                <Clock className="text-amber-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-400 text-xs uppercase tracking-widest font-medium mb-1.5">Widerrufsfrist</p>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    Verbraucher haben das Recht, binnen <span className="text-amber-400 font-medium">14 Tagen</span> ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Frist beginnt ab dem Tag, an dem der Verbraucher oder ein benannter Dritter (nicht der Beförderer) die Waren in Besitz genommen hat.
                  </p>
                </div>
              </div>

              {/* How to exercise */}
              <div className="flex items-start gap-4 bg-neutral-950 border border-neutral-800 p-5">
                <Mail className="text-amber-700 w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-neutral-400 text-xs uppercase tracking-widest font-medium mb-1.5">So üben Sie Ihr Recht aus</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Mittels einer eindeutigen Erklärung per Brief oder E-Mail an die im Impressum angegebenen Kontaktdaten. Zur Wahrung der Frist reicht es aus, dass die Mitteilung <span className="text-neutral-300">vor Ablauf der 14 Tage</span> abgesendet wird.
                  </p>
                </div>
              </div>

            </div>
          </motion.section>

          {/* 2 — Folgen des Widerrufs */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="bg-neutral-900 border border-neutral-800 hover:border-amber-900/40 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 px-6 py-5 border-b border-neutral-800">
              <div className="w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <RotateCcw className="text-amber-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-amber-600 text-[0.6rem] uppercase tracking-[0.2em] mb-0.5">Abschnitt 2</p>
                <h2 className="text-white text-sm font-medium uppercase tracking-[0.12em]">Folgen des Widerrufs</h2>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {[
                  {
                    icon: CreditCard,
                    title: "Rückzahlung",
                    text: "Alle empfangenen Zahlungen inkl. Lieferkosten (außer Mehrkosten durch abweichende Lieferwahl) werden unverzüglich, spätestens binnen 14 Tagen nach Eingang Ihres Widerrufs, zurückgezahlt — mit demselben Zahlungsmittel wie die Originaltransaktion.",
                  },
                  {
                    icon: Package,
                    title: "Rücksendung",
                    text: "Die Waren sind unverzüglich, spätestens binnen 14 Tagen nach Mitteilung des Widerrufs, zurückzusenden oder zu übergeben. Die unmittelbaren Kosten der Rücksendung trägt der Verbraucher.",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-neutral-950 border border-neutral-800 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="text-amber-700 w-4 h-4 flex-shrink-0" />
                      <p className="text-neutral-300 text-xs uppercase tracking-[0.15em] font-medium">{item.title}</p>
                    </div>
                    <p className="text-neutral-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Note on withholding refund */}
              <div className="mt-4 flex items-start gap-3 bg-neutral-950 border border-neutral-800 px-5 py-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-800 flex-shrink-0 mt-1.5" />
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis der Nachweis der Rücksendung erbracht wurde.
                </p>
              </div>
            </div>
          </motion.section>

          {/* 3 — Ausschluss */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.55 }}
            className="bg-neutral-900 border border-neutral-800 hover:border-amber-900/40 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 px-6 py-5 border-b border-neutral-800">
              <div className="w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="text-amber-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-amber-600 text-[0.6rem] uppercase tracking-[0.2em] mb-0.5">Abschnitt 3</p>
                <h2 className="text-white text-sm font-medium uppercase tracking-[0.12em]">
                  Ausschluss des Widerrufsrechts
                </h2>
              </div>
            </div>

            <div className="px-6 py-6 space-y-4">
              <p className="text-neutral-500 text-sm leading-relaxed">
                Das Widerrufsrecht besteht <span className="text-neutral-300">nicht</span> bei Waren, die nach Kundenspezifikation angefertigt oder eindeutig auf persönliche Bedürfnisse zugeschnitten sind.
              </p>

              {/* Highlighted exclusion box */}
              <div className="bg-neutral-950 border border-amber-900/30 border-l-2 border-l-amber-700 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-500 text-xs uppercase tracking-widest font-medium mb-2">Wichtig - Individualisierte Produkte</p>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Bei individualisierten Produkten ist eine Rückgabe ausgeschlossen, wenn das Produkt individuell nach Kundenwunsch gefertigt wurde — zum Beispiel mit Gravur, Sondermaß oder als Sonderanfertigung. Bitte klären Sie vor der Bestellung, ob Ihr Wunschprodukt als Sonderanfertigung gilt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Examples in grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {["Gravur", "Sondermaß", "Sonderanfertigung"].map((item) => (
                  <div key={item} className="bg-neutral-950 border border-neutral-800 px-4 py-3 text-center">
                    <p className="text-neutral-600 text-[0.65rem] uppercase tracking-[0.2em]">Ausschluss bei</p>
                    <p className="text-neutral-400 text-sm mt-1 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 4 — Rechtliche Grundlage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.55 }}
            className="bg-neutral-900 border border-neutral-800 hover:border-amber-900/40 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 px-6 py-5 border-b border-neutral-800">
              <div className="w-10 h-10 bg-amber-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Scale className="text-amber-500 w-4 h-4" />
              </div>
              <div>
                <p className="text-amber-600 text-[0.6rem] uppercase tracking-[0.2em] mb-0.5">Abschnitt 4</p>
                <h2 className="text-white text-sm font-medium uppercase tracking-[0.12em]">Rechtliche Grundlage</h2>
              </div>
            </div>

            <div className="px-6 py-6">
              <p className="text-neutral-500 text-sm leading-relaxed mb-5">
                Diese Widerrufsbelehrung basiert auf folgenden Rechtsgrundlagen:
              </p>

              <div className="space-y-3">
                {[
                  { short: "ECG", full: "E-Commerce-Gesetz", desc: "Österreichisches E-Commerce-Gesetz" },
                  { short: "FAGG", full: "Fern- und Auswärtsgeschäfte-Gesetz", desc: "Österreichisches Fernabsatzrecht" },
                  { short: "EU-RL", full: "EU-Verbraucherschutzrichtlinien", desc: "Anwendbare europäische Verbraucherschutznormen" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-neutral-950 border border-neutral-800 px-5 py-4">
                    <div className="flex-shrink-0 w-14 text-center">
                      <span className="font-serif text-amber-700 text-xs tracking-wide">{item.short}</span>
                    </div>
                    <div className="w-px h-6 bg-neutral-800 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-neutral-300 text-sm font-medium truncate">{item.full}</p>
                      <p className="text-neutral-600 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.55 }}
            className="bg-neutral-900 border border-neutral-800 border-l-2 border-l-amber-600 px-6 py-6"
          >
            <p className="text-neutral-300 text-sm font-medium mb-1">Fragen zu Ihrer Bestellung?</p>
            <p className="text-neutral-500 text-sm leading-relaxed mb-4">
              Wenden Sie sich bei Rückfragen direkt an uns — wir helfen rasch und unkompliziert weiter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:info@messerschmiede-schwaiger.at"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 text-xs uppercase tracking-widest transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                E-Mail schreiben
              </a>
              <a
                href="/impressum"
                className="inline-flex items-center justify-center gap-2 border border-neutral-700 hover:border-amber-700 text-neutral-400 hover:text-amber-400 px-6 py-2.5 text-xs uppercase tracking-widest transition-colors"
              >
                Impressum &amp; Kontakt
              </a>
            </div>
          </motion.div>

          {/* Stand */}
          <div className="pt-4 pb-2 text-center border-t border-neutral-800/60">
            <p className="text-neutral-700 text-xs">
              Stand:{" "}
              {new Date().toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}