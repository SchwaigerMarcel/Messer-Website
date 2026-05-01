import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Flame } from "lucide-react";

export function Kontakt() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-neutral-950 min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header - Zentriert */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <Flame className="text-amber-500 w-12 h-12 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter">
                        Kontakt <span className="text-amber-500">aufnehmen</span>
                    </h1>
                    <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
                        Sie haben Fragen zu unseren Messern oder wünschen eine individuelle Anfertigung? Wir freuen uns auf Ihre Anfrage.
                    </p>
                </motion.div>

                {/* Content Container - Alles untereinander und zentriert */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-12"
                >
                    
                    {/* 1. Kontakt-Info Karten - Zentriertes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {[
                            { icon: Mail, label: "E-Mail", val: "info@messerschmiede-schwaiger.at", href: "mailto:info@messerschmiede-schwaiger.at" },
                            { icon: Phone, label: "Telefon", val: "+43 677 63547 065", href: "tel:+4367763547065" },
                            { icon: MapPin, label: "Werkstatt", val: "Suttnerstraße 25, 4030 Linz", href: "https://maps.google.com/?q=Suttnerstraße+25,+4030+Linz" },
                            { icon: Clock, label: "Öffnungszeiten", val: "Nach Vereinbarung", href: "#" }
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                variants={itemVariants}
                                whileHover={{ y: -5, borderColor: "rgba(245, 158, 11, 0.5)" }}
                                className="p-6 bg-neutral-900 border border-amber-900/20 rounded-sm transition-colors group text-center flex flex-col items-center"
                            >
                                <item.icon className="text-amber-500 w-6 h-6 mb-4 group-hover:scale-110 transition-transform" />
                                <p className="text-xs uppercase tracking-widest text-amber-600 mb-1">{item.label}</p>
                                <p className="text-neutral-200 font-medium break-words">{item.val}</p>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}