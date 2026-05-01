import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Wrench, Shield, Heart, Zap, ThermometerSun, Sparkles, Scissors } from "lucide-react";

// --- HILFSKOMPONENTEN (Müssen vor der Hauptkomponente definiert sein) ---

const ServiceArrow = () => (
  <div className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
    bg-amber-600 text-black 
    md:bg-transparent md:text-amber-500 md:border md:border-amber-600/50 
    group-hover:bg-amber-600 group-hover:text-black group-hover:translate-x-2">
    <ArrowRight size={20} />
  </div>
);



function ServiceLinkSimple({ to }: { to: string }) {
  return (
    <Link to={to} className="group block w-fit">
      <ServiceArrow />
    </Link>
  );
}

// function ServiceLink({ to, icon, title, desc }: { to: string, icon: React.ReactNode, title: string, desc: string }) {
//   return (
//     <Link to={to} className="group flex flex-col justify-between bg-neutral-950 border border-amber-900/20 hover:border-amber-600/50 transition-all p-8 h-full">
//       <div>
//         <div className="flex items-center gap-4 mb-6">
//           <div className="w-16 h-16 bg-amber-900/30 flex items-center justify-center rounded-full text-amber-500">
//             {icon}
//           </div>
//           <h3 className="text-2xl text-amber-500 uppercase tracking-wide">{title}</h3>
//         </div>
//         <p className="text-neutral-300 mb-6">{desc}</p>
//       </div>
//       <div className="flex justify-end">
//         <ServiceArrow />
//       </div>
//     </Link>
//   );
// }

function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- HAUPTKOMPONENTE ---

export function About() {
  useEffect(() => {
    document.title = "Über uns | Messerschmiede Schwaiger - Tradition & Handwerk";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Erfahren Sie mehr über die Messerschmiede Schwaiger in Oberösterreich. Wir vereinen traditionelle Schmiedekunst mit modernster Härtetechnik für Unikate höchster Güte.");
    }
  }, []);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  return (
    <div className="bg-neutral-950 overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[70vh] sm:h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/api/images/page/Schmiede.jpg"
            alt="Werkstatt"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950" />
        </div>

        {/* Container mit px-4 für seitlichen Mindestabstand auf Mobile */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-8 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-4 sm:mb-6 inline-block"
          >
            <Flame className="text-amber-500 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            /* text-2xl für ganz kleine Handys, md:text-5xl für Desktop. break-words ist der Schutzschild. */
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-amber-500 mb-4 sm:mb-6 leading-tight uppercase tracking-tighter break-words"
          >
            Messerschmiede Schwaiger
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            /* text-sm auf Mobile, damit "Oberösterreich" sicher reinpasst */
            className="text-sm sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Ein Familienbetrieb aus Oberösterreich
          </motion.p>
        </div>
      </motion.section>

      {/* Family Business Story */}
      <section className="py-12 sm:py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-6 sm:mb-8 text-center">
              HANDWERK MIT HERZ
            </h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-6 text-neutral-300 leading-relaxed text-sm sm:text-base">
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Bei uns dreht sich alles um echte Handwerkskunst. Als Familienbetrieb legen wir höchsten Wert auf Qualität. Jedes einzelne Messer wird mit Leidenschaft und Präzision von Hand gefertigt.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Wir verbinden traditionelle Schmiedetechniken mit modernsten Technologien. Unser neuer Härteofen garantiert exakte Temperaturen und damit eine perfekte Härtung welche das volle Potential der verwendeten Messerstähle hervorbringt und damit feines Gefüge für maximale Schärfe und hohe Standzeit der Klinge garantiert.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Jedes unserer Messer ist ein Unikat - gefertigt mit Hingabe und gehärtet mit Präzision.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quality Stats */}
      <section className="py-12 sm:py-20 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-amber-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-8 sm:mb-16 text-center"
          >
            QUALITÄT IN ZAHLEN
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-4 sm:p-6 bg-neutral-900/50 border border-amber-900/20 backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-500 mb-2 sm:mb-3">
                <AnimatedCounter end={59} suffix="+" />
              </div>
              <p className="text-amber-600 uppercase tracking-wide mb-1 sm:mb-2 text-xs sm:text-sm">HRC Härte</p>
              <p className="text-neutral-400 text-xs sm:text-sm">Qualitäts Stähle</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-4 sm:p-6 bg-neutral-900/50 border border-amber-900/20 backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-500 mb-2 sm:mb-3">
                ±<AnimatedCounter end={2} />°C
              </div>
              <p className="text-amber-600 uppercase tracking-wide mb-1 sm:mb-2 text-xs sm:text-sm">Präzision</p>
              <p className="text-neutral-400 text-xs sm:text-sm">Härteofen</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-4 sm:p-6 bg-neutral-900/50 border border-amber-900/20 backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-500 mb-2 sm:mb-3">
                100%
              </div>
              <p className="text-amber-600 uppercase tracking-wide mb-1 sm:mb-2 text-xs sm:text-sm">Handarbeit</p>
              <p className="text-neutral-400 text-xs sm:text-sm">Jedes Detail</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-4 sm:p-6 bg-neutral-900/50 border border-amber-900/20 backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-500 mb-2 sm:mb-3 flex items-center justify-center gap-1">
                <AnimatedCounter end={11} />
                <span>–</span>
                <AnimatedCounter end={30} />
                <span>°</span>
              </div>
              <p className="text-amber-600 uppercase tracking-wide mb-1 sm:mb-2 text-xs sm:text-sm">
                Schneidwinkel
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Extrem Scharf
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values with Icons */}
      <section className="py-12 sm:py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-8 sm:mb-16 text-center"
          >
            WAS UNS AUSZEICHNET
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Heart, title: "Familienbetrieb", desc: "Persönlich, authentisch und mit ganzem Herzen bei der Sache", delay: 0.1 },
              { icon: Shield, title: "Premiumstähle", desc: "Hochwertige Stahlsorten mit HRC 58-65 für maximale Performance", delay: 0.3 },
              { icon: ThermometerSun, title: "Präzisions-Härtung", desc: "Hochpräziser Härteofen für optimale Materialstruktur und Schärfe", delay: 0.2 },
              { icon: Sparkles, title: "Handgeschliffen", desc: "Jede Schneide wird von Hand gefertigt – kein Kompromiss", delay: 0.4 }
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="text-center p-4 sm:p-6 bg-neutral-950 border border-amber-900/20 hover:border-amber-600/50 transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-amber-900/30 group-hover:bg-amber-900/50 rounded-full mb-4 sm:mb-6 transition-colors"
                >
                  <item.icon className="text-amber-500 w-7 h-7 sm:w-8 sm:h-8" />
                </motion.div>
                <h3 className="text-lg sm:text-xl text-amber-500 mb-2 sm:mb-3 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-xs sm:text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-8 sm:mb-16 text-center"
          >
            UNSERE SERVICES
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Sharpening Service */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-amber-900/30 rounded-full">
                  <Scissors className="text-amber-500 w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl text-amber-500 uppercase tracking-wide">
                  Schleifservice
                </h3>
              </div>

              <p className="text-neutral-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Wir verleihen Ihrem Messer nicht nur neuen Glanz, sondern die Schärfe, auf die es ankommt.
              </p>

              <div className="space-y-4">
                {/* 1. Maschinelles Schleifen - Klickbar */}
                <Link to="/Schleifservice" className="block mt-6">
                  <motion.div
                    whileHover={{ x: 8, borderColor: "rgba(217, 119, 6, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex justify-between items-center p-3 sm:p-4 bg-neutral-950 border border-amber-900/10 transition-all cursor-pointer group"
                  >
                    <div>
                      <p className="text-amber-500 text-sm sm:text-base mb-1 group-hover:text-amber-400 transition-colors">
                        Maschinelles Schleifen
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">Schnell und effizient</p>
                    </div>
                    <div className="text-2xl sm:text-3xl text-amber-500 font-serif">€5</div>
                  </motion.div>
                </Link>

                {/* 2. Japanische Wassersteine - Klickbar */}
                <Link to="/Schleifservice" className="block mt-6">
                  <motion.div
                    whileHover={{ x: 8, borderColor: "rgba(217, 119, 6, 0.6)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-amber-950/20 to-amber-900/10 border border-amber-600/30 cursor-pointer group"
                  >
                    <div>
                      <p className="text-amber-500 text-sm sm:text-base mb-1 flex items-center gap-2 group-hover:text-amber-400 transition-colors">
                        Japanische Wassersteine
                        <span className="text-[10px] sm:text-xs bg-amber-600 text-white px-1.5 sm:px-2 py-0.5 rounded uppercase font-sans">
                          Premium
                        </span>
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">Extrem scharf, spiegelglatt</p>
                    </div>
                    <div className="text-2xl sm:text-3xl text-amber-500 font-serif">€25</div>
                  </motion.div>
                </Link>
                <div className="mt-12 p-6 bg-neutral-900/50 flex items-center justify-between">
                  <p className="text-neutral-300">Mehr Infos</p>

                  {/* Hier rufst du die kleine Version auf */}
                  <ServiceLinkSimple to="/Schleifservice" />
                </div>
              </div>
            </motion.div>

            {/* Hardening Service */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-neutral-900 border border-amber-900/20 p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-amber-900/30 rounded-full">
                  <Zap className="text-amber-500 w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl text-amber-500 uppercase tracking-wide">
                  Härteservice
                </h3>
              </div>

              <p className="text-neutral-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Speziell für Hobby-Schmiede: Professionelle Härtung Ihrer selbstgeschmiedeten Messer
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: ThermometerSun, text: "Präzise PID Regelung (±2°C)" },
                  { icon: Shield, text: "Optimale Härtung für jeden Stahl" },
                  { icon: Wrench, text: "Anlassen inklusive" },
                  { icon: Sparkles, text: "Verzugsminimierung" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-amber-900/20 rounded-full flex items-center justify-center">
                      <item.icon className="text-amber-500 w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-neutral-300 text-xs sm:text-sm">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <Link to="/Härteservice" className="block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  // 'group' hinzugefügt, damit Kinder auf den Hover dieses Divs reagieren können
                  className="group mt-6 sm:mt-8 p-3 sm:p-4 bg-amber-900/10 border border-amber-600/30 
             flex items-center justify-center gap-4 cursor-pointer transition-colors hover:border-amber-600/60"
                >
                  <p className="text-amber-500 text-xs sm:text-sm transition-colors group-hover:text-amber-400">
                    Preise auf Anfrage – je nach Stahlsorte und Größe
                  </p>

                  {/* Wir rufen hier direkt den Link auf, damit die Animation gesteuert werden kann */}
                  <Link to="/härteservice" className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
                                    bg-amber-600 text-black 
                                    md:bg-transparent md:text-amber-500 md:border md:border-amber-600/50 
                                    group-hover:bg-amber-600 group-hover:text-black group-hover:translate-x-2">
                      <ArrowRight size={20} />
                    </div>
                  </Link>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workshop Image Section */}
      <section className="py-12 sm:py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-900 rounded opacity-25 group-hover:opacity-40 blur transition-opacity" />
                <img
                  src="/api/images/page/anvil.jpg"
                  alt="Handwerk"
                  className="relative w-full h-[300px] sm:h-[500px] object-cover border-4 border-amber-900/30"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-500 mb-4 sm:mb-6 uppercase">
                Unsere Werkstatt
              </h2>
              <div className="space-y-3 sm:space-y-4 text-neutral-300 leading-relaxed text-sm sm:text-base">
                <p>
                  In unserer modernen Werkstatt verschmelzen jahrhundertealte Schmiedetechniken mit hochmoderner Ausstattung. Unser hochpräziser Härteofen garantiert eine perfekte Wärmebehandlung.
                </p>
              </div>

              {/* HIER IST DER GEFIXTE LINK */}
              <Link to="/kontakt" className="inline-block group">
                <motion.div
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors text-sm sm:text-base cursor-pointer"
                >
                  <Wrench size={20} className="group-hover:rotate-45 transition-transform" />
                  <span className="uppercase tracking-wide font-medium">Termine nach Vereinbarung</span>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-24 bg-neutral-950 text-center relative overflow-hidden"
      >
        <div className="relative z-10 px-4">
          <Flame className="text-amber-500 w-16 h-16 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-4xl font-serif text-amber-500 mb-8 uppercase">Bereit für Ihr Messer?</h2>
          <Link
            to="/kontakt"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 uppercase tracking-wide transition-all hover:scale-105 active:scale-95"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </div>
      </motion.section>
    </div> // Schließt bg-neutral-950
  );
}