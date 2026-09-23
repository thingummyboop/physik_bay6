# Optische Geräte: recherchieren und begründet entscheiden

Stand: 23.09.2026, lokale Weiterarbeit nach GitHub-Zwischenstand `2339b57`.

## Anlass und Lehrplanbezug

Die vorhandenen Modelle zu Mikroskop und Teleskop erklärten Lichtwege, enthielten aber keinen angeleiteten Vergleich verlässlicher Quellen zu Einsatz, Chancen und Risiken optischer Geräte. Genau diese Verbindung verlangt der Kompetenzbereich „Optische Systeme“ in Physik der 2. Klasse Mittelschule. Primärquelle: [RIS, Anlage 1](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html), direkt abgerufen am 23.09.2026 um 15:21:38 UTC; der relevante Physikabschnitt wurde erneut gelesen.

## Lerninhalt und Reihenfolge

`linsen_spiegel`, Revision 7, enthält zehn Abschnitte. Auf Reflexion, Brechung und Linsen folgt jetzt unmittelbar das Auge, anschließend die neue Recherche zu Geräten. Totalreflexion, gekrümmte Spiegel, Mikroskop, Teleskop und Beugung folgen danach. Die vorhandenen Versuchsaufträge und sämtliche zehn SVG-Grafiken sind erhalten. Beim Wölbspiegel ist die verkleinerte virtuelle Abbildung mit einer Anwendung auf die Einschätzung von Entfernungen ergänzt.

Vier gekennzeichnete Quellenkarten verbinden ein Wiener Instrument, Herstellerwissen, eine unabhängige Lehrbucherklärung und Sicherheit. Die Zusammenfassungen sind auch ohne Internet nutzbar; Lernende müssen diese Arbeitsweise ausdrücklich von einer eigenen Online-Recherche unterscheiden. Sie prüfen eine konkrete Vergrößerungsbehauptung an zwei Quellen, protokollieren Fundstellen und Interessen, wählen ein Gerät für ihre Frage und überarbeiten eine selbst verfasste Gerätekarte nach Rückmeldung. Sieben Arbeitsaufträge berücksichtigen fachlichen Nutzen, Grenzen, sichere Verwendung und gemeinsamen Zugang zum Ergebnis. Es werden keine Sonnenversuche angeleitet.

Die 15 früheren Abschlussfragen sind ihren Lernabschnitten zugeordnet. Zehn ältere Fragen haben drei inhaltlich begründete Antwortmöglichkeiten; ungenaue Gleichsetzungen von Spiegeln und Linsen sowie bloße Worterkennung wurden überarbeitet. Vier neue Transferfragen ergänzen den Quellenauftrag. Alle 32 Fragen besitzen eine passende Abschnittswiederholung und eine begründete Rückmeldung für jede der 96 Antworten. Richtige Antwortpositionen sind verteilt; Quizantworten ersetzen kein eigenes Rechercheprodukt.

## Fachquellen

Am 23.09.2026 geöffnet und in den relevanten Stellen gelesen:

- [Universität Wien: Fotogalerie](https://astro.univie.ac.at/oeffentlichkeitsarbeit/fotogalerie/): eigener Großer Refraktor mit 68 cm Linsenöffnung; Instrumentangaben zu Aufnahmen. Kein umfassender Gerätevergleich.
- [ZEISS: Know Your ZEISS Objective](https://www.zeiss.com/microscopy/en/l/great-britain/campaigns/2025/know-your-zeiss-objective.html): Vergrößerung, Auflösung, Objektive. Das Verkaufsinteresse und der auf der Seite ausgewiesene KI-Hinweis sind in der Quellenkarte sichtbar. Kein pauschales Glaubwürdigkeitsurteil allein aufgrund dieser Merkmale.
- [OpenStax: Limits of Resolution](https://openstax.org/books/college-physics-2e/pages/27-6-limits-of-resolution-the-rayleigh-criterion): Abbildung 27.25 und Erklärung der Auflösungsgrenze. Für die 2. Klasse dient der qualitative Bildvergleich; die Formeln werden nicht verlangt.
- [NASA: Eclipse Viewing Safety](https://science.nasa.gov/eclipses/safety/): insbesondere die Warnung vor der Kombination von gewöhnlichen optischen Geräten mit einer Sonnenfinsternisbrille vor dem Auge. Der Schulauftrag bleibt bei Text- und Bildrecherche.

## Prüfungen

- `test_optics_research.js`: 96 Antwortwege mit separat festgehaltenen Lösungserwartungen, Prozentwerten, Revision 7, Wiederholungsfrage und korrektem Abschnitt. Arbeitsblatt mit zehn Abschnitten, vier Quellenkarten, sieben Aufträgen, Quellennotiz und getrennten Lösungen.
- `test_lens_models.js`: bestehende Strahlenmodelle und Versuchsverträge bestehen weiterhin. Die geometrischen Elemente aller zehn SVGs wurden mit dem Vorzustand verglichen: unverändert. Am Augenmodell wurden Beschriftungsgröße und -farbe verbessert; ein per Tastatur bedienbarer horizontaler Bildausschnitt erhält auf kleinen Bildschirmen die Darstellungsgröße. Die zwei Schaltflächen erreichen Textkontraste von 6,58:1 und 6,06:1.
- `test_physics_worksheets.js`, `test_translation_revisions.js`, `test_complete_chapter_quizzes.js`: bestanden. Übersetzungen wurden nicht bearbeitet.
- `browser_optics_research.js`: am 23.09.2026 um 15:55:03 UTC bestanden: 96 bewertete Antwortwege, zwölf freie Antworten ohne Speicheränderung, 64 Abschnittsrücksprünge mit korrektem Fokus, sechs Ansichten bei 320/390/1280 Pixeln und hellem/dunklem Design, per Tastatur bedienbare Vergleichslösung; keine Browserfehler. Der Test öffnet nach einer Abschnittswiederholung den Check erneut und startet über die bestehende Ergebnisansicht einen neuen Versuch.
- Zusätzliche finale Prüfung des Augenmodells: vier Ansichten, acht Nah-/Fernwahlen, Textkontraste, horizontales Scrollen per Pfeiltaste und keine Überbreite der Seite. Die Lesbarkeitskorrektur ändert keine Fragen oder Modellgeometrie.
- Schülerfassung und Lösungsfassung erzeugt. Von der 38-seitigen Lösungsfassung wurden die Seiten 8–10, 12, 15, 22–23, 25, 34 und 37–38 visuell geprüft: Quellenkarten, Rechercheauftrag, Quellennotiz, neuer Wölbspiegeltext, ausgewählte geänderte Fragen sowie Recherchefragen und -lösungen. Nach der Druckkorrektur enthalten die getrennten Lösungshinweise auch die zuvor fehlenden Spiegel- und Linsenvergleichswerte. Die endgültigen Seiten 37–38 wurden erneut gelesen; die neun übrigen genannten Seiten sind gegenüber der gesichteten Fassung bildidentisch. Die übrigen Seiten sind damit nicht vollständig visuell abgenommen. Nachweise unter `../browser-qa/optics-research/`.

Das aktuelle Inventar enthält weiterhin 198 Kapitel. Der strukturelle Prioritätsaudit zählt 2.006 Frageninstanzen, davon 458 in Physik, ohne strukturellen Befund. Aktuell sind 274 Funktionstestsuiten vorhanden; der letzte vollständige Lauf mit 271 Suiten lag vor der Word-, DGB-Lernweg- und dieser Optiküberarbeitung. Die neuen gezielten Nachweise sind davon getrennt.

Der neue Inhalt schließt den konkreten Rechercheauftrag in diesem Kapitel. Der fachweite Physikabgleich, die konsistente Einteilung in Grundstoff und Vertiefung sowie die Gesamtprüfung aller elf Fächer bleiben offen. Es wurde kein erneuter vollständiger Lauf sämtlicher Testsuiten und keine neue Veröffentlichung vorgenommen.
