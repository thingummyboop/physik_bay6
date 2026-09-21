# Geometrie: ältere Modelle und Papieralternativen

Stand 21.09.2026. Ergänzung zum [Geometrie-Abgleich der zweiten Klasse](MATHEMATIK_GEOMETRIE_KLASSE2.md) und zur [Geometrie-Praxis](MATHEMATIK_GEOMETRIE_PRAXIS.md). Kapitelrevision 9, neun Abschnitte und 40 bewertete Fragen bleiben unverändert. Diese Nacharbeit schließt die dort benannten Modell- und Papierlücken; sie ist keine vollständige Mathematik- oder Produktabnahme.

## Lernangebote

- Dreiecke: Zeichnung bei gleichbleibender Skala zentriert; lesbare Eckennamen; Dreiecksungleichung, entartete Fälle und Einordnung nach Seiten und Winkeln bleiben erhalten. Drei Papieraufgaben vergleichen 3–4–5, 3–4–7, 3–4–8 sowie 3–3–3 und 3–3–5.
- Punktspiegelung: gemeinsames Koordinatenraster, deutliche Spiegelachse und getrennte Namen auch bei zusammenfallendem Punkt und Bild. Zwei Papieraufträge prüfen beide Achsen, gleiche Abstände und feste Punkte.
- Verschiebung: Original und Bild durch Linienarten unterschieden, alle drei Bildpunkte beschriftet. Drei Papieraufträge mit vollständigen Ausgangskoordinaten, Rückverschiebung, Längen-/Winkelvergleich und Nullverschiebung.
- Prismen: kompakte Schrägbilder für Quader, Dreiecks- und Fünfecksprisma sowie ein passendes Dreiecksprismanetz. Grundfläche G, Deckfläche D, Seitenfläche S und Körperhöhe h sind erläutert. Korrigierte Zeichenreihenfolge verhindert, dass hintere Flächen sichtbare Seiten verdecken. Vier statische Papierzeichnungen begleiten drei Aufgaben zu Flächenzahlen, eigenem Netz und Volumen.
- Vier ältere Referenzzeichnungen: größere Schriften; Streckensymmetrale m mit erklärender Legende; Längenbeschriftung außerhalb der Parallelogrammseite.

Insgesamt vier neue Papieralternativen mit elf Aufgaben und vier Lösungsgruppen. Das gesamte Kapitelarbeitsblatt enthält nun 14 statische Zeichnungen und zwölf Lösungsgruppen. Handzeichnungen werden mit Vorgaben und begründeten Vergleichslösungen begleitet; ihre individuelle Ausführung wird nicht automatisch bewertet.

## Konkrete Prüfbelege

`scripts/browser_geometry_models.js` prüfte 7650 Zustände: jeweils 1000 Seitenkombinationen, 242 Punktspiegelungen, 25 Verschiebungen, vier Prismenansichten und vier Referenzzeichnungen bei 320, 390 und 1280 Pixeln, jeweils hell/dunkel. Geprüft wurden Überlauf, Textüberschneidungen, mindestens 12 sichtbare Pixel für SVG-Schrift, mindestens 44 Pixel hohe Bedienelemente, native Tastaturbedienung und unveränderter gespeicherter Lernstand. Keine erfassten Browserfehler. Ausgewählte mobile Ansichten zusätzlich visuell gelesen, darunter die korrigierten Prismenflächen, das zentrierte Dreieck und die Referenzzeichnungen.

`scripts/test_math2_guides.js` kontrolliert weiterhin die mathematischen Dreiecks-/Spiegelungs-/Verschiebungsmodelle. `scripts/test_prism_geometry.js` prüft kongruente verschobene Flächen, passende Netzseiten und nun auch, ob G und S auf der tatsächlich sichtbaren richtigen Fläche liegen. Die Praxis- und Vierecksprüfungen bestanden erneut, einschließlich aller 120 Quizantwortwege. Die Materialprüfung für 96 STEM-Arbeitsblätter besteht.

`scripts/browser_geometry_model_worksheet.js` prüft die Papieralternativen, statischen Zeichnungen und Lösungsgruppen sowie alle zwölf erzeugten Antworten unabhängig. Ein-/Ausblenden der Lösungen verändert die Aufgaben nicht. Die reproduzierbare Druckfassung umfasst 54 Seiten. Gegenüber der vollständig gelesenen vorigen Praxisfassung waren 24 Rasterseiten identisch; die 30 veränderten Seiten wurden gelesen. Der abschließende Absatzumbruch und eindeutigere Lösungsüberschriften änderten acht Seiten (6–12 und 52); alle erneut gelesen, die übrigen 46 Rasterseiten unverändert. Damit ist die vollständige endgültige Druckfassung im dokumentierten Umfang geprüft.

Lokale Prüfbelege außerhalb des Repositorys: `../browser-qa/geometry-models/report.json`, `final/geometry-model-solutions.pdf`, `checked/report.json` und `checked/geometry-model-solutions.pdf` mit Seitenbildern. Die PDFs sind interne Prüfarbeitsblätter, keine veröffentlichte Unterrichtsausgabe. Nacharbeiten nach dem angeforderten GitHub-Zwischenstand `fe188ee` bleiben lokal.

## Weitere Arbeit

Die in diesem Dokument benannten Modell- und Papierlücken sind bearbeitet. Das anschließend geprüfte Verhältniskapitel ist inzwischen um Proportionsumformungen und Formeldeutungen ergänzt; [Umfang und Nachweise](MATHEMATIK_VERHAELTNISSE.md). Weitere Mathematikbereiche, die übrigen Fächer und die vollständige Produktabnahme bleiben offen.
