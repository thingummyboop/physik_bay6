# Statistik und Wahrscheinlichkeit – dritte Klasse

Stand 21.09.2026, Kapitel `math3_11_statistik`, 7. Schulstufe, Revision 3. Lokaler Ausbau nach Zwischenstand `7911f29`, nicht erneut gepusht.

## Befund und Lehrplanbezug

Der gesamte vorhandene Kapiteltext, die bisherige Interaktion und die Tests wurden gelesen. Das Kapitel behandelte Ausleihzahlen, Mittelwert, Minimum/Maximum, Spannweite sowie den Unterschied zwischen Null und fehlender Beobachtung. Der Lehrplanabschnitt Daten und Zufall der dritten Klasse verlangt darüber hinaus die kritische Verwendung statistischer Darstellungen und einfache Wahrscheinlichkeiten. Beide Lerngelegenheiten fehlten im Kapitel; bei der Suche in den bisherigen Mathematik-Lernzielen wurde auch kein anderes Kapitel mit entsprechendem Wahrscheinlichkeitsziel gefunden.

Die Kompetenzbeschreibungen und Präzisierungen wurden aus der gespeicherten RIS-Fassung vom 16.09.2026 erneut gelesen. Es wurde kein neuer Abruf der rechtlichen Fassung durchgeführt. [Quellenstand](LEHRPLAN_QUELLENSTAND.md).

| Lehrplananforderung im untersuchten Bereich | Konkrete Lerngelegenheit |
| --- | --- |
| Einfache Kennzahlen wiederholen und interpretieren | Bestehende Abschnitte 1–3; unterschiedliche Reihen mit Mittelwert 4 und verschiedenen Spannweiten; sechs zusätzliche Mittelwertaufgaben mit Einheiten und Lösungen |
| Häufigkeitsverteilungen darstellen und unterschiedliche Darstellungen interpretieren | Abschnitt 4: Säulen/Balken, Zeitverlauf, Kreis/Prozentstreifen nach ihrer Aussage unterscheiden; selbst Diagramme und Prozentstreifen zeichnen |
| Darstellungen passend auswählen und Manipulationsmöglichkeiten erkennen | Zwei eigene Diagramme derselben Werte mit Achsenbeginn 0 bzw. 30; veränderbare Skala, absolute/relative Änderung, verschiedene Gruppengrößen, Bildflächen und fehlende Zeiträume |
| Intuitiven Wahrscheinlichkeitsbegriff verwenden | Abschnitt 5: Ergebnis und Ereignis, unmöglich/möglich/sicher, Bruch- und Prozentangaben, Grenzen der Gleichwahrscheinlichkeit |
| Einstufige Laplace-Wahrscheinlichkeiten berechnen und als Vorhersagewert deuten | Würfel, Münze und Kugeln mit benannten Modellannahmen; günstige Einzelergebnisse aufzählen, Gegenereignis und nicht gleich wahrscheinliche Farben unterscheiden |
| Aus empirischen relativen Häufigkeiten schätzen | Abschnitt 6: vorgegebene Versuchsreihe, drei selbst ausgeführte Reihen, unsichere Schätzung und Erwartungswert von einer Garantie unterscheiden |
| Mit Simulationen experimentieren | Vier Modelle mit Wiederholungen, laufendem Anteil, Vergleichslinie, Zwischenstandstabelle und freiem Neustart; Alternative mit realen Würfen und Protokoll |

Die Tabelle belegt Aufgabenangebote im untersuchten Bereich. Sie ist keine vollständige Fach- oder Lehrplanabnahme und kein Nachweis, dass Schüler:innen die Kompetenzen tatsächlich erworben haben. Zweistufige Versuche und Kreuztabellen gehören zur noch zu bearbeitenden vierten Klasse; sie werden hier nicht als erledigt dargestellt.

## Umsetzung

Drei neue Abschnitte ergänzen neun direkte Aufgaben, neun bewertete Fragen, zwei Papieralternativen und drei Vergleichslösungen. Insgesamt besitzt das Kapitel sechs Abschnitte und 16 bewertete Fragen mit 43 Antwortmöglichkeiten. Die bestehenden sieben Frage-IDs bleiben erhalten. Der Katalog und die Kapitelüberschrift nennen nun Statistik und Wahrscheinlichkeit; Lernziele, Zusammenfassung, Vorwissen und Revisionskennung sind angepasst. Übersetzungen wurden nicht bearbeitet.

Der Skalenvergleich hält die Daten 40/50 unverändert. Die sichtbaren Säulenlängen haben bei Nullbasis das Verhältnis 1,25 und bei Achsenbeginn 30 das Verhältnis 2; die tatsächliche Zunahme bleibt 25 %. Eine andere Skala wird als mögliche Verzerrung beschrieben, ohne allein daraus Täuschungsabsicht abzuleiten. In der Druckfassung stehen die Vergleichsdiagramme nebeneinander.

Die Zufallswerkstatt modelliert eine 6, eine gerade Augenzahl, Kopf und eine rote Kugel. Beim Kugelmodell werden die vier Kugeln gleich wahrscheinlich gezogen; drei rote Kugeln ergeben P(Rot) = 3/4. Zurücklegen und erneutes Mischen sind ausdrücklich genannt. Das Modell verwendet Pseudozufallszahlen; es ist keine Messung an realen Würfeln oder Münzen. Nach 1, 10 oder 100 neuen Versuchen zeigt die Werkstatt Treffer, relative Häufigkeit, letztes Ergebnis, Verlauf und bis zu zehn Gruppen-Zwischenstände. Eine Reihe ist auf 1.000 Versuche begrenzt; Neustart ist jederzeit ohne Kosten oder Wartezeit möglich. Modellwechsel setzt die Reihe zurück. Es werden keine Lernpunkte oder gespeicherten Quizresultate verändert.

Die beobachtete Häufigkeit wird nicht künstlich zum Modellwert gezogen. Alle Trefferfolgen bleiben möglich, auch Reihen ohne Treffer oder nur mit Treffern. Der Text erklärt ausdrücklich, dass weder ein genauer Trefferbestand noch ein Ausgleich beim nächsten Versuch garantiert ist. Die sechs erzeugten Mittelwertaufgaben haben zu ihrer jeweiligen Ziehung passende, getrennt druckbare Lösungen. Auch die bestehende Vergleichsauswertung zu gleichen Mittelwerten ist nun optional druckbar.

## Nachweise

- `test_statistics_year3.js`: zwei Achsenabbildungen, 48 kontrollierte Einzelergebnisse, vier Gruppenmodelle, Extremfolgen, Trefferzählung und Verlauf, Begrenzung auf 1.000, Zurücksetzen/Fokus, unveränderter Speicher, alle 43 Antwortwege mit 100/94-Prozent-Ergebnis und passenden Wiederholungs-IDs. Papieralternativen, statische Diagramme, neun Aufgaben, vier Vergleichslösungen und sechs erzeugte Rechenlösungen geprüft. Die mobile Legende liegt außerhalb des verschiebbaren Diagramms.
- `test_mean_interpretation.js`: bestehende Eingaben, individuelle Rückmeldungen, Tabelle gleicher Mittelwerte und zugehörige sechs Antwortwege weiterhin korrekt. `test_math_feedback_reasoning.js`: 40 Antwortwege über sieben Mathematikkapitel bestanden.
- `browser_statistics_year3.js`, Bericht vom 21.09.2026, 12:36:01 UTC, Chromium 151.0.7922.34: zwölf kontrollierte native Versuchsgruppen; 24 Modellansichten und zwölf Skalenansichten bei 320/390/1280 Pixel Breite in beiden Farbschemata; Tastatur, unveränderter Speicher, 43 native Quizantworten und optionale Drucklösungen. Keine Browserfehler.
- Die mobile Sichtprüfung zeigte, dass sich die Legende mit dem Diagramm seitlich verschob. Sie steht jetzt außerhalb des Scrollbereichs; sichtbare Hinweise erklären das Verschieben mit Finger oder Tastatur. Modellwechsel setzt die Diagrammansicht zurück. Abschließender Bericht 12:38:49 UTC mit 24 Layoutfällen bestanden. Zwölf ursprüngliche mobile Ansichten und acht ergänzende Detailbilder tatsächlich gelesen; die finalen Legenden sind in beiden Farbschemata vollständig sichtbar.
- Endgültige Druckfassung vom 12:38:49 UTC: alle 21 A4-Seiten gelesen. Vergleichsdiagramme stehen auf Seite 4 nebeneinander; Tabellen, Aufgaben, 16 Verständnisfragen, sechs erzeugte Rechenlösungen und vier Vergleichslösungen lesbar. Keine abgeschnittenen Inhalte oder überlagerten Diagramme festgestellt. Die lokale Vorschauadresse im internen Prüfdokument ist kein veröffentlichtes Unterrichtsmaterial.
- Gemeinsame Arbeitsblattprüfung für 95 Mathematik-/Chemie-/Biologiekapitel, Revisionsprüfung, Mathematik-Zugänglichkeitsindikatoren und Syntax aller 106 Themenskripte bestanden. Inventar: 197 Kapitel; Prioritätsaudit: 1.734 Frageninstanzen ohne Strukturfehler. Kein vollständiger neuer Suitenlauf, keine Prüfung mit echten Screenreadern oder Lernenden.

Die konkreten Lücken bei Diagrammkritik und einfachen Wahrscheinlichkeiten sind ergänzt. Die übrige Facharbeit, vollständige Kompetenzzuordnung aller Klassen und Fächer sowie die Gesamtproduktprüfung bleiben offen.
