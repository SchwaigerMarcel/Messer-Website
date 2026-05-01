import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Scissors,
    Zap,
    ThermometerSun,
    Shield,
    Wrench,
    Sparkles,
    ArrowRight
} from "lucide-react";

// Hilfskomponente für den einfachen Link-Pfeil
const ServiceLinkSimple = ({ to }: { to: string }) => (
    <Link to={to} className="flex items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
                    bg-amber-600 text-black 
                    md:bg-transparent md:text-amber-500 md:border md:border-amber-600/50 
                    group-hover:bg-amber-600 group-hover:text-black group-hover:translate-x-2">
            <ArrowRight size={20} />
        </div>
    </Link>
);

// FUNKTIONSNAME AUF "Services" GEÄNDERT, damit routes.tsx funktioniert
export function Services() {
    return (
        <div className="bg-neutral-950 w-full overflow-x-hidden min-h-screen">
            {/* Hero Bereich für die Service-Übersicht */}
            <section className="relative py-20 flex items-center justify-center overflow-hidden border-b border-amber-900/20">
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-serif text-amber-500 uppercase tracking-wider"
                    >
                        Unsere SERVICES
                    </motion.h1>
                    <div className="w-24 h-1 bg-amber-600 mx-auto mt-6" />
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 sm:py-20 bg-neutral-950 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                                <div className="mt-12 p-6 bg-neutral-900/50 flex items-center justify-between group">
                                    <p className="text-neutral-300">Mehr Infos</p>
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
                                    className="group mt-6 sm:mt-8 p-3 sm:p-4 bg-amber-900/10 border border-amber-600/30 
                             flex items-center justify-center gap-4 cursor-pointer transition-colors hover:border-amber-600/60"
                                >
                                    <p className="text-amber-500 text-xs sm:text-sm transition-colors group-hover:text-amber-400">
                                        Preise auf Anfrage – je nach Stahlsorte und Größe
                                    </p>
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
                                bg-amber-600 text-black 
                                md:bg-transparent md:text-amber-500 md:border md:border-amber-600/50 
                                group-hover:bg-amber-600 group-hover:text-black group-hover:translate-x-2">
                                        <ArrowRight size={20} />
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}