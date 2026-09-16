# Prozent, Zinsen und Wachstum – 3. Klasse

Stand 16.09.2026, Kapitel `math3_10_prozent_zins`, 7. Schulstufe, Revision 2. Lokale Weiterarbeit nach db9fbea.

## Nachgewiesene Inhaltslücke und Umsetzung

Das bisherige Kapitel bestand aus drei kurzen Abschnitten zu Prozentgrundlagen sowie Jahres- und Monatszinsen, mit insgesamt sieben bewerteten Fragen. Der am 16.09.2026 gespeicherte und erneut gelesene [RIS-Lehrplan](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html), Mathematik 3. Klasse, Variablen und Funktionen, verlangt außerdem lineare Wachstums-/Abnahmeprozesse, mehrstufige Prozentänderungen mit Faktoren, Formeln zu Zinseszinsen und Aufgaben mit einem Tabellenkalkulationsprogramm. Diese Bereiche sind jetzt ausdrücklich Bestandteil des Lernwegs.

Sechs Abschnitte mit je drei konkreten Arbeitsaufträgen und getrennten Vergleichslösungen:

1. Grundwert, Prozentwert und Prozentsatz, direkte und umgekehrte Rechnungen, Ersparnis und verbleibender Preis.
2. Änderungsfaktoren, mehrstufige Änderungen, nicht symmetrische Rückwege sowie Prozentpunkte gegenüber relativer Änderung.
3. Jahres- und Monatszinsen, Kapital gegenüber Zinsbetrag, vereinfachte Zeitanteile und Modellannahmen.
4. Jährliche Wiederverzinsung, Vergleich mit unverzinst beiseitegelegten Zinsen und eine zusätzliche Einzahlung als Modelländerung.
5. Lineare und konstante prozentuelle Änderung, Wachstum, Abnahme und konstante Folgen; Diagramm, Tabelle und Werkstatt.
6. Selbstständiger Aufbau eines Tabellenblatts, Kopieren relativer/absoluter Bezüge, Parameteränderungen und XY-Diagramm.

18 bewertete Fragen mit drei individuellen Antworten, 54 Antwortwege. Sieben alte IDs erhalten und elf ergänzt. Alte Ergebnisse aus Revision 1 gelten nicht als aktueller Nachweis. Katalogtitel und Voraussetzungen angepasst. Die Preise, Zinssätze und Verläufe sind erfundene Rechenbeispiele, ohne Behauptung realer Angebote oder Vertragskosten.

Zinsbegriffe am selben Tag gegen das [OeNB-Glossar](https://www.oenb.at/Service/Glossar.html?category=c6454973-b5bf-4676-a45e-6fa2f9116885&letter=Z) geprüft. Relative und absolute Bezüge gegen die [LibreOffice-Hilfe](https://help.libreoffice.org/latest/de/text/scalc/guide/relativ_absolut_ref.html) geprüft. Quellen haben sichtbare Titel auch in der Papierfassung.

## Werkstatt und Unterrichtsmaterial

Die Werkstatt vergleicht L(n) = S + n·d mit P(n) = S·(1+p/100)ⁿ. Drei Startwerte (100, 500, 1000 Euro), je drei feste/prozentuelle Änderungen (−10, 0, +10) und sieben ausgewählte Schritte ergeben 189 Zustände. Sie zeigt alle sieben Wertepaare, Änderungen zum vorherigen Schritt, ein markiertes Wertepaar und passende Zellbezüge. Intern keine Zwischenrundung, Anzeige auf zwei Nachkommastellen mit Näherungszeichen, wo nötig. Schritt null besitzt keinen vorhergehenden Schritt. Beide Änderungen null ergeben zwei übereinstimmende konstante Folgen.

Eigenes SVG mit numerischen Achsen ab null, runden Punkten/durchgehender Linie und Quadraten/gestrichelter Linie. Die Linien verbinden berechnete ganze Schritte; sie sind kein Beleg für einen kontinuierlichen realen Vorgang. Ein statisches Vergleichsbild ist auch ohne Interaktion und im Ausdruck vorhanden. Die Werkzeugtabelle und die Tabelle mit Zellformeln sind auf schmalen Bildschirmen per Tastatur seitlich scrollbar; die erste Spalte bleibt sichtbar. Neustart stellt die Ausgangswerte her und setzt den Fokus. Keine Speicherung oder Punktevergabe durch die Werkstatt. Der alte Rabatt-Eingabeaufruf bleibt für andere Sprachfassungen verfügbar.

Das Tabellenkalkulationsvorhaben ist eine Arbeitsaufgabe in einem externen Programm; die Webseite ersetzt kein vollständiges Tabellenkalkulationsprogramm. F2 enthält den Startwert, G2 die feste Euroänderung und H2 die Prozentzahl als Zahl, etwa 10. A2:C8 enthält Schritte 0 bis 6. Relative Vorzeilenbezüge und absolute Parameterbezüge sind ausdrücklich getrennt. Das reine Formatieren auf zwei Nachkommastellen ist von einer Zwischenrundung unterschieden.

Papiermaterial: alle sechs Abschnitte, 18 Arbeitsaufträge, fünf Protokollzeilen, Vergleichsdiagramm, Formeltabelle, 18 Verständnisfragen und sechs Vergleichslösungen. Acht zusätzliche Zufallsaufgaben umfassen Rabatt, Monatszinsen, lineare Änderung und prozentuelles Wachstum. Aufgaben und Lösungen verwenden dieselbe Ziehung; Rundungen werden mit ≈ gekennzeichnet, der Lösungsschalter verändert keine Zahlen.

## Nachweise und Grenzen

- `test_growth_year3.js`: 54 unabhängig vorgegebene Antwortwege mit Prozentstand, Abschnittszuordnung und Revision; 189 Zustände gegen unabhängige geschlossene Formeln; Koordinaten, Tabellenwerte, Zuwächse und Rundung, Fokus/Neustart, erneutes Laden des Skripts und unveränderter Speicher bestanden. Die tatsächlich im Kapitel geschriebenen Tabellenformeln werden kopiert, ihre Zellbezüge geprüft und vier vollständige Zahlenfolgen berechnet. Papierstruktur, Quellenbezeichnungen und 32 erzeugte Aufgaben-/Lösungspaare einschließlich Näherungszeichen bestanden. Das ist keine Ausführung in Calc oder Excel.
- `browser_growth_year3.js`: finaler nativer Bericht 2026-09-16T12:37:06.534Z, Chromium 151.0.7922.34. 54 Antworten, 189 Modellzustände einschließlich SVG-Textgrenzen, Tastatur-/Eingabe-/Neustart-/Wiederladeprüfung, 18 Zustände bei drei Breiten und zwei Designs, beide horizontalen Tabellen, zwei 94-Prozent-Kapitelchecks mit passender Wiederholung und Papierexport bestanden. Keine Seitenfehler. Mobile Werkstatt, Diagramm und Formeltabelle tatsächlich gelesen. Nach Sichtprüfung die zu schmale Formeltabelle verbessert.
- A4-Ausgabe mit Lösungen: 23 Seiten. Seiten 1, 2, 4, 5, 6, 7, 8, 9, 16, 20, 21, 22 und 23 gerendert und gelesen. Danach ausschließlich die Rundungszeichen der erzeugten Zusatzlösungen korrigiert und erneut exportiert; die davon betroffenen Aufgaben-/Lösungsseiten 9, 20 und 21 nochmals gerendert und gelesen. Keine Sichtprüfung sämtlicher Druckseiten.
- Finanzkapitel, vier Dezimaleingaben, Proportionalität, Lern-/Stofflistenweg, 95 STEM-Arbeitsblätter und allgemeine Arbeitsblattprüfung gezielt erfolgreich geprüft. Kein neuer vollständiger Suitenlauf; der letzte 191/191-Nachweis liegt vor den jüngsten Mathematikänderungen. Kein physisches Mobilgerät, echter Screenreader oder externes Tabellenkalkulationsprogramm getestet.

Inventar weiterhin 197 Kapitel. Prioritätsaudit jetzt 1607 Frageninstanzen (Mathematik 481), ohne strukturellen Befund. Das ist keine Aussage über fachliche Vollständigkeit. Übersetzungen zurückgestellt, fünf priorisierte Fächer unverändert; Gesamtprodukt-, Praxis- und vollständige Lehrplanabnahme bleiben offen.
