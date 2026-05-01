import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Hintergrund-Effekt */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8 inline-block"
        >
          <Flame className="w-24 h-24 text-amber-600 mx-auto drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl sm:text-9xl font-serif text-neutral-800 mb-4"
        >
          404
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-serif text-amber-500 uppercase tracking-widest mb-6"
        >
        Verloren gegangen?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed"
        >
          Die Seite, die Sie suchen, wurde entweder verlegt oder existiert nicht mehr.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={18} />
            Zurück zur Schmiede
          </Link>
        </motion.div>
      </div>
    </div>
  );
}