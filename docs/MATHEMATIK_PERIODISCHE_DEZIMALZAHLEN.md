# Dezimalzahlen und Perioden – zweite Klasse

Stand 21.09.2026, Kapitel `math2_3_dezimalzahlen`, sechste Schulstufe, Revision 2. Neue lokale Weiterarbeit nach `a2c72d2`; der vorige Zielturn ergänzte und prüfte Zehnerpotenzen. Übersetzungen bleiben zurückgestellt.

## Befund und Lernweg

Das vorherige Kapitel bestand aus drei Abschnitten zu Addition/Subtraktion, Runden und Zehnerfaktoren, drei kurzen Eingaben und sechs bewerteten Fragen. Ein Lernweg zu periodischen Dezimaldarstellungen fehlte im vollständig gelesenen Kapitel. Auch die fünf aktuellen Abschnitte des vorausgehenden Bruchrechenkapitels wurden auf den Zusammenhang geprüft. Die gespeicherte RIS-Fassung vom 16.09.2026 nennt im Zahlenbereich der zweiten Klasse ausdrücklich den Wechsel zwischen Bruch- und Dezimaldarstellung auch bei einfachen periodischen Darstellungen. Dieser Absatz wurde erneut gelesen. Grundlage ist der dokumentierte [Quellenstand](LEHRPLAN_QUELLENSTAND.md), kein neuer erfolgreicher Rechtsquellenabruf.

Das Kapitel hat jetzt sechs Abschnitte:

1. Stellenrichtige Addition/Subtraktion, Entbündeln und Probe an ausdrücklich erfundenen Preisen.
2. Unmittelbares Runden auf die verlangte Stelle, Übertrag und Näherungszeichen.
3. Multiplikation mit Dezimalzahlen über Brüche begründen; beim Dividieren Dividend und Divisor gemeinsam skalieren; Zehnerfaktoren erhalten.
4. Bruchdivision, Rest 0 und wiederkehrende Reste; rein/gemischt periodisch; Vorperiode und Periode unterscheiden.
5. Rückumwandlung endlicher, rein periodischer und gemischt periodischer Zahlen durch Stellenwerte beziehungsweise passende Zehnervielfache und Subtraktion; vollständig kürzen.
6. Exakte Vergleiche und gerundete Anteile; 0,(9) = 1 als zweite Darstellung desselben Wertes; endliche Darstellung über den vollständig gekürzten Nenner mit Primfaktoren 2/5 erklären.

Für Perioden wird ausdrücklich die Klammernotation erklärt, etwa `0,1(6) = 0,166666…`; sie ersetzt hier den Periodenstrich, ist kein Rechenauftrag. Das Kapitel umfasst fünf Lernziele, 18 bewertete Fragen mit drei begründeten Optionen und 18 direkte Arbeitsaufträge mit sechs getrennten Vergleichslösungen. Die sechs alten Frage-IDs und die drei Eingabefunktionen bleiben erhalten. Vorweggenommene Lösungshinweise wurden aus Antwortoptionen entfernt, weitere plausible Fehlvorstellungen ergänzt und Diplomfragen in die passenden Abschnitte eingeordnet. Kapitelrevision 1 ist kein aktueller Lernstandsnachweis. Der gemeinsame Katalog nennt nun auch Perioden.

## Werkstätten und Papierfassung

Die Divisionswerkstatt kombiniert sechs Zähler (0, 1, 2, 5, 7, 13) mit zehn Nennern (2, 3, 4, 6, 7, 8, 9, 11, 12, 16): 60 Fälle einschließlich Null, ganzen Zahlen, unechten Brüchen, endlichen, rein und gemischt periodischen Ergebnissen. Sie zeigt die Nachkommastellen schrittweise oder vollständig; jede Zeile enthält alten Rest, zehnfachen Rest, Quotientenziffer und neuen Rest. Ein wiederkehrender Rest bestimmt den Anfang der Periode. Die Darstellung verwendet ausschließlich ganze Zahlen und exakte Ziffernfolgen, keine gerundeten Rechnerausgaben als Periodennachweis.

Die Rückwerkstatt enthält zwölf Fälle einschließlich führender Vorperiodennull, unechtem Bruch, 0,(9), Null und ganzen Zahlen. Gleichwertige, noch ungekürzte Antworten erhalten die Rückmeldung „Der Wert stimmt“ und einen Kürzauftrag. Ungültige Eingaben und Nenner 0 werden abgefangen. Der Rechenweg bleibt bis zum Öffnen verborgen. Beide Werkstätten unterstützen Tastatur, Rücksetzen und nachvollziehbaren Fokus; sie speichern nichts und vergeben keine Punkte.

Alle fünf interaktiven Bereiche besitzen Papieralternativen: die drei bestehenden Kurzübungen sowie beide neuen Werkstätten. Die Druckfassung enthält sechs Lernabschnitte, 18 direkte Aufgaben und deren Lösungen. Zwölf erzeugte Zusatzaufgaben verbinden vier Multiplikationen, vier Divisionen und vier Darstellungswechsel; Lösungen entstehen aus derselben Ziehung. Die bisher ausschließlich erzeugten Rechenaufgaben wurden dadurch um die neuen Lernziele ergänzt, beide vorhandenen Rechenarten bleiben vertreten.

## Nachweise

- `test_periodic_decimals.js`: 60 Divisionsfälle durch exakte rationale Rekonstruktion mit Ganzzahlarithmetik geprüft, sämtliche Zeilenschritte und Restübergänge, zwölf unabhängig vorgegebene Rückbrüche, vollständig gekürzte versus nur gleichwertige Antworten, ungültige Eingaben, Enter/Fokus/Neustart/Wiederinitialisierung und unveränderter Speicher.
- Alle 54 Quizantwortwege mit unabhängigem Schlüssel durch den tatsächlichen Renderer und Kapitelcheck: 100 beziehungsweise 94 Prozent, konkrete Wiederholungsfrage und Revision 2. Sechs Abschnittszuordnungen und die tatsächliche Papierstruktur sowie 48 erzeugte Aufgaben-/Lösungspaare bestanden.
- `test_decimal_inputs.js` bestätigt weiterhin Dezimalkomma/-punkt, ungültige Eingaben, Enter, Fokus, Rückmeldungswechsel und einmaliges Binden der drei bestehenden Eingaben.

## Browser und Druck

`browser_periodic_decimals.js`, 21.09.2026 um 15:53:34 UTC, Chromium 151.0.7922.34: 60 Divisionen mit tatsächlich bedienten Einzelschritten, zwölf Rückumwandlungen einschließlich gleichwertiger ungekürzter Antworten, alle 54 Antwortwege, Tastatur/Fokus/Neustart und unveränderter Speicher bestanden. 432 Layoutfälle bei 320/390/1280 Pixel in Hell/Dunkel; Kapitelcheck mit 94 Prozent, Revision 2 und gezielter Wiederholung des Rückumwandlungsabschnitts. Keine Seitenfehler.

Die Sichtprüfung zeigte am schmalen Bildschirm zu lange Tabellenspaltennamen und einen Umbruch innerhalb einer periodischen Zahl. Die Tabelle verwendet nun kurze Zeichen mit sichtbarer Legende; zusammengehörige Zahlenausdrücke bleiben in einer Zeile. Abschließende Prüfung 15:56:32 UTC: alle 432 Zustände auf passende einzeilige Beschriftungen und Zahlenausdrücke geprüft. Die korrigierten mobilen Werkstätten tatsächlich gelesen.

Alle 20 Seiten der endgültigen A4-Fassung mit Lösungen von 16:00:31 UTC sind visuell geprüft. Schriftliches Rechenbeispiel, kurze Papieraufträge und die Divisions-Papieraufgabe werden zusammengehalten; Rechenbegründungen sind zusätzlich gegen Teilung geschützt. Bei erzeugten Multiplikationen bleiben beide Zehntelstellen sichtbar, damit die Erklärung „insgesamt zwei Nachkommastellen“ zur Aufgabenanzeige passt; Resultate werden dort mit zwei Nachkommastellen geschrieben. Der Periodenhinweis der Zusatzaufgaben ist ausdrücklich bedingt, da manche Brüche endlich sind. Alle zwölf gezogenen Aufgaben passen zu ihren Lösungen. Bereits gelesene bytegleiche Rasterseiten wurden wiederverwendet, sämtliche geänderten Seiten erneut gelesen.

Interne Artefakte: `../browser-qa/periodic-decimals/report.json`, `final-layouts.json`, `final-print.json` und `final-periodic-solutions.pdf`. Nach den Papier-/Generatoränderungen bestanden Kapiteltest und gemeinsame Materialprüfung der 96 STEM-Arbeitsblätter erneut. Außerdem bestanden die 40 Mathematik-Rückmeldungswege, Titel-/Sprachauswahlprüfung, begrenzte Mathematik-Quellprüfung für 42 Kapitel und Renderer 198/198. Inventar: 198 Kapitel; Prioritätsaudit: 1.826 Frageninstanzen ohne Strukturfehler. Kein neuer vollständiger Suitenlauf.

Keine vollständige Fach- oder Produktabnahme; weitere Zahlbereichs-/Darstellungsfragen und die übrigen priorisierten Fächer bleiben Bestandteil des Gesamtauftrags. Als Nächstes ist das Lesen römischer Zahlen in den Erstklasskapiteln vollständig am aktuellen Material zu prüfen.
