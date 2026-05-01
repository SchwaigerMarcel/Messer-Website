import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-xl font-serif tracking-wider text-amber-500">
                MESSERSCHMIEDE
              </span>
              <span className="text-xs tracking-[0.3em] text-neutral-400">
                SCHWAIGER
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Handgeschmiedete Messer mit Leidenschaft und Tradition. Jedes Stück ein Unikat.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-amber-500 uppercase tracking-wide text-sm mb-4">
              Kontakt
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin size={16} className="mt-1 text-amber-600" />
                <div>
                  <p>Messerschmiede Schwaiger</p>
                  <p>Suttnerstraße 25</p>
                  <p>4030 Linz</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <Mail size={16} className="text-amber-600" />
                <span>info@messerschmiede-schwaiger.at</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <Phone size={16} className="text-amber-600" />
                <span>+43 677 63547 065</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-amber-500 uppercase tracking-wide text-sm mb-4">
              Öffnungszeiten
            </h3>
            <div className="space-y-2 text-neutral-400 text-sm">
              <div className="flex justify-between">
                <span>Termine nach Vereinbarung</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Messerschmiede Schwaiger. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/impressum"
                className="text-neutral-400 hover:text-amber-500 transition-colors"
              >
                Impressum
              </Link>
              <Link
                to="/datenschutz"
                className="text-neutral-400 hover:text-amber-500 transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
