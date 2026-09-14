# Sonnensystem: Größen, Bahnwerte und Maßstab

Stand: 14.09.2026. Kapitel `astronomie`, Abschnitt 7, Revision 4. Die Vertiefung ersetzt nicht den frühen Kernweg Erde/Mond/Sonne.

## Änderung und fachlicher Zweck

Der bisherige Scanner kombinierte eine Linksverschiebung bis −3600 SVG-Einheiten mit einer Verkleinerung auf 0,3. Damit verschwanden beim Herauszoomen die Planeten aus dem Bild. Größen, symbolische Bahnen und räumliche Lage waren zudem nicht sauber getrennt.

Der neue Vergleich zeigt alle acht Planeten als beschriftete Balken. Wählbar sind große Halbachsen (lineare Skala 0–40 AE) und mittlere Körperdurchmesser (0–12 Erddurchmesser). Die unterschiedlichen Skalen und die Grenzen der Darstellung stehen bei den Diagrammen. Die Balken zeigen keine gegenwärtigen Planetenorte. Pluto wird ausdrücklich als Zwergplanet eingeordnet und gehört nicht zu dieser Acht-Planeten-Tabelle.

Ein zweiter Teil verkleinert Körperdurchmesser und Bahnwerte mit demselben Maßstab. Die Modell-Erde ist wahlweise 1 mm, 1 cm oder 10 cm groß. Alle acht Modellwerte erscheinen in einer Tabelle; die Auswahl hebt einen Planeten hervor und erklärt seine Werte. Native Auswahlfelder, Reset mit Fokus und wiederholbare Änderungen ohne Punktkosten oder Speichereinträge.

Vier Aufträge verbinden Vorhersage, Datenvergleich, Maßstab und Modellkritik. Die fiktive Planung für eine Wiener Schulklasse gibt 200 m geradlinigen Platz ab der Modell-Sonne vor; sie behauptet keinen tatsächlichen Schulhof oder öffentlichen Weg. Große Halbachsen werden als Markierungen auf eine Linie übertragen, nicht als gleichzeitige tatsächliche Planetenorte. Papierfassung mit Datentabelle, Rechenhilfe und Protokoll; Lösungen separat. Zwei zusätzliche bewertete Transferfragen prüfen den gemeinsamen Maßstab und die Unterscheidung zwischen Bahngröße und aktuellem Abstand.

## Quellen und Berechnung

Am 14.09.2026 unmittelbar gelesen:

- [NASA/JPL: Planetary Physical Parameters](https://ssd.jpl.nasa.gov/planets/phys_par.html): doppelte mittlere Radien, auf ganze Kilometer gerundet. Durchmesser: Merkur 4879, Venus 12104, Erde 12742, Mars 6779, Jupiter 139822, Saturn 116464, Uranus 50724, Neptun 49244 km. Volumengleiche Kugeln, keine Äquatordurchmesser und keine Ringausdehnung.
- [JPL: Approximate Positions](https://ssd.jpl.nasa.gov/planets/approx_pos.html), Tabelle 1: J2000-Halbachsen für das Lehrmodell auf zwei Dezimalstellen gerundet: 0,39; 0,72; 1,00; 1,52; 5,20; 9,54; 19,19; 30,07 AE. Der JPL-Erde-Eintrag betrifft den Erde-Mond-Schwerpunkt; die Näherung 1 AE ist bei dieser Rundung passend. Keine aktuelle Ephemeride berechnet.
- [JPL: Astrodynamic Parameters](https://ssd.jpl.nasa.gov/astro_par.html): 1 AE = 149597870700 m, gemäß IAU 2012 B1.
- [NASA: Pluto Facts](https://science.nasa.gov/dwarf-planets/pluto/facts/): Zwergplanet. Diese Seite dient nicht als Quelle der acht Bahnwerte. Die heutige JPL-Seite enthält keinen Pluto-Eintrag; keine historische Zahl daraus übernommen.

Für gewählten Erddurchmesser `E` in mm gilt: Modellkörper = Körperdurchmesser / 12742 × E (mm); Modellhalbachse = große Halbachse in AE × 149597870,7 / 12742 × E / 1000 (m). Berechnet mit ungerundeten Zwischenergebnissen, angezeigt auf 0,01 mm bzw. 0,1 m. Bei E = 10: Erde 117,4 m / 10,00 mm; Mars 178,5 m / 5,32 mm; Jupiter 610,5 m / 109,73 mm; Neptun 3530,4 m / 38,65 mm. Die Papierhilfe 117,4 m je AE erzeugt kleine zusätzliche Rundungsabweichungen; darauf weisen die Lösungen hin.

## Nachweise und Grenzen

- `test_astronomy_solar_workshop.js`: 48 Kombinationen (8 Planeten × 3 Maßstäbe × 2 Ansichten), unabhängig übertragene Quellwerte und Umrechnung über einheitliche SI-Längen, proportionale Balken, Auswahl/Reset/Fokus, unveränderte Einstellungen bei wiederholter Initialisierung, keine Modell-Speichereinträge, Papierdaten/Protokoll/Lösungstrennung. Bestanden.
- `test_astronomy_question_feedback.js`: alle 261 Übungsantwortwege der jetzt 87 Fragen sowie alle 123 Antwortwege der 41 bewerteten Fragen; korrekte Wiederholungsabschnitte und Revision 4. `test_astronomy_orbit_workshops.js`, `test_physics_worksheets.js` und `test_complete_chapter_quizzes.js` ebenfalls bestanden. 46 reine Übungsfragen bleiben erhalten. Automatische Auswertungen beweisen nicht die Wahrheit redaktioneller Texte.
- `browser_astronomy_solar.js`: tatsächlicher Chromium 151.0.7922.34, Bericht vom 2026-09-14T01:35:56.838Z, 48 Zustände, gemessene Balkenlängen, Tastaturauswahl/Reset/Fokus, sechs neue native Antwortklicks, Papieraufgaben. Breiten 320/390/1280 jeweils ohne Seitenüberlauf. Die Tabelle passt bei 390 px vollständig und erzeugt daher keine zusätzliche Scroll-Fokusstation. Eine anfängliche Testannahme, jede Tabelle müsse scrollen, wurde anhand ihrer gemessenen Breite korrigiert. Keine Browserfehler.
- Mobile Balkenansichten, Modellbedienung und Tabelle tatsächlich als Screenshots gelesen. A4-Export mit 47 Seiten: Modellseiten 9/10 und Lösungsteil 47 geprüft. Papieraufträge wurden von Bildschirmbezügen befreit. Die dekorative Onlineabbildung wird im Papier ausgelassen. Ein alleinstehender Listenpunkt am Seitenende wurde durch Zusammenhalten der Quellen-Listeneinträge korrigiert; Seiten 10/11 anschließend erneut visuell geprüft. Nicht alle 47 Seiten geprüft.

Die bestehenden Browser-Skripte für sämtliche Astronomiefragen und ältere Bahnmodelle wurden auf die neue Revision und die zusätzlichen Fragen/Papieraufgaben angepasst, in diesem Schritt aber nicht erneut vollständig ausgeführt. Frühere Berichte bleiben historische Nachweise. Kein neuer Gesamtlauf aller jetzt 182 Funktionstests, keine vollständige Kapitel-, Lehrplan- oder Produktabnahme. Übersetzungen bleiben auf Nutzerwunsch zurückgestellt. Änderungen nach Zwischenstand b70a5cf lokal; kein weiterer Push in diesem Schritt.
