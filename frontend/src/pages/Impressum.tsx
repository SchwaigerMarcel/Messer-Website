export function Impressum() {
  return (
    <div className="bg-neutral-950 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-amber-500 mb-8 sm:mb-12 leading-tight">
          IMPRESSUM
        </h1>

        <div className="space-y-8 text-neutral-300">
          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-1">
              <p><strong>Firmenname:</strong> Leon Schwaiger</p>
              <p><strong>Geschäftsbezeichnung:</strong> Messerschmiede Schwaiger</p>
              <p><strong>Adresse:</strong> Suttnerstraße 25, 4030 Linz</p>
              <p><strong>Rechtsform:</strong> Einzelunternehmer</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Kontakt
            </h2>
            <div className="space-y-1">
              <p><strong>Telefon:</strong> +43 677 63547 065</p>
              <p><strong>E-Mail:</strong> info@messerschmiede-schwaiger.at</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Registereintrag
            </h2>
            <div className="space-y-1">
              {/* <p><strong>GLN (der öffentlichen Verwaltung):</strong> 9110000123456</p> */}
              <p><strong>Geschäftszahl:</strong> 1021507</p>
              <p><strong>Kammerzugehörigkeit:</strong> Mitglied der Wirtschaftskammer Oberösterreich</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Aufsichtsbehörde
            </h2>
            <p><strong>Behörde gem. ECG (E-Commerce Gesetz):</strong> Magistrat der Stadt Linz</p>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Unternehmensgegenstand
            </h2>
            <p className="leading-relaxed">
              Messerschmiede einschließlich der Erzeugung von Hieb- und Stichwaffen sowie der Tätigkeit des Schleifens von Schneidewaren, sofern es sich nicht um Schneidewaren handelt, deren Erzeugung in den Vorbehaltsbereich eines reglementierten Gewerbes fällt.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Sonstige Informationen
            </h2>
            <p><strong>Sonstige Informationen nach §14 UGB:</strong> Nicht vorhanden</p>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Anwendbare Rechtsvorschriften
            </h2>
            <p>
              Gewerbeordnung – zu finden unter{" "}
              <a
                href="https://www.ris.bka.gv.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-500 underline"
              >
                https://www.ris.bka.gv.at/
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Offenlegung nach Mediengesetz
            </h2>
            <div className="space-y-1">
              <p><strong>Medieninhaber:</strong> Leon Schwaiger</p>
              <p><strong>Firmensitz (Ort der Hauptniederlassung):</strong> Linz</p>
            </div>
          </section>

          {/* <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              WKO Firmeneintrag
            </h2>
            <p>
              Maximilian Mustergraf in 8010 Graz | Eisen & Flamme | WKO Firmen A-Z
            </p>
          </section> */}

          <section className="pt-8 border-t border-neutral-800">
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              Haftungsausschluss
            </h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h3 className="text-amber-600 mb-2">Haftung für Inhalte</h3>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
              </div>
              <div>
                <h3 className="text-amber-600 mb-2">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
              </div>
              <div>
                <h3 className="text-amber-600 mb-2">Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischem Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
