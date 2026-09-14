# Astronomie: Kepler und Umlaufbahnen, 14.09.2026

## Befund und Umfang

Nach dem gesicherten Zwischenstand 797dd9d wurden die 22 deutschen Astronomie-Erklärabschnitte gelesen. Die vertiefte Umsetzung betrifft hier die Abschnitte 3 und 4: Keplers Gesetze sowie Umlaufbahn und Orbit. Die bisherige Kepler-Grafik nutzte eine frei gestaltete Animation und Flächen, die nicht aus gleichen Zeitabschnitten berechnet wurden. Der bisherige Orbit-Regler zeigte für ein ganzes Geschwindigkeitsintervall dieselbe Kreisbahn und verband gezeichnete Höhen mit pauschalen Geschwindigkeitsgrenzen. Modellannahmen fehlten teilweise.

Die neuen Werkstätten ersetzen diese beiden Darstellungen im deutschen Kapitel. Alte Funktionen bleiben für bestehende fremdsprachige Kapitelstrukturen verfügbar. Übersetzungen wurden auf Nutzerwunsch nicht überarbeitet. Das Kapitel bleibt eine Vertiefung; diese Änderung ersetzt nicht den Kernweg Erde–Mond–Sonne.

## Berechnungen und Lernaufträge

Kepler: erfundene Ellipse mit großer Halbachse 1, kleiner Halbachse 0,8 und Exzentrizität 0,6. Neun auswählbare Zeitpunkte von 0/8 bis 8/8 einer Umlaufzeit. Die Position folgt aus der Kepler-Gleichung M = E − e sin(E), gelöst mit Newton-Iteration. Die Geometrie verwendet x = cos(E) − e und y = 0,8 sin(E); der Stern liegt im Brennpunkt. Tempo und Abstand beziehen sich auf frei gewählte Modelleinheiten. In Sonnennähe sind Abstand und Tempo 0,4 bzw. 2, in Sonnenferne 1,6 bzw. 0,5. Jeder vollständige Zeitschritt überstreicht 1/8 der Ellipsenfläche. Die sichtbare Fläche verwendet 80 kurze Sehnen; sie ist eine grafische Näherung an die berechnete Fläche.

Vier Aufträge verbinden Vermutung, Tabellenvergleich, Flächensatz und das dritte Gesetz. Das dritte Gesetz wird über dieselbe Zentralmasse und die große Halbachse erklärt. Ein Vergleichspaar mit vierfacher Halbachse und achtfacher Umlaufzeit unterstützt die Anwendung ohne Formelumbau. Die Papieralternative enthält eine beschriftete Ellipse und dieselben neun Datenzeilen.

Orbit: normiertes Zweikörpermodell mit Startabstand 1, Körperradius 0,5 und Gravitationsparameter 1. Der Start erfolgt tangential; danach kein Antrieb. Sechs Anfangstempi relativ zum Kreisbahntempo: 0,5; 0,9; 1; 1,2; √2; 1,6. Die Bahn folgt aus r = p / (1 + k cos θ), p = v² und k = v² − 1. Gezeichnet wird bis zum Aufprall, bis zum vollständigen Umlauf oder bei Flucht bis zum Abstand 4. Bei Flucht ist dies ausdrücklich eine Zeichnungsgrenze. Beide Koordinatenachsen nutzen denselben Maßstab; die Ansicht passt sich dem Fall an, was im Lerntext erklärt wird.

Das Modell unterscheidet Aufprall, zwei Ellipsen, Kreis, parabolische Fluchtgrenze und hyperbolische Flucht. Vier Aufträge behandeln Startlage, gebundene Bewegung, Flucht, freien Fall und Grenzen der Übertragung auf reale Satelliten. Die Papierfassung enthält sechs berechnete Beobachtungen und separate Zuordnungsfelder. Lösungen sind unabhängig zuschaltbar. Kein automatischer Zeitablauf und keine Speicherung oder Punktevergabe durch die Modelle.

## Fragen und Lernstand

Acht vorhandene Fragen wurden überarbeitet, darunter zwei zuvor getrennte Abschlussfragen, die nun bei ihren fachlichen Abschnitten stehen. Eine Transferfrage wurde ergänzt. Alle neun besitzen drei plausible Antwortmöglichkeiten mit eigenen Begründungen. Vier frühere reine Übungsfragen gehören nun zum Kapitelcheck. Bestehende IDs bleiben erhalten; Kapitelrevision 2 behandelt ältere Ergebnisse als überholt. Der aktuelle Kapitelcheck hat 39 Fragen. Das Kapitel enthält einschließlich weiterer Übungsfragen 85 Frageninstanzen; davon sind nicht alle in diesem Schritt fachlich geprüft oder verbessert worden.

## Nachweise

- `test_astronomy_orbit_workshops.js`: neun Zeitpunkte, Ellipsenbrennpunkte, gleiche überstrichene Flächen, alle sechs Flugbahnen mit geometrischen und Energieprüfungen, Startabstand, Aufprallgrenze, Kreisradius, Reset/Fokus, unveränderte Speicherung, 27 Antwortwege der neun Fragen und exakte Wiederholungsabschnitte. Zwei Papieralternativen und zwei getrennte Lösungen geprüft.
- Zusätzlich bestanden: alle 20 Physik-Arbeitsblätter, Lernziele und Zusammenfassungen, Kapitelnavigation, vollständiger Quizpool und übersetzter Titelindex. JavaScript-Syntax und Diff-Prüfung bestanden. Jetzt 180 Funktionstestsuiten; kein neuer Gesamtlauf.
- Tatsächlicher Chromium-Lauf: 2026-09-14T00:53:15.744Z, Version 151.0.7922.34. Alle Auswahlwerte per Tastatur, Zurücksetzen mit Fokus, Tabellenrolle und horizontales Verschieben per Pfeiltaste, keine Speicheränderung durch Modelle. Kompletter Kapitelcheck mit einer absichtlich falschen Antwort: 97 %, Revision 2, gezielter Rücksprung zu Abschnitt 4. Kein erfasster JavaScript-Seitenfehler. Seitenbreiten 320, 390 und 1280 ohne Seitenüberlauf.
- Die erste ergänzte Tabellenprüfung scheiterte: Der globale automatische Überlauf der gesamten Interaktionszone verhinderte den zugänglichen Tabellencontainer. Eine auf die neuen Astronomie-Werkstätten begrenzte CSS-Korrektur erlaubt jetzt die gemeinsame Tabellenaufbereitung. Der abschließende Browserlauf enthält die tatsächliche Pfeiltastenprüfung. Die lange Flucht-Auswahl wurde nach Sichtprüfung gekürzt.
- Mobile Screenshots tatsächlich gelesen. Gesamtes Arbeitsblatt mit Lösungen als A4-PDF exportiert: 42 Seiten. Zunächst Seiten 3–6 und 41 visuell geprüft; nach Änderung der Papier-Zuordnungsfelder die betroffenen Seiten 5 und 6 erneut gerendert und gelesen. Keine vollständige Sichtprüfung sämtlicher 42 Seiten, kein allgemeiner Screenreader- oder Mehrbrowsernachweis. QA-Dateien bleiben außerhalb des Repositorys.

## Quellen und offene Arbeit

Die Grundlagen wurden am 14.09.2026 anhand der NASA-Seiten [Keplers Gesetze](https://science.nasa.gov/solar-system/orbits-and-keplers-laws/) und [Gravity & Mechanics, Seite 4](https://science.nasa.gov/learn/basics-of-space-flight/chapter3-4/) geprüft. Die Modellparameter, Aufgaben und Berechnungen sind eigens für diese Werkstätten erstellt; sie sind keine Messdaten einer Mission. Der bereits geprüfte Wiener Lehrplanstand bleibt unverändert.

Weitere Astronomie-Fragen enthalten noch schwache oder absurde Distraktoren. Der Sonnensystem-Scanner, andere Darstellungen, aktuelle Forschungsangaben und die Gliederung des großen Kapitels bleiben zu prüfen. Die fünf Prioritätsfächer und die nachrangigen Fächer benötigen weiterhin die dokumentierte fachliche Gesamtprüfung. Keine vollständige Lehrplan- oder Produktabnahme. Änderungen dieses Schritts sind lokal, nach 797dd9d noch nicht gepusht.
