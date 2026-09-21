# Geometrie-Praxis der zweiten Klasse

Stand 21.09.2026. Fortsetzung nach dem auf Nutzerwunsch gepushten Zwischenstand `4b934d8`. Die dort noch laufenden Zeichen-, Kongruenz-, Symmetrie- und Anwendungsaufträge sind jetzt ausgearbeitet und im folgenden Umfang geprüft. Übersetzungen bleiben zurückgestellt. Keine erneute Veröffentlichung oder vollständige Fachabnahme.

## Inhalte

`math2_7_geometrie` bleibt bei neun Abschnitten und verwendet Revision 9: 40 bewertete Fragen, 14 Lernziele und 14 Zusammenfassungspunkte. Die acht ergänzten Fragen betreffen Neigung, Dreiecksarten, Kongruenzzuordnung, Quadranten, Rückverschiebung, Streckensymmetrale und Achsenprüfung. Die unergiebige Prismaantwort „Nur die Deckfläche anschauen“ wurde durch die konkrete Fehlvorstellung einer doppelten Grundfläche ersetzt.

Sechs Abschnitte enthalten jeweils drei zusätzliche eigene Aufgaben mit Vergleichslösungen: Winkel zeichnen und begründen; Dreiecke einordnen; SWS/WSW konstruieren und entsprechende Ecken zuordnen; alle Eckpunkte zeichnen, verschieben und spiegeln; Orte mit gleichen Abständen konstruieren; ganze Figuren auf Achsensymmetrie prüfen. Die Kontrollmaße wurden unabhängig nachgerechnet. Näherungen dienen der Zeichnungskontrolle, nicht als zusätzliche Konstruktionsangaben.

Die Koordinatenwerkstatt lässt alle vier Eckpunkte selbst eintragen und prüft jede Koordinate. Drei Aufträge verbinden ein Rechteck in allen vier Quadranten mit Verschiebung und y-Spiegelung. Leere, ungültige und noch nicht gespeicherte Eingaben werden berücksichtigt. Die Symmetriewerkstatt verlangt zuerst eine Vermutung und vergleicht dann Ausgangsfigur und Spiegelbild. Fünf Figuren und vier festgelegte Achsen ergeben 20 Fälle; passende Eckenzuordnungen oder ein Gegenbeispiel begründen das Ergebnis.

Zwei neue Papieralternativen und zwei statische Koordinatenzeichnungen ergänzen die bisherigen Materialien. Im gesamten Kapitel werden zehn statische Zeichnungen und acht Gruppen von Vergleichslösungen gedruckt. Die Geraden sind auch ohne Onlineauswahl vollständig angegeben. Die Volumenformel bleibt beim Drucken mit ihrer Erklärung zusammen.

## Prüfbelege

| Prüfung | Beobachteter Umfang |
| --- | --- |
| `scripts/test_geometry_practice.js` | Drei vollständige Figuren; 21 Eingabe-/Fehlerfälle; 482 Konstellationen für einzelne, zusammenfallende und benachbarte Punkte; 20 unabhängig geprüfte Spiegelungen mit 40 Vermutungen; Messkontrollen, Fokus, Enter, Zurücksetzen und unveränderter gespeicherter Lernstand. |
| `scripts/test_quadrilateral_constructions.js` | 42 Konstruktionszustände, 45 Flächenmodelle und alle 120 Antwortwege anhand eines unabhängig festgelegten Schlüssels in `scripts/fixtures/geometry_answer_keys.json`; Revision 9, 98 % bei einem Fehler und passende Wiederholungsfragen; 48 erzeugte Arbeitsblattfälle. |
| `scripts/browser_geometry_practice.js` | 360 Zustände bei 320, 390 und 1280 Pixeln, hell/dunkel; zusätzlich 482 Punktkonstellationen bei 320 Pixeln. Insgesamt 842 Ansichten ohne Überlauf oder überlappende Textbeschriftungen, SVG-Text mindestens 12 sichtbare Pixel, Bedienelemente mindestens 44 Pixel hoch. Eingaben, Fehler, Tastatur und Fokus tatsächlich im Browser geprüft. |
| `scripts/browser_quadrilateral_constructions.js` | Erneut 546 Konstruktions-/Flächenansichten und alle 120 Quizantworten; Kapitelcheck mit Fehler, Revision, Wiederholungslink und Druckexport. Keine erfassten Browserfehler. |
| Weitere Prüfungen | Zweitklass-Kapitel einschließlich 1000 Seitenkombinationen, 242 Punktspiegelungen und 25 Verschiebungen; Prismaflächen/-netz; Suchindex und 96 STEM-Arbeitsblätter bestanden. Dies ersetzt keine Sichtprüfung der älteren Modelle. |

Neue mobile Ansichten wurden zusätzlich als Bilder gelesen. Erkannte Überlagerungen von Punktnamen mit Achsenwerten wurden durch reservierte Beschriftungsbereiche und Zuordnungslinien behoben; zusammenfallende Punkte behalten ihre einzelnen Namen. Transformationen wurden unabhängig anhand von Längen, Mittelpunkten und Spiegelachsen geprüft.

Die vollständige Druckfassung mit Lösungen umfasst 50 Seiten. Alle Seiten wurden gelesen; nach Korrekturen zwölf veränderte Seiten erneut gelesen. Die abschließende Präzisierung einer Papieraufgabe und der letzte reproduzierbare Aufgabenexport änderten nochmals fünf Seiten (12, 20, 21, 46, 47), die ebenfalls gelesen wurden; die übrigen 45 Rasterseiten waren identisch mit der geprüften Fassung. Alle zwölf erzeugten Aufgaben und Lösungen wurden einzeln nachgerechnet. Die PDFs sind interne lokale Prüfarbeitsblätter, keine veröffentlichte Unterrichtsausgabe.

Lokale Belege außerhalb des Repositorys: `../browser-qa/geometry-practice/report.json`, `final/report.json` und `checked/geometry-solutions.pdf` mit Seitenbildern und Vergleichslisten. Inventar: 198 Kapitel; Strukturprüfung der fünf priorisierten Fächer: 1887 Frageninstanzen, davon 660 Mathematik, ohne gemeldete Strukturfehler. Diese Zahlen sind kein Vollständigkeitsnachweis.

## Verbleibende Arbeit

Die älteren Dreiecks-, Punktspiegelungs-, Verschiebungs- und Prismaansichten sind gesondert auf kleine Bildschirme, Beschriftungen und Tastaturbedienung zu prüfen bzw. zu verbessern. Die Quellen enthalten dort noch kleine SVG-Schriften; die neuen Browsermatrizen decken diese Ansichten nicht ab. Ältere Werkstätten verweisen in der Papierfassung teilweise auf das Onlinekapitel; eigenständige Papieralternativen bleiben auszuarbeiten. Die neuen Zeichenaufträge und SSS-Werkstatt ergänzen diese, ersetzen aber keine Prüfung aller Angebote. Handzeichnungen werden durch Vorgaben und Vergleichslösungen begleitet, nicht automatisch bewertet. Weitere Mathematikbereiche, die übrigen Fächer und die vollständige Produktabnahme bleiben offen.
