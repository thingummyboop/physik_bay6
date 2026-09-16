# Lineare Gleichungen und Formeln – 3. Klasse

Stand 16.09.2026, Kapitel `math3_3_gleichungen`, 7. Schulstufe, Revision 2. Die inhaltliche Erweiterung wurde als Zwischenstand bed9a78 gesichert; die hier dokumentierte abschließende Teilprüfung und Papierkorrektur folgen lokal darauf.

## Lernweg und fachlicher Umfang

Das bisherige Kapitel wiederholte überwiegend einfache Gleichungen aus der 2. Klasse. Drei Abschnitte und fünf bewertete Fragen boten noch keinen ausreichenden Lernweg für Äquivalenzumformungen mit beidseitigen Variablen, Brüchen und Anwendungen. Jetzt sechs aufeinander aufbauende Abschnitte:

1. Gleichung und Lösungsmenge, Äquivalenzumformung und erlaubte Umwege; Multiplikation mit null von der nicht definierten Division durch null unterscheiden.
2. Klammern ausmultiplizieren, Vorzeichen und negative Lösungen, fehlerhafte Umformungen durch Einsetzen widerlegen.
3. Variable auf beiden Seiten, zwei gültige Lösungswege und Probe in der ursprünglichen Gleichung. Ein eigenes Plättchenbild zeigt das Abziehen von 2x auf beiden Seiten; seine Modellgrenzen sind ausdrücklich erklärt.
4. Gleichungen mit festen Nennern, Verteilung auf sämtliche Summanden und Kehrwert als Umkehroperation. Variable Nenner sind ausdrücklich ein anderer Aufgabentyp.
5. Ausdrücklich erfundener Angebotsvergleich für ein Wiener Schulprojekt, Interpretation ganzer Stückzahlen, Dreiecks- und Rechteckformeln einschließlich Einheiten und Bedingungen.
6. Eine, keine oder alle rationalen Zahlen als Lösung; eigene Rechenwege in einer freien Werkstatt. Einzelne Proben illustrieren, ersetzen aber nicht die allgemeine Begründung für Identität oder Widerspruch.

Jeder Abschnitt enthält drei konkrete Arbeitsaufträge samt Vergleichslösungen: insgesamt 18. Die fünf bisherigen Frage-IDs bleiben erhalten, die Fragen wurden überarbeitet und zehn ergänzt. Insgesamt 15 bewertete Fragen mit je drei begründeten Antworten. Frühere Ergebnisse aus Revision 1 gelten nicht als aktueller Nachweis.

Die am 16.09.2026 gelesenen Präzisierungen des [RIS-Mittelschullehrplans](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html) zu „Variablen und Funktionen“, 3. Klasse, verlangen unter anderem das Lösen linearer und darauf zurückführbarer Gleichungen durch Äquivalenzumformungen, Anwendungen und einfache Formelumstellungen. Diese Lerngelegenheiten sind im Kapitel konkret ausgearbeitet. Der ebenfalls verlangte Umgang mit Potenzen, Termen, Proportionalität und Wachstum gehört auch zu anderen Kapiteln; dieses Kapitel ist kein Nachweis der vollständigen Jahresabdeckung. Quellenvergleich und Grenzen: [LEHRPLAN_QUELLENSTAND.md](LEHRPLAN_QUELLENSTAND.md).

## Freie Werkstatt und Papierfassung

Sechs Ausgangsgleichungen decken Variablen auf beiden Seiten, Klammern, negative Lösungen, einen festen Nenner, Identität und Widerspruch ab. Die vorbereitete Form bei Klammern und Bruchtermen wird erklärt. Lernende wählen selbst, welche Zahl beziehungsweise welchen linearen Term sie auf beiden Seiten addieren oder subtrahieren und mit welcher festen Zahl sie multiplizieren oder dividieren. Jeder übernommene Schritt wird protokolliert und kann zurückgenommen werden. Auch ein Lösungsweg mit x auf der rechten Seite wird anerkannt.

Brüche werden mit ganzzahligen Zählern und Nennern exakt gerechnet. Dokumentierte Zahl- und Bruchschreibweisen einschließlich Dezimalkomma, negativer Nenner und Unicode-Minus werden verarbeitet. Leere, ungültige oder zu große Eingaben verändern den Rechenweg nicht. Multiplikation mit null wird wegen des möglichen Verlusts der ursprünglichen Lösungsmenge abgelehnt; Division durch null erhält eine eigene Erklärung. Die Werkstatt speichert nichts und vergibt keine Punkte. Der gemeinsame Kapitelcheck speichert dagegen den bewerteten Lernstand und bietet gezielte Wiederholung.

Die Papierfassung enthält alle sechs Ausgangsgleichungen, ein fünfzeiliges Rechenprotokoll, das Plättchenbild, 18 Arbeitsaufträge und sechs getrennte Vergleichslösungen. Die Aufgabe zum erlaubten Umweg wurde nach der Drucksichtprüfung so formuliert, dass sie vollständig auf Papier funktioniert: +2 ausführen und mit −2 rückgängig machen. Die Bildschirmfunktion „Schritt zurück“ ist eine zusätzliche Möglichkeit.

Acht erzeugte Zusatzgleichungen enthalten auf beiden Seiten x und haben negative, positive oder die Lösung null. Ihre Lösungen werden aus derselben Ziehung mit Rechenschritten und Einsetzprobe erzeugt. Ein- und Ausblenden der Lösungen verändert die Aufgaben nicht.

## Nachweise und Grenzen

- `test_equations_year3.js`: 45 Antwortwege anhand eines unabhängig vorgegebenen Schlüssels, sechs Abschnittszuordnungen, Revision und Wiederholungsbedarf bestanden. 288 Kombinationen aus Ausgangsgleichung, Operation und Wert gegen unabhängig berechnete Koeffizienten und Erhaltung der Lösungsmenge geprüft. Zwei Wege für A, Lösungen aller Fälle, exakte Bruchrechnung, ungültige Eingaben, Anzeigegrenze, Rücknahme, Neustart/Fokus, wiederholte Initialisierung und unveränderter Speicher geprüft. Papierstruktur und 32 erzeugte Aufgaben-/Lösungspaare aus einer aktuellen sowie drei vorgegebenen Zufallsziehungen bestanden; letztere schließen negative, null und positive Lösungen ein. Der bisherige Eingabeaufruf für noch nicht überarbeitete Sprachfassungen bleibt funktionsfähig.
- `test_equations_year2.js`, `test_math2_guides.js`, `test_stem_worksheet_material.js` mit 95 Arbeitsblättern, `test_worksheets.js` und `test_learning_flows.js` bestanden. Diese Regressionen wurden vor der abschließenden reinen Textkorrektur ausgeführt; Kapiteltest und Browserprüfung danach erneut bestanden.
- Native Prüfung `browser_equations_year3.js`, abschließend 2026-09-16T11:20:49.479Z, Chromium 151.0.7922.34: 45 Antwortentscheidungen, sieben Lösungswege über Tastatur, Bruch-/Dezimal-/Fehleingaben, Rücknahme und Neustart/Fokus, unveränderter Quizspeicher durch die Werkstatt, 36 Zustände bei 320/390/1280 Pixel in zwei Designs, Grenzen sämtlicher SVG-Beschriftungen, zwei 93-Prozent-Kapitelchecks mit korrekter gezielter Wiederholung sowie passende Papierlösungen und Lösungsschalter bestanden. Keine Seitenfehler.
- Helle und dunkle Mobilansicht der negativen Lösung sowie Plättchenbild tatsächlich gelesen. Finale A4-Ausgabe mit Lösungen: 20 Seiten. Seiten 3, 6, 7, 8, 17, 18, 19 und 20 gerendert und tatsächlich gelesen: Diagramm, Ausgangsgleichungen, Protokoll, korrigierter Papierauftrag, Zusatzaufgaben und Vergleichslösungen lesbar. Nicht sämtliche Seiten visuell geprüft. Prüfartefakte und Bericht liegen außerhalb des Repositorys unter `../browser-qa/equations-year3/`.

Inventar weiterhin 197 Kapitel; Prioritätsaudit 1573 Frageninstanzen ohne strukturellen Befund. Kein neuer vollständiger Suitenlauf: der letzte 191/191-Nachweis liegt vor den Änderungen an beiden Gleichungskapiteln. Die Quellenzählungen, Tests und ausgewählten Sichtprüfungen ersetzen keine vollständige fachliche, praktische und visuelle Abnahme aller Fächer. Übersetzungen bleiben zurückgestellt; diese abschließenden Änderungen sind noch nicht erneut gepusht.
