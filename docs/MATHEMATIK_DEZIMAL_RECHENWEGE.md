# Dezimalzahlen: eigene Rechenwege – 23.09.2026

Der vorherige Zielturn war Fortschritt: Vier Werkstätten und acht zusätzliche Verständnisfragen wurden implementiert. Danach Browser-, Aufgaben- und Druckprüfung abgeschlossen, mobile Tabellen beschriftet sowie Druckabstände und Schriftgrößen korrigiert. Änderungen sind lokal nach `a3df4e9`; keine vollständige Fach- oder Produktabnahme.

## Kapitel und didaktischer Umfang

`math1_9_dezimalzahlen`, Revision 4: neun Abschnitte, sechs Lernziele, sieben Zusammenfassungspunkte, 23 bewertete Fragen und 54 freie Übungsfragen. Alle Abschnittstexte, Quizantworten und Rückmeldungen wurden gelesen. Die bisherigen Stellenwert-, Rundungs-, Bruch- und Einkaufsaufgaben bleiben erhalten. Das zuvor deaktivierte Lernskript wird nun geladen. Addition/Subtraktion und Multiplikation/Division sind als Vorwissen verlinkt.

Vier Werkstätten mit je sechs Aufgaben verbinden Stellenwerte mit eigenen Eingaben:

- Addition: Nachkommastellen ausgleichen, Ziffernsummen mit Übertrag, vollständiges Ergebnis.
- Subtraktion: Entbündeln bis zu Tausendsteln, auch über das Komma und mehrere Nullstellen; die Hilfsdarstellung behält den ursprünglichen Wert.
- Multiplikation: Anzahl der Nachkommastellen durch Skalierung begründen, schriftliche Hilfsrechnung und Teilprodukte, vollständiges Ergebnis mit Komma.
- Division durch natürliche Zahlen: stellenweise Quotientenziffern, Restumtausch und ergänzte Endnullen, etwa `1 : 8 = 0,125` und `10,05 : 5 = 2,01`.

Insgesamt 131 eigene Rechenschritte. Die Aufgaben haben nichtnegative Ergebnisse; die angebotenen Divisionen enden. Eine Verallgemeinerung auf periodische Ergebnisse, negative Zahlen oder beliebige Dezimaldivisoren wird nicht behauptet. Die programmatische Modellfunktion lehnt nicht unterstützte Eingaben ab. Bei 0 ist die pauschale Aussage „Division durch eine Zahl größer als 1 macht kleiner“ ausdrücklich eingeschränkt.

Falsche Eingaben führen nicht weiter. Hilfe wird im Verlauf als gezeigt markiert; Zurücksetzen leert den Versuch und setzt den Fokus ins Eingabefeld. Komma, Dezimalpunkt und wertgleiche Endnullen werden beim vollständigen Ergebnis akzeptiert. Die freie Werkstatt schreibt keine Quizleistung in den Speicher. Der bewertete Kapitelcheck verwendet Revision 4.

## Papiermaterial

Vier neue Papieralternativen mit zwölf Arbeitsaufträgen und Vergleichslösungen. Die vorhandene Einkaufslösung wird jetzt ebenfalls als gesonderte Papierlösung übernommen: insgesamt fünf Lösungsgruppen. Die sieben bestehenden Tabellen haben passende mobile Zeilenbeschriftungen; die Stellenwerttafel bleibt eine kompakte Tafel. Die drei Bruch-/Dezimalpaare und drei Alltagsbeispiele sind im Druck als getrennte Kästen lesbar; schriftliche Beispiele verwenden größere Schrift.

Alle 100 bisherigen Zusatzaufgaben sind erhalten und mit eindeutigen Nummern D1.1 bis D9.8 versehen. Jede hat nun eine zugeordnete Vergleichslösung; die Nummerierung folgt den neun Aufgabenbereichen. Beispielantworten für offene Fragen sind als Beispiele gekennzeichnet. Aufgaben und Lösungen lassen sich unabhängig ein-/ausblenden.

## Prüfbelege

- `scripts/test_decimal_calculation.js`: 10271 Modelle mit unabhängigem exaktem Bruchvergleich; Stellenwerte, Werterhaltung beim Tauschen, Teilprodukte, Quotientenziffern und Reste; 131 eingegebene Schritte, ungültige Eingaben, Komma/Punkt/Endnullen, Fokus, Hilfe, Reset und Speicher; alle 69 bewerteten Antwortwege mit unabhängig festgelegtem Lösungsschlüssel und korrektem Wiederholungsbedarf.
- `scripts/test_decimal_worksheet_answers.js`: eindeutige Zuordnung aller 100 Zusatzaufgaben; unabhängig exakt nachgerechnet: 36 Rechenaufgaben, zwölf Rundungsaufgaben, zehn Vergleiche und zwölf Bruchgleichungsketten. Die weiteren Erklärungen, Einheiten und Sachlösungen wurden beim Lesen des vollständigen Druckmaterials mit den Aufgaben verglichen.
- `scripts/browser_decimal_calculation.js`: 1146 Layoutzustände bei 320, 390 und 1280 Pixeln in hellem/dunklem Design, einschließlich aller 24 Aufgaben und 131 Schritte, geöffneter Verläufe sowie vorhandener Tabellen/Beispielkästen. Kein festgestellter horizontaler Überlauf; Werkstatt-Bedienfelder mindestens 44 Pixel hoch. Tastatur-, Fokus-, Hilfe- und Speicherverhalten geprüft. Alle 69 Kapitelantwortwege und alle 162 freien Übungsantwortwege im tatsächlichen Browser geprüft; keine erfassten Browserfehler.
- Bericht `../browser-qa/decimal-calculation/final/report.json`, Chromium 151.0.7922.34. Werkstätten und ausgewählte bestehende Tabellen bei 320 Pixeln zusätzlich visuell gelesen.
- Interner endgültiger Drucknachweis `../browser-qa/decimal-calculation/checked/decimal-solutions.pdf`: alle 38 Seiten geprüft. Nach einer abschließenden Singular-Korrektur änderte sich nur Seite 17; erneut gelesen, 37 Rasterseiten identisch. Ausgelassene wiederholte Zeichen in der Bildanzeige zusätzlich am PDF-Text geprüft. Kein solcher Fehler im PDF belegt.
- Bestehende Erstklassprüfung, Bruch-/Dezimalprüfung (jetzt 114 Antwortwege über 15 bzw. 23 Fragen) und Materialprüfung aller 96 STEM-Arbeitsblätter bestehen. Inventar: 198 Kapitel; Prioritätsaudit: 1913 Frageninstanzen, davon 686 Mathematik, ohne Strukturfehler. Diese Zahlen belegen Struktur, keine vollständige Lehrplanabdeckung.

## Verbleibende Arbeit

Die konkret festgestellte Lücke zu eigenen schriftlichen Rechenschritten mit nichtnegativen Dezimalzahlen ist bearbeitet. Der vollständige Erstklassabgleich bleibt offen, besonders die Gesamtfolge und Transferbreite von Termen/Gleichungen, Größen, Geometrie und Datenerhebung. Die weiteren Fachabgleiche für Physik, Chemie, Biologie und DGB sowie die Gesamtprüfung des Produkts bleiben Bestandteil des Auftrags. Unterrichtserprobung und die Qualität realer Schülerprodukte sind mit diesen Softwareprüfungen nicht belegt. Übersetzungen bleiben zurückgestellt; kein neuer Commit oder Push.
