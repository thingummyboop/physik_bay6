# Schriftliche Addition und Subtraktion – 21.09.2026

Der vorherige Zielturn war Fortschritt: Der angeforderte Zwischenstand `a3df4e9` wurde auf GitHub gesichert und mit `origin/main` abgeglichen. Anschließend die dort enthaltenen neuen Werkstätten vollständig im hier beschriebenen Umfang geprüft und die Erklärung zur Ergebnisziffer gegenüber der getauschten Hilfsdarstellung präzisiert. Diese Nacharbeit ist lokal und keine vollständige Fach- oder Produktabnahme.

## Inhalt und Lernweg

`math1_3_add_sub`, Revision 2: drei Abschnitte, fünf Lernziele, sieben Zusammenfassungspunkte, neun bewertete Fragen. Die Erklärungstexte und sämtliche Antwortalternativen wurden gelesen. Vorwissen bleibt das Stellenwertkapitel. Die bisherigen Kopfrechenübungen bleiben erhalten.

Zwei Werkstätten bieten 16 Aufgaben und 66 eigene Rechenschritte: stellenweise Addition einschließlich eingehender Überträge, Entbündeln über Nullstellen, gleiche Zahlen und Null. Bei `1000 − 1` wird jeder Tausch separat dargestellt. Jede Hilfsdarstellung behält den Wert der ursprünglichen oberen Zahl. Das fertige Ergebnis enthält wieder eine Ziffer pro Stelle. Die ursprünglichen Zahlen, getauschte Darstellung bzw. Überträge und Ergebnis sind getrennte Tabellenzeilen.

Falsche Eingaben führen nicht weiter; Rückmeldungen beziehen sich auf den jeweiligen Rechenschritt. Gezeigte Schritte sind im Verlauf gekennzeichnet und werden nicht als selbst gelöst ausgegeben. Zurücksetzen löscht den bisherigen Versuch und setzt den Fokus ins Eingabefeld. Die freie Werkstatt verändert keine gespeicherten Quizleistungen. Gegenprobe und Überschlag ergänzen das genaue Rechnen. Subtraktionen mit negativem Ergebnis werden ausdrücklich vom aktuellen Lernweg abgegrenzt.

Vier Papieralternativen, fünf Lösungsgruppen und drei statische Stellenwerttabellen bleiben beim Arbeitsblattexport erhalten. Zehn mehrstellige Additionen und zehn Subtraktionen werden zusätzlich mit passenden Ergebnissen und Gegenproben erzeugt. Aufgaben und Lösungen lassen sich getrennt verwenden.

## Nachweise

- `scripts/test_column_arithmetic.js`: 94766 Modelle einschließlich unabhängiger Ergebnisprüfung, Bündelungsrechnung und Werterhaltung bei jedem Tausch; 66 eingegebene Schritte; alle 27 Antwortwege mit unabhängig festgelegtem Lösungsschlüssel; Revision, Wiederholungsbedarf, Eingabeprüfung, Fokus, gezeigte Schritte, Zurücksetzen und unveränderter Werkstatt-Speicher; 240 erzeugte Aufgabenlösungen.
- `scripts/browser_column_arithmetic.js`: 618 Layoutzustände bei 320, 390 und 1280 Pixeln, jeweils hell/dunkel. Alle Aufgaben und Schritte sowie offene Verläufe, die bisherigen Kopfrechenfelder und statische Tabellen sind enthalten. Kein festgestellter horizontaler Überlauf; Bedienfelder mindestens 44 Pixel hoch. Tastatur-, Fokus- und Hilfefunktionen sowie alle 27 Kapitelantwortwege im tatsächlichen Browser geprüft; keine erfassten Browserfehler.
- Endgültiger Bericht: `../browser-qa/column-arithmetic/final/report.json`, Chromium 151.0.7922.34. Schmale Werkstätten und statische Tabellen visuell geprüft; Rechenzeilen und Beschriftungen lesbar.
- Interner Drucknachweis: `../browser-qa/column-arithmetic/final/column-solutions.pdf`, 15 Seiten. Zunächst alle Seiten gelesen. Nach der Textpräzisierung änderten sich die Rasterseiten 2, 4–7; diese erneut gelesen, zehn übrige Seiten identisch. Auffällige Bildauslassungen auf den Seiten 9/14 zusätzlich am vollständigen PDF-Text geprüft. Kein dadurch belegter Fehler im Dokument.
- Vorhandene Prüfungen für 3600 Kopfrechenpaare, alle elf Erstklasskapitel und 96 STEM-Arbeitsblattmaterialien bestehen. Inventar: 198 Kapitel; Prioritätsaudit: 1905 Frageninstanzen, davon 678 Mathematik, ohne Strukturfehler. Dies ist kein Nachweis vollständiger Lehrplanabdeckung.

## Nächster Bereich und Grenzen

Im Dezimalkapitel `math1_9_dezimalzahlen` sind alle neun Abschnittstexte und zugehörigen Antworten gelesen. Es enthält Stellenwerte, Vergleichen, Runden, Bruchumwandlung, vier Rechenarten und Einkaufsentscheidungen. Das eigene Lernskript hat nur eine leere Initialisierungsfunktion; schriftliche Verfahren werden als statische Beispiele und Auswahlfragen geübt. Als nächste konkrete Ergänzung fehlen eigene schrittweise Eingaben mit sichtbarer Stellenwertausrichtung, Bündeln/Entbündeln über das Komma, begründeter Kommasetzung beim Produkt und Restumtausch bei Division durch natürliche Zahlen. Bestehende Einkaufsaufgaben sind zu erhalten. Außerdem sind einzelne unplausible Alternativen und pauschale Formulierungen zu präzisieren, etwa die Aussage, Division durch eine Zahl größer als 1 mache das Ergebnis immer kleiner (Sonderfall 0).

Die übrigen Erstklasspräzisierungen und die vollständigen Fachprüfungen aller priorisierten Fächer bleiben offen. Unterrichtserprobung und reale Schülerprodukte sind mit diesen Softwareprüfungen nicht belegt. Übersetzungen bleiben zurückgestellt; kein weiterer Commit oder Push in diesem Arbeitsschritt.
