# Pilze: Aufbau, Entwicklung und begründete Zuordnung

Stand: 16.09.2026. `bio_2_pilze`, 2. Klasse / 6. Schulstufe, Revision 2. Lokale Weiterarbeit nach dem ausdrücklich gewünschten und bestätigten Push `dc9c169`.

## Inhalt

Die fünf bisherigen Abschnitte, 20 Glossareinträge und zwölf Fragen einschließlich der unbewerteten Übung wurden gelesen. Fünf allgemeine Trainingsblöcke sind durch 15 direkte Arbeitsaufträge mit Ausgangsmaterial und fünf gesondert aufdeckbaren Vergleichslösungen ersetzt. Die neue eigene Modellzeichnung unterscheidet Fruchtkörper, Myzel und einzelne Hyphe; Sporen sind ausdrücklich vergrößert, das Schema ist nicht maßstabsgetreu und gilt nicht für alle Wuchsformen. Das bisherige externe Bild mit pauschaler Lizenzangabe entfällt.

- Aufbau: drei beschriebene Proben, begründete Zuordnung und Grenzen des Hutpilzmodells; Backhefe als einzellige Form.
- Fortpflanzung: vereinfachter Entwicklungsweg und erfundene Daten zu zehn Sporen je Bedingung. Dasselbe Trägermaterial, Nährstoffzusatz und Feuchtigkeit sind ausdrücklich beschrieben. A/B unterscheiden sich in der Feuchtigkeit, A/C im organischen Nährstoffzusatz. Unterschiede 7 bzw. 8 von 10 werden berechnet und begrenzt interpretiert. Kein echter Versuch, keine Anleitung zur Schimmelzucht.
- Zersetzung: drei Vorgangskarten L–M–K, äußere Verdauung, mögliche Wege eines Kohlenstoffatoms, Trennung von Stoffkreislauf und Energiefluss. Ein verschwundenes Blatt erlaubt keine alleinige Ursachenzuordnung zu Pilzen. Die zu enge Humusdefinition wurde korrigiert.
- Beziehungen: Mykorrhiza und Flechte mit beschrifteten Austauschpfeilen vergleichen. Die bestehende Werkstatt erhält einen vierten Fall, in dem lediglich ein Fruchtkörper neben einem Baum beobachtet wird. Die vierte Antwort „Hinweise reichen nicht für eine Zuordnung“ ist hier richtig; bei den drei belegten Fällen nicht. Rückmeldung nennt Nahrungsquelle, Wirkung und fehlende Hinweise. Reset löscht die Auswahl/Rückmeldung und fokussiert das erste Fallmenü. Erneute Initialisierung erzeugt keine doppelten Handler, keine Speicherung der Übungsauswahl.
- Anwenden: erfundene Hefe-Vergleichsdaten (Schaumhöhe 0/5/9 mm mit Hefe, jeweils 0 mm ohne Hefe), Kontrollbedingung, Untersuchungsplanung und Grenze der Gasidentifikation. Schimmelbrot und unbekannter Fund auf einem Wienerwaldausflug sind konkrete Entscheidungsfälle. Die Wiener Pilzberatung ist direkt verlinkt; Fotoähnlichkeit ist keine Essfreigabe.

Fünf ursprüngliche Abschlussfragen wurden den passenden Abschnitten zugeordnet; IDs bleiben erhalten. Mehrere unplausible Distraktoren ersetzt, richtige Positionen verteilt. Zwei neue Transferfragen zu unzureichenden Belegen und Gasidentifikation: insgesamt 13 bewertete Fragen und eine Übung mit durchgehend null Punkten. Kapitelrevision 2 lässt frühere Ergebnisse als veraltet erkennen. Lernziele und Zusammenfassung angepasst. Freie Antworten werden nicht automatisch bewertet.

## Fachliche Grundlage und Lehrplan

Am 16.09.2026 direkt gelesen:

- [RIS: Lehrpläne der Mittelschulen, aktuelle Fassung](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007850): Biologie, W/E/S und Anwendungsbereich der 2. Klasse zu Struktur, Fortpflanzung und Symbiosen der Pilze. Modelle, Datenvergleiche, Versuchsplanung und begründete Handlungsempfehlungen verbinden die Kompetenzbereiche. Planung und erfundene Daten ersetzen keine praktische Durchführung.
- [OpenStax: Characteristics of Fungi](https://openstax.org/books/biology-2e/pages/24-1-characteristics-of-fungi) und [Ecology of Fungi](https://openstax.org/books/biology-2e/pages/24-3-ecology-of-fungi): fachlicher Abgleich zu Wuchsformen, Ernährung, Mykorrhiza und Flechten. Aufgaben, Daten und Zeichnung selbst erstellt; keine fremden Abbildungen übernommen.
- [Stadt Wien: Pilzberatung](https://www.wien.gv.at/gesundheit/pilzberatung): Fachstelle und Grenzen einer Bestimmung anhand von Bildern. Keine festen Öffnungszeiten in die Aufgabe übernommen.
- [AGES: Lebensmittelkontrolle Mais](https://www.ages.at/ages/presse/news/detail/lebensmittelkontrolle-mais): Hinweise zu unsichtbaren Schimmelanteilen und Umgang mit verschimmelten Lebensmitteln; die dortige Maisuntersuchung wird nicht als Brotversuch ausgegeben.

## Prüfungen und Grenzen

- `test_fungi_relations.js`: alle 16 Fall-/Antwortkombinationen, fehlende Auswahl, Änderung und Reset, Fokus und doppelte Initialisierung. 39 unabhängig festgelegte Quizantwortwege mit konkreter Rückmeldung, Prozentwert und korrekter Wiederholungszuordnung. Revision 2, fünf direkte Aufgabenblöcke, 15 unverändert gerenderte Aufgaben, sechs Datenzeilen, SVG, keine externe Abbildung. Tatsächliche Arbeitsblattgenerierung mit vier vollständigen Fällen, zwei Datentabellen und fünf getrennten Lösungen. Bestanden; nach letzter Textpräzisierung erneut bestanden.
- `browser_fungi_workshop.js`, Bericht `2026-09-16T16:29:02.734Z`, Chromium 151.0.7922.34: 16 native Entscheidungen, 24 Kombinationen aus vier Fällen, drei Breiten (320/390/1280) und hellem/dunklem Design. Kein äußerer Seitenüberlauf; mindestens 44 Pixel hohe Auswahlfelder, Schaltflächen und Antwortlabels. Tastaturwechsel, Radiopfeiltasten, Prüfen und Reset/Fokus; unveränderter lokaler Speicher für die Werkstatt. Alle 39 nativen Quizantwortwege bestanden. Keine Seitenfehler. Mobile Fallwerkstatt und Pilzschema in beiden Designs tatsächlich angesehen.
- Druck: 22 Seiten einschließlich Lösungen vollständig angesehen. Seiten 15/18/21 zusätzlich in höherer Auflösung, Frage 11 als Ausschnitt geprüft: Kästchen, Begründungsfelder und Überschriften vollständig. Die letzte Präzisierung des Trägermaterials führte zu neuem Export `2026-09-16T16:30:59.801Z`; nur Seite 4 änderte sich und wurde erneut gelesen, 21 andere Seiten waren per SHA-256 identisch. Keine abgeschnittenen oder überlappenden Inhalte festgestellt.
- Gemeinsame Prüfungen: 95 STEM-Arbeitsblätter, Kapitelrevisionen, vollständige Quizpools und Syntax der 87 Themenskripte bestanden. Titelindex erneuert. Inventar 197 Kapitel; Strukturprüfung 1.638 priorisierte Frageninstanzen ohne Befund. Kein neuer vollständiger Gesamtsuitenlauf und keine vollständige fachliche Abnahme aller Kapitel.

Browserberichte und Druckbilder liegen außerhalb des Repositorys unter `../browser-qa/fungi-workshop`. `final-01.png` bis `final-22.png` bilden die letzte Druckfassung ab. Testlinks verwenden die lokale Vorschauadresse.

Aktuelle Strukturzählung in den 39 Biologiekapiteln: 67 direkte und 87 automatisch verarbeitete Trainingsblöcke; 61 automatische Blöcke enthalten noch die allgemeine Situationsformulierung. 24 Kapitel besitzen mindestens einen automatischen Block. Dies lenkt weitere Einzelprüfung und ist kein Qualitätsurteil über sämtliche Inhalte. Weitere Kapitel und die vollständige Produktabnahme bleiben offen. Übersetzungen zurückgestellt; dieser neue Stand wurde nicht gepusht.
