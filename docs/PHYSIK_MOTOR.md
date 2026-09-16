# Elektromagnetismus: Drehwirkung einer Spule

Stand 16.09.2026, 3. Klasse / 7. Schulstufe. Ergänzung im bestehenden Motorabschnitt, Kapitelrevision 6. Lokale Weiterarbeit nach GitHub-Zwischenstand 654367e; die vorherigen Ergänzungen aus PHYSIK_INDUKTION.md bleiben erhalten.

## Geschlossene Inhaltslücke

Die bisherige Interaktion zeigte ausschließlich die Kraft auf ein einzelnes Leiterstück. Das neue Modell verbindet zwei gegenüberliegende Spulenseiten mit ihrer gemeinsamen Drehwirkung. Begleittexte erklären Stator, Rotor, Bürsten, geteilten Ring/Polwender, Energiezufuhr und Totpunkte. Die bestehende Elektronenbahn ist als Vertiefung bezeichnet.

Acht einstellbare Winkel von 0° bis 315°, Polwender oder feste Stromrichtung, normale oder vertauschte Versorgung sowie Versorgung ein/aus ergeben 64 Zustände. A und B bleiben dieselben Leiterseiten. Ihre Lage, Punkt-/Kreuzsymbole und Kraftpfeile ändern sich gemeinsam. Rückmeldungen unterscheiden Kraftsumme, Drehmoment und tatsächlich vorhandene Bewegung. Vorwärts-/Rückwärtsschritte wechseln über die Grenze von 315° zu 0°; Rücksetzen stellt die Ausgangslage und den Fokus wieder her. Keine Punkte, Wartezeiten oder Speicherung durch die Werkstatt.

Bei festem äußeren Feld nach rechts folgt die Kraft aus der technischen Stromrichtung quer zur Zeichenebene. Im Modell ist die relative Drehwirkung proportional zu cos(Winkel) mal Stromrichtung. Diese Rechenformel wird intern verwendet, aber nicht als Trigonometrieanforderung an Schüler:innen gestellt. Beim Polwender wechselt die Spulenstromrichtung zwischen den Halbkreisen; bei 90° und 270° wird eine idealisierte Kontaktunterbrechung gezeigt. Bei fester Stromrichtung kann dort eine Kraft ohne Drehwirkung bestehen, weil ihre Wirkungslinie durch die Achse läuft.

Die Winkel werden von außen eingestellt. Das Modell berechnet keine zeitliche Drehbewegung, Drehzahl, Last, Reibung oder Gegeninduktion. Bürsten, Ring und Leitungen sind textlich erklärt; das eigene Bild ist eine Stirnansicht der aktiven Leiterseiten und kein vollständiger Stromlauf- oder Bauplan. Das Ausschalten wird ausdrücklich nicht mit sofortigem mechanischem Stillstand gleichgesetzt.

## Aufgaben und Papiermaterial

Vier neue Arbeitsaufträge vergleichen feste Stromrichtung und Polwender, vertauschte Anschlüsse, Ausschalten und Start im Totpunkt. Zwei eigene statische Spulenskizzen bleiben im Ausdruck erhalten. Acht vorgegebene Papierfälle besitzen zwei auszufüllende Spalten zur Drehwirkung und eine getrennte Vergleichslösung; sie sind keine gemessenen Daten.

Drei neue Verständnisfragen betreffen Polwender, Kräftepaar und Totpunkt. Insgesamt enthält das Kapitel nun 30 bewertete Fragen mit 90 Antwortmöglichkeiten. Alle haben eine konkrete Abschnittszuordnung; alte Ergebnisse aus Revision 5 gelten nicht als aktueller Nachweis.

## Quellen und Nachweise

Am 16.09.2026 fachlich geprüft gegen [OpenStax: Motors, Generators, and Transformers](https://openstax.org/books/physics/pages/20-2-motors-generators-and-transformers), [LEIFIphysik: Elektromotor](https://www.leifiphysik.de/elektrizitaetslehre/kraft-auf-stromleiter-e-motor/grundwissen/elektromotor) und [LEIFIphysik: Umpolen beim Elektromotor](https://www.leifiphysik.de/elektrizitaetslehre/kraft-auf-stromleiter-e-motor/aufgabe/umpolen-beim-elektromotor). Eigene Texte, Aufgaben und Grafiken; keine fremden Abbildungen übernommen. Dies ergänzt das qualitative Untersuchen von Motoren, ersetzt jedoch keinen vollständigen neuen Lehrplanabgleich.

- `test_motor_learning.js`: 64 unabhängig erwartete Zustände und 192 Klassifikationen, Strom-/Kraftrichtungen und Koordinaten, relative Drehmomente, Totpunkte, Steuerelemente, Fokus, Neustart, wiederholte Initialisierung, Winkelübergänge, unveränderter Speicher, zwei statische Bilder und acht Papierfälle bestanden.
- `test_electromagnetism_questions.js`: alle 30 Fragen und 90 unabhängig festgelegten Antwortwege einschließlich Auswertung, Rückmeldungen, Abschnittszuordnung, Wiederholungs-IDs und Revision 6 bestanden.
- `browser_motor_learning.js`: Chromium 151.0.7922.34, Bericht 2026-09-16T13:24:24.542Z. 64 Zustände, 192 per Tastatur ausgelöste Entscheidungen, Eingaben/Neustart/Winkelübergänge, SVG-Text- und Formgrenzen, 24 Layoutfälle bei 320/390/1280 px und beiden Designs sowie Papier-/Lösungstrennung bestanden. Keine Seitenfehler. Diagramme bei 135° und 90° sowie die vollständige mobile Werkstatt im dunklen Design tatsächlich gelesen.
- `browser_induction_learning.js`: erneuter erfolgreicher Bericht 2026-09-16T13:26:24.556Z. Alle 90 Antwortmöglichkeiten, sieben gezielte Wiederholungsziele bei 97 Prozent, 24 Induktionsfälle/72 Entscheidungen, zehn Transformatorstellungen, 18 Layoutfälle und Druckexport bestanden. Der zunächst fehlerhafte Vorschauhost im Prüfsystem wurde korrigiert; kein Produktfehler oder fehlender Vorschauprozess.
- Gezielte Regressionen: Induktion, Elektromagnetismus-Grundlagen und alle 20 Physikarbeitsblätter bestanden. Syntax und Diff sauber. Kein neuer vollständiger Suitenlauf.
- A4-Druckausgabe mit Lösungen: 38 Seiten. Seiten 6–9, 24, 25, 34, 37 und 38 gerendert und gelesen. Winkelspalte nach erster Prüfung verbreitert. Nach den Browserläufen zwei unbewertete Textstellen präzisiert; finaler Druckexport 2026-09-16T13:28:34.823Z. Betroffene Seiten 9 und 37 erneut gelesen, übrige ausgewählte Seiten bildidentisch verifiziert. Keine Sichtprüfung sämtlicher Seiten.

Inventar 197 Kapitel, Prioritätsaudit 1613 Frageninstanzen (Physik 446), ohne strukturellen Befund. Weiter offen: übrige Modelle, insbesondere die anschauliche Darstellung getrennter Relaiskreise, praktische Unterrichtserprobung, vollständige Kapitel-/Fachlehrplanprüfung, Grundstoff-/Vertiefungsstruktur im Gesamtangebot und vollständige Produktabnahme aller bestehenden Fächer. Übersetzungen bleiben zurückgestellt; die fünf priorisierten Fächer und der Gesamtauftrag bleiben unverändert. Kein weiterer Push oder Nachweis einer neuen veröffentlichten Fassung in diesem Schritt.
