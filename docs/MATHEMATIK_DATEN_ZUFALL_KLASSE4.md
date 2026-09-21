# Mathematik, 4. Klasse: Kreuztabellen und zweistufige Versuche

Stand: 21.09.2026. Kapitel `math4_7_statistik`, Revision 2. Die bestehenden Kennzahlenabschnitte wurden um Kreuztabellen und zwei Ziehungen ergänzt. Dieser Nachweis betrifft den untersuchten Inhaltsbereich, nicht die vollständige Fach- oder Produktabnahme. Änderungen seit dem angeforderten Zwischenstand `1367d26` sind lokal und nicht veröffentlicht.

## Lehrplanbezug und Lerngelegenheiten

Die einschlägigen Kompetenzbeschreibungen und Präzisierungen der vierten Klasse wurden aus der gespeicherten RIS-Fassung vom 16.09.2026 erneut gelesen. Es erfolgte kein neuer Abruf der rechtlichen Fassung. [Quellenstand](LEHRPLAN_QUELLENSTAND.md).

| Anforderung im Bereich Daten und Zufall | Konkrete Lerngelegenheit |
| --- | --- |
| Häufigkeiten, Diagramme, arithmetisches Mittel und Median wiederholen und interpretieren | Bestehende Abschnitte 1–4; Werte verändern, Mittelwert und Median vergleichen; erweiterte Kennzahlen-Papieraufgabe mit vollständigen Zahlen und Lösung; Vorwissen aus der dritten Klasse |
| Absolute und relative Häufigkeiten in Kreuztabellen, insbesondere Vierfeldertafeln, darstellen, ergänzen und interpretieren | Abschnitt 5: Tabelle aus Randzahlen rekonstruieren; Gesamt-, Zeilen- und Spaltenbezug unterscheiden; drei Datensätze und drei Bezugsgrößen interaktiv vergleichen; leere Gruppen und Grenzen kausaler Aussagen erklären |
| Baumdiagramme und Laplace-Wahrscheinlichkeiten wiederholen | Abschnitt 6: benanntes Kugelmodell mit Zurücklegen, vier geordnete Farbpfade und 16 gleich wahrscheinliche Paare einzelner Kugeln; Münzwürfe zeichnen und auswerten |
| Wahrscheinlichkeiten bei ein- und zweistufigen Versuchen ermitteln und interpretieren | Abschnitte 6–7: Pfade multiplizieren und passende disjunkte Pfade addieren; genau einmal, zweimal und mindestens einmal Rot; sechs Ziehmodelle mit je drei Ereignissen; sechs erzeugte einstufige Urnenaufgaben |
| Digital Kreuztabellen ergänzen und Zufallsexperimente untersuchen | Tabellenkalkulationsauftrag mit Zellbezügen und Prozentformat; interaktive Bezugsgruppen und Baumdiagramme; wiederholte Zufallssimulationen bleiben im vorausgesetzten Kapitel der dritten Klasse zugänglich |

Die Tabelle belegt konkrete Aufgabenangebote. Sie ist kein Nachweis eines Kompetenzerwerbs bei Lernenden. Die Kennzahlen zur Streuung und Boxplots bleiben als vorhandene Erweiterung erhalten; die neuen Anforderungen werden dadurch nicht ersetzt.

## Inhalt und Bedienung

Das Kapitel besitzt sieben Abschnitte, sieben Lernziele und 17 bewertete Fragen mit 47 Antwortmöglichkeiten. Die bisherigen acht Frage-IDs bleiben erhalten. Neun neue direkte Aufgaben verlangen eigene Tabellen, Baumdiagramme, Berechnungen und Begründungen. Titel, Katalog und Revisionskennung sind angepasst; Übersetzungen wurden nicht bearbeitet.

Die Kreuztabellenwerkstatt enthält drei ausdrücklich erfundene Datensätze: 20 Befragte mit den Zellen 9/3/2/6, 30 Befragte mit 6/12/9/3 sowie eine leere Gruppe A mit 0/0/4/6. Jede innere Zelle zeigt die absolute Zahl und den gewählten Nenner. Randzahlen bleiben ausdrücklich absolute Zahlen. Die Erläuterung steht außerhalb der seitlich verschiebbaren Tabelle. Ein leerer Nenner erhält keine Prozentzahl; ein Zähler 0 bei positivem Nenner ergibt korrekt 0 %. Rundungsabweichungen und Grenzen der Verallgemeinerung werden erklärt.

Das Ziehmodell enthält vier gleich wahrscheinliche Kugeln, davon wahlweise eine, zwei oder drei rote. Mit Zurücklegen und Mischen stehen bei der zweiten Ziehung erneut vier Kugeln zur Wahl. Ohne Zurücklegen bleiben drei; die Zusammensetzung hängt vom ersten Ergebnis ab. Die Werkstatt zeichnet alle Äste und markiert die gesuchten Pfade sowohl in der Grafik als auch im Text der Ergebnistabelle. R/B ergänzen die Farbkennzeichnung. Unmögliche Pfade bleiben mit Wahrscheinlichkeit 0 sichtbar.

Eine eigene Prozentantwort wird zuerst eingetragen; Prüfen oder der freie Vergleich öffnet die Pfadrechnungen. Komma und Punkt sind zulässig, Ergebnisse können auf zwei Nachkommastellen gerundet werden. Ungültige Eingaben fokussieren das Eingabefeld, gültige Prüfungen die Rückmeldung. Parameterwechsel verwirft eine veraltete Rechnung; Neustart stellt das Ausgangsmodell her. Die Werkstätten ändern keine gespeicherten Quizresultate und verlangen keine Punkte oder Wartezeiten.

Auf kleinen Bildschirmen bleiben Kreuztabellen räumlich zusammenhängend und horizontal verschiebbar. Baumdiagramme und Boxplot sind ebenfalls mit Finger oder Pfeiltasten verschiebbar. Pfadrechnungen und die fünf Boxplot-Kennzahlen erhalten untereinander angeordnete, beschriftete Tabellenzellen. Der Boxplot hat auch im dunklen Design einen hellen Zeichenhintergrund und dunkle Achsenbeschriftungen.

## Unterricht und Druck

Drei Papieralternativen ersetzen die Online-Werkstätten: die bestehende Kennzahlenübung mit vollständigen Ausgangsdaten, die Kreuztabelle und sechs Ziehmodelle mit zusammen 18 Ereignisberechnungen. Ein statisches Baumdiagramm und die absolute Beispieltabelle bleiben im Ausdruck erhalten. Vier Vergleichslösungen sind optional zuschaltbar. Sechs erzeugte Urnenaufgaben nennen Gleichwahrscheinlichkeit, genau eine Ziehung, Bruch- und Prozentdarstellung und Rundung; ihre Lösungen beziehen sich auf die tatsächlich erzeugten Zahlen.

## Nachweise und Grenzen

- `test_statistics_year4.js`: neun Tabellenzustände mit unabhängig bestimmten Nennern und Randzahlen; 18 Modelle durch Aufzählen der zulässigen geordneten Paare einzelner Kugeln überprüft; alle Pfadwahrscheinlichkeiten und Summen, richtige/falsche/ungültige Eingaben, Fokus, Enter, Neustart und unveränderter Speicher. Alle 47 Quizantworten mit unabhängigen richtigen Antwortindizes, 100/94-Prozent-Ergebnis und passenden Wiederholungs-IDs geprüft. Drei Papieralternativen, vier optionale Lösungen, sechs tatsächliche Zusatzlösungen und 30 weitere erzeugte Fälle unter fünf kontrollierten Zufallswerten bestanden.
- `test_statistics.js`: bisherige geraden, ungeraden, mehrfach vorkommenden und dezimalen Datenreihen, Eingabegrenzen, Boxplot-Geometrie, Vorgaben und Revision weiterhin bestanden.
- `browser_statistics_year4.js`, Bericht 13:01:29 UTC, Chromium 151.0.7922.34: 18 native Ereignisberechnungen, 54 Kreuztabellen- und 36 Baumdiagramm-Ansichten bei 320/390/1280 Pixeln in beiden Farbschemata; Tastatur, Fokus, Speicher und alle 47 nativen Quizantworten ohne Browserfehler.
- Sichtprüfung führte zu einer außerhalb des Scrollbereichs stehenden Tabellenerklärung und besserem Boxplot-Kontrast. Bericht 13:02:14 UTC bestätigt 54 endgültige Kreuztabellenansichten und die Kontraste. Mobile Detailansichten, vollständige Baumdiagramme, statische Tabelle und statischer Beispielbaum gelesen. Die ersten vollständigen Diagrammaufnahmen waren teilweise vom festen Punktebalken überlagert; abschließende Aufnahmen wurden dafür im sichtbaren Bereich zentriert.
- Endgültige native Druckprüfung 13:05:27 UTC: drei Papieralternativen, vier optionale Vergleichslösungen und sechs passende erzeugte Lösungen. Alle 21 A4-Seiten der endgültigen Fassung gelesen; Tabellen, Diagramm, 17 Verständnisfragen und Lösungen lesbar. Die Vorschauadressen im internen Prüf-PDF sind keine veröffentlichten Unterrichtsmaterialien.
- Gemeinsame Prüfung für 95 Mathematik-/Chemie-/Biologiekapitel, Revisionsprüfung, Mathematik-Zugänglichkeitsindikatoren und Syntax aller 106 Themenskripte bestanden. Inventar: 197 Kapitel; Prioritätsaudit: 1.743 Frageninstanzen, darunter 516 in Mathematik, ohne Strukturfehler. Diese Strukturprüfungen ersetzen keine inhaltliche Gesamtabnahme.

Kein vollständiger neuer Suitenlauf und keine Prüfung mit echten Screenreadern oder Lernenden. Die übrige Facharbeit, vollständige Kompetenzzuordnung aller Klassen und Fächer sowie die Gesamtproduktprüfung bleiben offen. Der letzte veröffentlichte Zwischenstand ist `1367d26`; die hier beschriebenen Ergänzungen sind noch lokal.
