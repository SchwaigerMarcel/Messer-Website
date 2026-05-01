import { Link, useLocation } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => decodeURIComponent(location.pathname) === path;

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  } as const;

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-sm border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-2"> {/* gap-2 verhindert direktes Zusammenstoßen */}

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 sm:gap-5 group min-w-0 flex-shrink">
            <img
              src="api/images/page/logo.svg"
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" /* Kleiner auf Mobile */
              style={{ marginBottom: "4px" }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl md:text-2xl font-serif tracking-wider text-amber-500 leading-none truncate">
                MESSERSCHMIEDE
              </span>
              <span className="text-[0.6rem] sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-neutral-400 -mt-0.5 uppercase">
                Schwaiger
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 flex-shrink-0">
            {["/", "/produkte", "/services", "/galerie", "/über-uns", "/kontakt"].map((path) => (
              <Link
                key={path}
                to={path}
                className={`text-sm uppercase tracking-wide transition-colors relative ${isActive(path) ? "text-amber-500" : "text-neutral-300 hover:text-amber-500"
                  }`}
              >
                {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                {isActive(path) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-amber-500"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-300 hover:text-amber-500 transition-colors relative w-10 h-10 flex flex-shrink-0 items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative w-6 h-5">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 w-full h-0.5 bg-current block"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute top-2 left-0 w-full h-0.5 bg-current block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 16 }}
                className="absolute top-0 left-0 w-full h-0.5 bg-current block"
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden bg-neutral-950/98 border-t border-amber-900/30"
            >
              <div className="py-6 space-y-4 px-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "Produkte", path: "/produkte" },
                  { name: "Services", path: "/services" },
                  { name: "Galerie", path: "/galerie" },
                  { name: "Über Uns", path: "/über-uns" },
                  { name: "Kontakt", path: "/kontakt" },
                ].map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block text-lg uppercase tracking-widest px-4 py-2 transition-colors ${isActive(link.path) ? "text-amber-500" : "text-neutral-300"
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}