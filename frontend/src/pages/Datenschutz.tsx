export function Datenschutz() {
  return (
    <div className="bg-neutral-950 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-amber-500 mb-8 sm:mb-12 leading-tight">
          DATENSCHUTZERKLÄRUNG
        </h1>

        <div className="space-y-8 text-neutral-300">
          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              1. Datenschutz auf einen Blick
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-amber-600 mb-2">Allgemeine Hinweise</h3>
                <p className="leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.
                </p>
              </div>
              <div>
                <h3 className="text-amber-600 mb-2">Datenerfassung auf unserer Website</h3>
                <p className="leading-relaxed">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt "Hinweis zur verantwortlichen Stelle" entnehmen.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              2. Hosting und Infrastruktur
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-amber-600 mb-2">Self-Hosting</h3>
                <p className="leading-relaxed">
                  Diese Website wird auf einer privaten Infrastruktur betrieben. Die Speicherung der Daten erfolgt lokal. Zur Erreichbarkeit der Website wird die Domain über den Dienstleister <strong>Domanion</strong> (Hofmayer IT-Solutions e.U.) sowie ggf. dynamische DNS-Dienste (DuckDNS) geroutet.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-amber-600 mb-2">Hinweis zur verantwortlichen Stelle</h3>
                <p className="leading-relaxed mb-2">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <div className="bg-neutral-900 p-4 border border-amber-900/20">
                  <p className="font-bold text-amber-500">Leon Schwaiger</p>
                  <p>Messerschmiede Schwaiger</p>
                  <p>Suttnerstraße 25</p>
                  <p>4030 Linz</p>
                  <p className="mt-2">Österreich</p>
                  <p className="mt-2 italic">E-Mail: info@messerschmiede-schwaiger.at</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              4. Datenerfassung auf unserer Website
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-amber-600 mb-2">Server-Log-Dateien</h3>
                <p className="leading-relaxed mb-2">
                  Unser System erhebt automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL (die zuvor besuchte Seite)</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl text-amber-500 mb-3 uppercase tracking-wide">
              5. Ihre Rechte
            </h2>
            <div className="space-y-4 text-sm">
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen (DSGVO) jederzeit das Recht auf:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Unentgeltliche Auskunft über Ihre gespeicherten Daten</li>
                <li>Berichtigung oder Löschung Ihrer Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
              </ul>
            </div>
          </section>

          <section className="pt-8 border-t border-neutral-800 text-center">
            <p className="text-sm text-neutral-500">
              Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}