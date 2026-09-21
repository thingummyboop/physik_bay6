# Schriftliche Multiplikation und Division – erste Klasse

Stand 21.09.2026. `math1_4_mult_div` ist auf Revision 3 erweitert: drei Abschnitte, 20 bewertete Fragen, sechs Lernziele und sechs Zusammenfassungspunkte. Voraussetzung ist nun das vorhergehende Additions-/Subtraktionskapitel. Die Navigationsprüfung bestätigt die Reihenfolge. Alte Ergebnisse belegen den erweiterten Stoff nicht.

## Ausgangsbefund und Umfang

Die vollständigen Kapiteltexte, Aufgaben, Antwortalternativen, Rückmeldungen und das Interaktionsskript wurden gelesen. Schriftliche Multiplikation und Division waren durch Beispiele und Papieraufträge erklärt; das zugehörige Skript führte jedoch keine Recheninteraktion aus. Der Arbeitsblattgenerator enthielt 20 Rechnungen ohne erzeugte Vergleichslösungen. Zwei einfache Abbildungen und die statische Distributivformel wurden wegen ihrer Einstufung als interaktive Zonen im Druck ersetzt bzw. ausgelassen. Die Vergleichslösungen zu Restaufgaben fehlten ebenfalls im optionalen Lösungsteil.

Die gespeicherte RIS-Fassung vom 16.09.2026 wurde für das schriftliche Durchführen und Beschreiben der Grundrechenalgorithmen der ersten Klasse erneut gelesen. [Quellenstand](LEHRPLAN_QUELLENSTAND.md). Diese Umsetzung behandelt natürliche Zahlen bei Multiplikation und Division. Sie ist kein Nachweis für sämtliche vier Rechenarten, nichtnegative Dezimalzahlen oder die vollständige Erstklassabdeckung.

## Lernangebote

- **Multiplikation:** acht Aufgaben, darunter 286 · 34, 108 · 205, 240 · 30 und 0 · 17. Eigene Zwischensummen aus Ziffernprodukt und Übertrag; die Darstellung zeigt anschließend geschriebene Stellen, Überträge und Teilprodukte. Bei Zehnern/Hundertern wird die anschließende Multiplikation mit 10/100 ausdrücklich benannt. Abschließend Teilprodukte addieren und durch Division kontrollieren.
- **Division:** acht Aufgaben mit ein- und zweistelligem Divisor, etwa 816 : 4, 7344 : 24, 1005 : 8, 5 : 8 und 0 : 6. Jeweils die nächste Quotientenziffer eingeben, passendes Vielfaches abziehen, Rest umtauschen und nächste Ziffer herunterholen. Nullstellen und Endrest bleiben getrennt. Die Gegenprobe enthält Ergebnis · Divisor + Rest und die Restbedingung.
- **Rückmeldung:** zu große/zu kleine Quotientenziffern anhand des Vielfachen bzw. verbleibender Gruppen erklären; bei Multiplikation Ziffernprodukt und eingehenden Übertrag benennen. Ungültige Eingaben erhalten Fokus und Kennzeichnung. Keine Versuchssperre, automatische Aufgabenwechsel oder Lernstandspunkte für bloß eingeblendete Schritte.
- **Hilfen:** jeder Schritt kann ausdrücklich gezeigt werden. Der Verlauf unterscheidet „gezeigt“ von „geprüft“; beim Abschluss werden gezeigte Schritte gezählt und eine eigenständige Papierbearbeitung angeregt. Zurücksetzen löscht nur die aktuelle Bearbeitung.
- **Papier:** zwei eigenständige Alternativen mit sechs neuen Aufträgen; fünf optionale Lösungsgruppen einschließlich der bisherigen Restaufgaben. Beide statischen Mengenbilder und die Rechenregel erscheinen nun im Druck. Die 20 erzeugten Aufgaben enthalten Teilprodukte, Ergebnisse und Gegenproben; Divisionen umfassen auch Reste und Quotient null.
- **Darstellung:** Stellenwerttabellen der Werkstätten wachsen mit der Bearbeitung. Lange ältere Tabellen werden auf kleinen Bildschirmen als beschriftete Zeilenblöcke dargestellt. Die Multiplikationstabelle nutzt erläuterte Stellenwertkürzel. Vertauschen und Zusammenfassen sind zusätzlich an Zahlenbeispielen erklärt; die Grenze bei Division wird gezeigt.

Vier neue Verständnisfragen prüfen Übertrag, Hunderter-Teilprodukt, Restumtausch und Dividend/Divisor null. Zwei vorhandene falsche Optionen wurden durch konkretere Fehlvorstellungen ersetzt. Die bestehenden Rechenregeln und fünf Abschlussfragen bleiben enthalten.

## Nachweise

| Prüfung | Tatsächlicher Umfang |
| --- | --- |
| `scripts/test_written_arithmetic.js` | 10042 Multiplikationen und 25050 Divisionen, unabhängig anhand Produkt/Quotient/Rest kontrolliert; Nullstellen, Überträge, Reste und ungültige Modellparameter. Alle 72 eingegebenen Schritte der 16 angebotenen Aufgaben, zu große/kleine Eingaben, Tabellenwerte, Fokus, Enter, Zurücksetzen, gezeigte Schritte und unveränderter gespeicherter Lernstand. Alle 58 Quizantwortwege gegen einen eigenen Antwortschlüssel, Revision 3 und Wiederholungsbedarf. 240 erzeugte Arbeitsblattlösungen unabhängig geprüft. |
| `scripts/browser_written_arithmetic.js` | 654 Zustände bei 320, 390 und 1280 Pixeln, hell/dunkel: Rechenschritte, Anfang/Ende, geöffnete Verläufe und fünf bestehende Tabellen/Abbildungen. Kein festgestellter Seiten-/Werkstattüberlauf; Bedienelemente mindestens 44 Pixel hoch. Native Tastaturbedienung, Abschlussfokus, Zurücksetzen, Kennzeichnung gezeigter Schritte und unveränderter Lernstand. Alle 58 Kapitelantwortwege mit erneuten Versuchen geprüft; keine erfassten Browserfehler. |
| Druck und Sichtkontrolle | Reproduzierbarer Export mit 20 unabhängig geprüften Antworten, stabilen Aufgaben beim Umschalten der Lösungen, zwei Papieralternativen, fünf Lösungsgruppen und zwei statischen Zeichnungen. Alle 22 Druckseiten gelesen. Papieranweisungen präzisiert und die fehlende Rechenregel wiederhergestellt; fünf veränderte Seiten (3, 5–8) erneut gelesen, 17 Rasterseiten unverändert. Mobile Werkstätten und alle drei älteren Tabellen zusätzlich visuell gelesen. |
| Bestehende Prüfungen | Alle elf math1-Kapitel, Material für 96 STEM-Arbeitsblätter und Katalognavigation einschließlich Voraussetzungen bestanden. Inventar 198 Kapitel; Prioritätsaudit 1899 Frageninstanzen, davon 672 Mathematik, ohne Strukturfehler. |

Lokale Belege außerhalb des Repositorys: `../browser-qa/written-arithmetic/report.json`, `final/report.json`, `final/written-solutions.pdf` sowie Bildschirm- und Seitenbilder. Die PDFs sind interne Prüfarbeitsblätter. Änderungen bleiben lokal nach dem angeforderten GitHub-Zwischenstand `fe188ee`.

## Verbleibende Arbeit

Das Additions-/Subtraktionskapitel wurde ebenfalls vollständig gelesen: Es erklärt Bündeln und Entbündeln einschließlich 302 − 178; die derzeitigen Eingaben prüfen jedoch nur Endergebnisse zweistelliger Aufgaben. Mehrstellige Schrittübungen und deren mobile/druckbare Darstellung sind der nächste konkrete Rechenbereich. Nichtnegative Dezimalzahlen und die übrigen Erstklasspräzisierungen bleiben gesondert zu prüfen. Die praktische Ausführung individueller Handrechnungen wird durch diese Softwareprüfungen nicht beurteilt; die Gesamtaufgabe über alle Fächer bleibt offen.
