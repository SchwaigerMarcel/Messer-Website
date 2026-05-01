import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { ScrollToTop } from "../components/ScrollToTop";
import { Footer } from "../components/Footer";

export function Root() {
  return (
    <> {/* <--- Start des Fragments */}
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-neutral-950">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </> /* <--- Ende des Fragments */
  );
}