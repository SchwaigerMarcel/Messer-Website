import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sobald sich der Pfad (URL) ändert, scrolle nach ganz oben
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Diese Komponente rendert nichts Sichtbares
}