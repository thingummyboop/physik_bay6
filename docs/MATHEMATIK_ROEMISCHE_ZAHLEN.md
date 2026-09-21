# Natürliche Zahlen und römische Zahlschrift – 1. Klasse

Stand 21.09.2026. Kapitel `math1_2_nat_zahlen`, Titel „Natürliche und römische Zahlen“, Revision 3. Lokale Ergänzung nach dem auf Nutzerwunsch gepushten Zwischenstand `e962a5c`. Keine vollständige Fach- oder Produktabnahme.

## Grundlage und Umfang

Die drei bisherigen Abschnitte und alle sechs vorhandenen Fragen des Zahlenkapitels wurden vollständig gelesen. Die beiden Abschnitte des vorgeschalteten Volksschulkapitels enthielten ebenfalls keine römischen Zahlen. Der gezielt erneut gelesene Mathematikabschnitt der gespeicherten RIS-Fassung vom 16.09.2026 nennt das Lesen und allenfalls Schreiben römischer Zahldarstellungen sowie die Vorteile des dezimalen Stellenwertsystems. Lesen und Vergleichen sind deshalb Grundstoff; eigenes Schreiben steht ausdrücklich als freiwillige Vertiefung außerhalb des Kapitelchecks. Kein erneuter Rechtsquellenabruf.

Die Aussage über IIII auf Zifferblättern wurde direkt beim [SEIKO Museum Ginza](https://museum.seiko.co.jp/en/knowledge/trivia02/) nachgelesen und als Kapitelquelle verlinkt. Verwendet wird nur der belegte Gebrauch dieser Schreibweise, keine der dort diskutierten Ursprungstheorien. Beispieltafeln und Jahreszahlen werden keinem realen Wiener Gebäude zugeschrieben.

## Umgesetzter Lernweg

- Bestehende Einführung in Ziffern und Stellenwerte sprachlich überarbeitet; feste helle Hintergründe und reine Farbcodierung entfernt. Zehnerübung mit bisheriger Eingabeprüfung und Tastaturbedienung erhalten, um Papierauftrag und Lösung ergänzt.
- Bestehende große Stellenwerttafel mit kurzen Spaltenköpfen und ausgeschriebener Legende. Sieben direkte Aufgaben zu Stellenwerten, Zahlenstrahl und Überschlag erhalten; Lösung um die fehlenden Stellenwertzerlegungen ergänzt und für den optionalen Lösungsdruck freigegeben.
- Neuer Leseabschnitt: sieben Zeichenwerte, Addition absteigender Werte, sechs Subtraktionspaare, Zerlegungen von XLIX und MMXXVI. Die verwendete Kurzschreibkonvention und ihr Übungsbereich 1–3999 sind ausdrücklich eingegrenzt. Historische Varianten werden nicht pauschal als Fehler bezeichnet.
- Lesewerkstatt mit 27 Beispielen einschließlich aller sechs Subtraktionspaare, größeren Jahreszahlen, 3999 und der Zifferblattvariante IIII. Auswahl, eigene Dezimaleingabe, Prüfung, erklärende Gruppentabelle und Zurücksetzen; keine Lernstandsspeicherung durch bloßes Üben.
- Eigenes skalierbares Zifferblatt ohne Zeiger, beschriftet und auf Papier erhalten. Drei direkte Leseaufträge mit Lösungen. Freiwillige Schreibvertiefung anhand von 944, 28 und 94.
- Neuer Vergleichsabschnitt: konstante römische Zeichenwerte gegenüber Stellenwerten, Platzhalterfunktion der 0, Bündeln bei 27 + 15, Gegenbeispiele zu falschen Regeln über Zeichenanzahlen. Drei weitere direkte Aufgaben samt begründeten Lösungen.
- Insgesamt fünf Abschnitte, sieben Lernziele, sieben Zusammenfassungspunkte, zwölf benotete Fragen mit 36 Antwortwegen. Die sechs alten Fragen bleiben erhalten; falsche Antworten auf die Ziffer/Zahl-Frage vergeben keine Teilpunkte mehr. Sechs neue Fragen prüfen Lesen und Begründen, keine verpflichtende Schreibproduktion. Veraltete Kapitelresultate werden durch Revision 3 entwertet.
- Arbeitsblatt: fünf Materialabschnitte, 13 direkte Aufgaben, zwei Papieralternativen, ein statisches Zifferblatt, zwölf Verständnisfragen, vier zuschaltbare Vergleichslösungsblöcke. Der Generator liefert zwölf gemischte Aufgaben mit dazu passenden Lösungen (vier Runden, zwei Vergleichen, zwei Rechnen, vier römisch Lesen). Bei Subtraktionen werden negative Ergebnisse vermieden. Aufgaben bleiben beim Ein-/Ausschalten der Lösungen unverändert.

## Prüfungen

`node scripts/test_roman_numbers.js`: bestanden. 27 unabhängig gegen festgelegte Zahlenwerte geprüfte Lesefälle und Gruppensummen; ungültige Eingaben, Enter, Fokus, Feedbacklöschung, Zurücksetzen, doppelte Initialisierung und unveränderte Speicherung. Alle 36 Antwortwege im tatsächlichen Kapitelrenderer gegen unabhängige Lösungsschlüssel geprüft, einschließlich 100/92 Prozent, gezielter Wiederholungs-IDs und Revision 3. Papieraufbau und Lösungen geprüft; 48 erzeugte Aufgaben/Lösungen in einem normalen und drei gesteuerten Zufallsläufen unabhängig nachgerechnet.

`node scripts/test_math1_guides.js`: elf Erstklasskapitel samt bisherigen Stellenwertprüfungen bestanden. `test_stem_worksheet_material.js`: 96 Mathematik-/Chemie-/Biologie-Arbeitsblätter bestanden. `test_math_feedback_reasoning.js`: 40 bisherige Antwortwege über sieben Kapitel bestanden. `test_translated_title_search.js`: Titelindex stimmt mit der tatsächlichen Sprachauswahl des Renderers überein; keine neuen Übersetzungen erstellt. `audit_math_a11y.js`: 42 Mathematikkapitel in dessen begrenztem Quellprüfumfang ohne Befund. Inventar und priorisierter Quiz-Audit aktualisiert; ein grüner Strukturcheck ersetzt keine Fachprüfung.

`scripts/browser_roman_numbers.js`, Chromium 151.0.7922.34: 27 native Eingabe-/Lesewege, 30 Antwortwege der zehn Abschnittsübungen, Prüfung der zwei älteren Diplomfragen im abschließenden Kapitelcheck, gezielte Wiederholung nach einer falschen Antwort, Tastatur/Reset/Fokus und unveränderte Speicherung vor dem Kapitelcheck. Die vollständigen 36 Kapitelcheck-Antwortwege sind zusätzlich im oben genannten Renderer-Test abgedeckt. 162 Ansichten (27 Beispiele × 320/390/1280 Pixel × hell/dunkel) ohne horizontalen Überlauf oder zu kleine Bedienelemente; keine Browserfehler.

Bei der Sichtprüfung waren anfangs Tabellenüberschriften und Rechnungen bei 320 Pixeln umgebrochen. Spaltenbreiten und Zellgrößen wurden angepasst. Die abschließende Browserprüfung `../browser-qa/roman-numbers/final-layouts.json` bestätigt erneut alle 162 Ansichten sowie vollständig einzeilig passende Tabellenköpfe und Rechenzellen. Finale Screenshots der schmalen Lesewerkstatt in beiden Farbschemata und der Subtraktionstabelle tatsächlich angesehen.

Die finale Druckfassung `../browser-qa/roman-numbers/final-roman-solutions.pdf` umfasst 17 A4-Seiten; sämtliche Seiten als Bilder gelesen. Lerntexte, Zifferblatt, Aufgaben, zwölf Quizfragen, zwölf zugehörige Lösungen, zwölf generierte Ergebnisse und vier Vergleichslösungsblöcke sind lesbar. Die zwölf generierten Aufgaben der finalen Ausgabe wurden nochmals unabhängig nachgerechnet. Der separate native Bericht liegt unter `../browser-qa/roman-numbers/report.json`. Diese Dateien sind interne Prüfbelege, kein veröffentlichter Stand.

## Verbleibend

Diese Ergänzung schließt die konkret festgestellte Lücke zum Lesen römischer Zahlen und zum Vergleich der Zahlensysteme. Sie beweist weder eine vollständige Mathematikabnahme noch die Gesamtfertigstellung. Zahlbereichsvergleiche, geometrische Deutung des Bruchrechnens und weitere im übergreifenden Abgleich genannte Bereiche bleiben zu prüfen. Keine Unterrichtserprobung und keine erneute vollständige Gesamttestsuite in diesem Arbeitsschritt.
