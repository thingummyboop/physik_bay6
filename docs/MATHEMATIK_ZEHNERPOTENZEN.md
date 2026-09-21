# Zehnerpotenzen und wissenschaftliche Schreibweise

Stand 21.09.2026. Kapitel `math3_2_potenzen_terme`, dritte Klasse / siebte Schulstufe, Revision 4. Weiterarbeit nach dem auf ausdrücklichen Wunsch gesicherten Zwischenstand `a2c72d2`. Neue Änderungen bleiben lokal; Übersetzungen bleiben zurückgestellt.

## Inhalt und Lernfolge

Die gespeicherte RIS-Fassung vom 16.09.2026 nennt im Zahlenbereich der dritten Klasse ausdrücklich das Darstellen von Zahlen mit Zehnerpotenzen und das Anwenden der Gleitkommadarstellung. Der einschlägige Absatz wurde erneut gelesen. Der erneute Abruf des [offiziellen HTML-Dokuments](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html) über das Webwerkzeug lieferte am 21.09.2026 HTTP 503. Deshalb wird hier kein neuer erfolgreicher Quellenvergleich behauptet; Grundlage bleibt der dokumentierte [Quellenstand](LEHRPLAN_QUELLENSTAND.md).

Das bisherige Potenzkapitel enthielt positive ganzzahlige Exponenten, Potenzregeln, Terme und binomische Formeln. Die neuen Abschnitte stehen nach den Potenzregeln und vor den Termumformungen:

1. Zehnerpotenzen mit positiven, null und negativen Exponenten; Kehrwert als Begründung; Stellenwertänderung und Vorzeichen unterscheiden.
2. Normierte wissenschaftliche Schreibweise mit `1 ≤ |a| < 10`, Null als Sonderfall, große/kleine und negative Zahlen, Größenvergleiche, E-Anzeige und Einheiten an einer ausdrücklich erfundenen Folienmessung.

Das Kapitel enthält nun acht Abschnitte, sechs Lernziele und 26 bewertete Fragen mit 78 begründeten Antwortwegen. Acht Fragen, sechs direkte Arbeitsaufträge und zwei getrennte Vergleichslösungen sind neu. Die vorhandenen 18 Arbeitsaufträge, drei Flächenbilder und die Werkstatt zu binomischen Formeln bleiben erhalten. Die interne Abschnittsreferenz der Papierwerkstatt wurde an die neue Reihenfolge angepasst. Alte Ergebnisse mit Revision 3 sind kein aktueller Nachweis.

## Interaktion und Unterrichtsmaterial

52 Modellzahlen verbinden die Vorfaktoren −4,2 / 1 / 2,5 / 9,6 mit den ganzzahligen Exponenten −6 bis 6. Beide Umwandlungsrichtungen ergeben 104 Fälle. Die Aufgabenauswahl zeigt nur eine Nummer, damit die Lösung nicht bereits in den Auswahlfeldern steht. Der Rechenweg mit Zehnerschritten öffnet sich auf Wunsch. Eingaben akzeptieren Dezimalkomma oder Punkt; wissenschaftliche Kurzschreibweise ist im Dezimalzahlfeld ausdrücklich nicht zugelassen. Der Vorfaktor muss normiert sein, der Exponent ganzzahlig.

Die Dezimaldarstellung entsteht durch Verschieben der Position im Zifferntext und enthält keine sichtbaren Rundungsreste aus Gleitkomma-Multiplikationen. Vorzeichen, Exponent null und einstellige Vorfaktoren werden ausdrücklich abgedeckt. Antworten lassen sich mit Enter prüfen; neue Eingaben entfernen alte Rückmeldung. Neue Aufgaben schließen den alten Rechenweg. Neustart setzt die Ausgangsaufgabe und den Fokus zurück. Die Werkstatt verändert den lokalen Speicher nicht und vergibt keine Punkte.

Die Papierfassung ersetzt die Werkstatt durch fünf Umwandlungen und eine Begründungsaufgabe. Deren Lösungen stehen separat bei den Vergleichslösungen. Acht bisherige Zufallspotenzaufgaben bleiben bestehen; vier zusätzliche Aufgaben A9–A12 behandeln beide Umwandlungsrichtungen einschließlich einer negativen Zahl. Lösungen stammen aus derselben Ziehung und bleiben beim Umschalten unverändert.

## Automatisierte Nachweise

- `test_scientific_notation.js`: 104 Umwandlungen und alle Zwischenschritte gegen unabhängig berechnete Werte, ungültige Eingaben, nicht normierte Vorfaktoren, falsche Exponenten, Enter/Fokus/Neustart/Wiederinitialisierung, unveränderter Speicher, tatsächliche Papieralternative und 24 erzeugte Aufgaben-/Lösungspaare bestanden.
- Aktualisierte `test_powers_year3.js`: alle 78 Antwortwege mit unabhängig vorgegebenem Schlüssel, acht Abschnittszuordnungen, Revision 4, 100 beziehungsweise 96 Prozent und passende Wiederholungsfrage; sämtliche bisherigen 189 Formelmodelle/147 Flächenzerlegungen sowie 32 erzeugte Potenzaufgaben erhalten.
- Gemeinsame Materialprüfung: 96 STEM-Arbeitsblätter; Mathematikrückmeldungen: 40 Antwortwege; generierter Titelindex gegen tatsächliche Sprachauswahl; begrenzte Mathematik-Quellprüfung: 42 Kapitel; Renderer: 198/198. Inventar 198 Kapitel; Prioritätsaudit 1.814 Frageninstanzen ohne Strukturfehler. Diese Prüfungen beweisen keine vollständige fachliche oder visuelle Produktabnahme.

## Browser und Druck

`browser_scientific_notation.js`, Bericht vom 21.09.2026 um 15:37:13 UTC, Chromium 151.0.7922.34: 104 tatsächlich bediente Umwandlungen, alle 78 Kapitelantwortwege, 624 Ansichten bei 320/390/1280 Pixel in Hell/Dunkel, Enter/Neustart/Fokus, unveränderter Speicher und ein Kapitelcheck mit 96 Prozent, Revision 4 und gezielter Wiederholung von Abschnitt 4 bestanden. Keine Seitenfehler.

Die Sichtprüfung zeigte zunächst eine abgeschnittene Auswahlangabe und einen Umbruch innerhalb einer kleinen Dezimalzahl. Kürzere Richtungsnamen, eine breitere Zahlenspalte und ungeteilte Zahlen beheben beides. Alle 624 finalen Zustände wurden erneut auf passende einzeilige Zahlen geprüft; beide finalen 320-Pixel-Ansichten tatsächlich gelesen. Die Ausgabe verwendet echte hochgestellte Exponenten. Nach einer abschließenden Änderung von Trennleerzeichen in den Lerntexten bestehen beide Kapiteltests weiterhin.

Alle 29 Seiten der A4-Fassung mit Lösungen wurden gerendert und tatsächlich gelesen: Lerntexte, drei bestehende Flächenbilder, beide Papierwerkstätten, 24 direkte Arbeitsaufträge, zwölf Zusatzübungen, 26 Verständnisfragen und sämtliche zugehörigen Lösungen. Ein Zeilenumbruch innerhalb von 1 000 wurde durch geschützte Zahlengruppierung korrigiert. Beim endgültigen Export waren 24 Seiten bytegleich mit bereits gelesenen Seiten; die fünf geänderten Seiten 3, 11, 12, 26 und 27 wurden erneut gelesen. Auch die neue Zufallsziehung stimmt mit ihren Lösungen überein. Interne Nachweise unter `../browser-qa/scientific-notation/`, insbesondere `report.json`, `final-layouts.json`, `final-print.json` und `final-scientific-solutions.pdf`.

Kein neuer vollständiger Suitenlauf. Vollständiger Lehrplanabgleich, Unterrichtserprobung, echte Screenreader-/Geräteprüfung und übrige Fach-/Produktarbeit bleiben offen. Nächster fachlicher Schritt im Mathematikabgleich: Zahlendarstellungen der unteren Klassen vollständig prüfen, insbesondere einfache periodische Dezimalzahlen und römische Zahlen. Die übrigen priorisierten Fächer bleiben Bestandteil des Auftrags.
