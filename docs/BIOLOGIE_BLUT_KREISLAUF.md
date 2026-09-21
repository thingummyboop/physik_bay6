# Blut und Herz-Kreislauf-System

Stand: 21.09.2026. Kapitel `bio_3_blut_kreislauf`, Revision 2, für die 7. Schulstufe. Baut auf Atmung und Energie auf.

## Inhalt und Unterricht

Vier Abschnitte verbinden den Blutweg, die Zusammenarbeit der Blutbestandteile, Pulsdaten und Pumpenmodelle sowie Bewegung und den Schutz persönlicher Körperdaten. Zwölf direkt ausgearbeitete Aufgaben, 16 Fachbegriffe und vier getrennte Vergleichslösungen unterstützen Unterricht und selbstständiges Wiederholen. Elf bewertete Fragen haben antwortspezifische Rückmeldungen; eine weitere Übung bleibt punktfrei.

Ein eigenes Funktionsschema unterscheidet Lungen- und Körperkreislauf. Die geführte Werkstatt verfolgt zehn Stationen mit jeweils drei Antwortmöglichkeiten. Fehler erklären den jeweiligen Denkfehler; erst eine richtige Antwort gibt den nächsten Schritt frei. Abschluss und Zurücksetzen sind per Tastatur erreichbar. Die Werkstatt verändert keinen gespeicherten Lernstand. Für den Ausdruck gibt es eine vollständige Papieralternative.

Arterien und Venen werden nach ihrer Richtung zum Herzen unterschieden. Sauerstoffarm bedeutet nicht sauerstofffrei; das Schema stellt keine anatomische Lage dar. Beide Herzhälften arbeiten gleichzeitig. Blut transportiert Sauerstoff, erzeugt ihn aber nicht; Kohlenstoffdioxid entsteht bei Stoffwechselvorgängen. Plättchen und Gerinnungsproteine wirken beim Wundverschluss zusammen.

Die erfundenen Pulsdaten ergeben 72, 108 und 80 Schläge pro Minute. Ein zusätzlicher gezählter Schlag im 15-Sekunden-Fenster verändert die Hochrechnung um vier Schläge pro Minute. Drei getrennte Pumpenmodelle ergeben 5,04, 7,56 und 5,4 Liter pro Minute je Kammer. Gleiche Frequenz bedeutet bei unterschiedlichem Schlagvolumen nicht gleichen Volumenstrom. Die Zahlen sind keine gesundheitlichen Normwerte für Kinder. Einzelne Messfenster erlauben keine lückenlose Erholungskurve.

Eigene Pulsmessungen sind freiwillig und angeleitet; alle Aufgaben lassen sich mit den erfundenen Daten bearbeiten. Persönliche Werte bleiben privat. Die Unterrichtsfälle behandeln anpassbare Bewegung, ungeeignete Ranglisten und rasches Hilfeholen bei starken Brustschmerzen mit akuter Atemnot. Es gibt keine Aufforderung zur Selbstdiagnose oder Blutentnahme.

## Prüfungen und Grenzen

- `scripts/test_circulation_route.js`: 30 Werkstattentscheidungen, zehn geschützte Übergänge, Abschluss, Rücksetzen, Fokus, doppelte Initialisierung und unveränderter Speicher. Alle 33 Quizantwortwege anhand separat festgelegter Lösungsschlüssel geprüft; bei einer falschen Antwort 91 Prozent und passende Wiederholungszuordnung. Aufgaben, Begriffe, Zahlen, Revision und Papiermaterial geprüft. Nach den letzten Textpräzisierungen erneut bestanden.
- `scripts/browser_circulation_route.js`: Chromium 151.0.7922.34; Bericht vom 21.09.2026, 06:27:46 UTC. 30 native Werkstattentscheidungen, 33 Quizantwortwege und 66 Layoutzustände bei 320, 390 und 1280 Pixeln, jeweils hell und dunkel. Tastatur, Fokus, Speicher und tatsächliche Kartenfarben geprüft; keine Browserfehler.
- Alle 14 mobilen Detailbilder gelesen. Alle 20 Druckseiten kontrolliert. Letzter Export: 21.09.2026, 06:29:43 UTC. Nach Präzisierung des Auftrags zu Glucosetransport und Wärmeverteilung änderten sich nur Seiten 7, 19 und 20; diese wurden abschließend erneut gelesen. Keine abgeschnittenen Inhalte festgestellt. Die vollständigen Browserinteraktionen wurden vor diesen letzten Textänderungen geprüft.
- Gemeinsame Materialprüfungen für 95 STEM-Arbeitsblätter, Kapitelrevisionen, vollständige Quizpools und Syntaxprüfung von 93 Themenskripten bestanden. Inventar: 197 Kapitel. Prioritätsaudit: 1.657 Frageninstanzen ohne Strukturfehler.

Browserberichte und Bildartefakte liegen außerhalb des Repositorys im lokalen Prüfverzeichnis. Dies ist eine gezielte Kapitelprüfung, keine vollständige Fach- oder Produktabnahme.

## Quellen

Fachlich gegengeprüft am 21.09.2026:

- [Österreichisches Gesundheitsportal: Herz-Kreislauf-System](https://www.gesundheit.gv.at/krankheiten/herz-kreislauf/info.html) – Herzräume, Klappen und Kreisläufe.
- [OpenStax: Heart Anatomy](https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy) – Blutweg und Herzaufbau; keine Wiederbelebungsanleitung aus dieser Quelle übernommen.
- [Gesundheitsportal: So funktioniert Blut](https://www.gesundheit.gv.at/krankheiten/blut/so-funktioniert-blut.html) und [OpenStax: Components of the Blood](https://openstax.org/books/biology-2e/pages/40-2-components-of-the-blood) – Blutbestandteile. Die irreführende Gleichsetzung von verbrauchtem Sauerstoff und Kohlenstoffdioxid im Gesundheitsportal wird ausdrücklich nicht übernommen; vereinfachte Transfusionsregeln und die Serumformulierung bei OpenStax sind nicht Bestandteil des Kapitels.
- [OpenStax: Cardiac Physiology](https://openstax.org/books/anatomy-and-physiology-2e/pages/19-4-cardiac-physiology) – Herzminutenvolumen als Frequenz mal Schlagvolumen je Kammer. Keine Erwachsenen-Grenzwerte auf Kinder übertragen.
- [Gesundheitsportal: Bewegungsempfehlungen für Kinder und Jugendliche](https://www.gesundheit.gv.at/leben/bewegung/gesund-durch-sport/bewegungsempfehlungen-jugendliche.html) – regelmäßige, vielfältige Bewegung; der kleine Unterrichtsplan ergänzt die allgemeine Empfehlung.
- [Gesundheitsportal: Brustschmerzen](https://www.gesundheit.gv.at/krankheiten/erste-hilfe/notfaelle/brustschmerz.html) – Hilfeholen und Rettung 144 beim beschriebenen akuten Notfall.

Lehrplanbezug: Herz-Kreislauf-System, Zusammensetzung und Funktionen des Blutes, Zusammenwirken mit der Atmung und gesundheitsbezogenes Handeln. Grundlage ist der bereits dokumentierte österreichische Lehrplanabgleich; keine neue vollständige Lehrplanprüfung in diesem Arbeitsschritt.
