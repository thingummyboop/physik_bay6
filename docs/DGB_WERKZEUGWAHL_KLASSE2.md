# DGB: Werkzeugwahl und faire Nutzung, 2. Klasse

Stand 23.09.2026, Kapitel `dgb6_orientierung`, Revision 1. Vier Abschnitte verbinden Softwarewahl, Einkaufen, Spiel-/Medieninteressen und Barrieren mit acht interaktiven Fällen, 18 Arbeitsaufträgen, acht bewerteten Fragen und drei freien Übungen. Die bisherigen Abschnitts- und Fragekennungen bleiben erhalten; veraltete Ergebnisse werden durch die Kapitelrevision erkannt.

## Lehrplanzuordnung

Arbeitsgrundlage ist der am 23.09.2026 abgerufene [amtliche Mittelschullehrplan](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html), Digitale Grundbildung, Orientierung der 2. Klasse. Die folgenden Zeilen fassen vier Kompetenzen und drei Anwendungsbereiche zusammen; sie dokumentieren konkrete Lerngelegenheiten, keine vollständige Produktabnahme.

| Anforderung / Anwendung | Material und überprüfbares Ergebnis |
| --- | --- |
| Zugänglichkeit und Nutzbarkeit für unterschiedliche Bedürfnisse verbessern | Abschnitt 4: vier Nutzungsbeobachtungen, passende Änderungen, tatsächlicher Tastaturversuch und begrenztes Prüfprotokoll |
| Interessen und Bedingungen von Medienproduktion, Veröffentlichung und Konsum untersuchen | Abschnitt 3: Spielvorteile, finanzierter Werbeclip, Produktionskette und begründete Überarbeitung einer Behauptung |
| Geeignete, auch freie Software auswählen und bedienen | Abschnitt 1: Calc-Tabelle mit Formel, gespeicherte und erneut geöffnete Arbeitsdatei; Writer-Einladung mit Überarbeitung; freie Software von kostenlosem Angebot unterscheiden |
| Digitale und analoge Veränderungen und fehlende Neutralität beurteilen | Abschnitte 2–4: Einkaufswege nach Bedarf, Preis und Zeit vergleichen; Interessen und Zugangsbarrieren prüfen; fehlende Umweltdaten ausdrücklich benennen |
| Veränderung des Einkaufsverhaltens | Abschnitt 2: Laden-/Onlineshop-Fall und Mengenangebot, Vergleichskarte ohne echte Bestellung |
| Online-Spiele und Pay-to-win | Abschnitt 3: kosmetische Änderung gegenüber bezahltem Spielvorteil, Münzpakete und tatsächliche Gesamtkosten |
| Sprachliche, sensorische und motorische Einschränkungen berücksichtigen | Abschnitt 4: verständliche Sprache, Text statt reiner Farbe bzw. Audio, bedienbare Alternative zum Ziehen mit der Maus |

## Materialien und Quellen

Die herunterladbare Datei `examples/werkzeugwahl-anmeldungen.csv` enthält drei erfundene Workshopzahlen (6, 4, 8). Die Summe ist zunächst 18; nach Änderung von 4 auf 7 muss die Formel 21 liefern. Die Aufgaben verlangen Speichern und erneutes Öffnen. Ohne verfügbare Software bleibt die tatsächliche Durchführung ausdrücklich offen. Einkaufsangebote, Spielbedingungen und Medienbeispiele sind erfundene Unterrichtsfälle.

Bei der Ausarbeitung gelesen: [FSFE zu freier Software](https://fsfe.org/freesoftware/freesoftware.de.html), [LibreOffice-Lizenzen](https://www.libreoffice.org/licenses/), [Calc-Formeln](https://help.libreoffice.org/latest/de/text/scalc/guide/formulas.html), [Saferinternet zu Kosten in Spiele-Apps](https://www.saferinternet.at/news-detail/so-schuetzen-sie-ihre-kinder-vor-versteckten-kosten-in-spiele-apps) und [W3C zur Barrierefreiheit](https://www.w3.org/WAI/fundamentals/accessibility-intro/).

## Prüfungen und Grenzen

- `scripts/test_software_choice.js`: 24 Fallantwortwege, alle 24 bewerteten Antwortwege, Revision und Wiederholung, freie Übungen, Rechenwerte, CSV und getrennte Drucklösungen bestanden.
- `scripts/browser_software_choice.js`: Chromium 151.0.7922.34, Bericht 23.09.2026 um 11:22:41 UTC. 144 Fallentscheidungen, 24 Quizantworten, neun freie Antworten, sechs Ansichten (320/390/1280 Pixel, hell/dunkel), Tastaturwahl, Fokus nach Zurücksetzen und echter CSV-Download bestanden; keine Browserfehler.
- Nach der mobilen Layoutkorrektur weitere sechs Ansichten geprüft; Begriffe und Beschreibungen beginnen bündig, kein Seitenüberlauf. Endgültige dunkle Handyansicht visuell gesichtet.
- Alle 18 Seiten der Lösungsdruckfassung gelesen. Zwei verdächtige Rasterstellen zusätzlich anhand des PDF-Texts und höher aufgelöster Seitenbilder überprüft.
- LibreOffice 25.8.4.2: CSV als Zahlen importiert, Formeln mit absichtlich falschem gespeicherten Ergebniswert neu berechnet, ODS-Dateien gespeichert und erneut geöffnet. Ergebnisse 18 und 21 sowie erhaltene Formeln bestätigt. Dieser Nachweis stammt aus Calc ohne sichtbare Bedienoberfläche; er belegt keine Durchführung des Writer-Auftrags oder Unterrichtserprobung.
- Arbeitsblatt-, Titelindex-, Kapitelquiz- und Revisionsprüfungen gezielt bestanden. Inventar: 198 Kapitel; Prioritätsaudit: 1.956 Frageninstanzen ohne strukturellen Befund.

Der vollständige Lauf mit 260 bestandenen Suiten um 11:09 UTC lag **vor** dieser Kapitelüberarbeitung. Inzwischen existiert eine zusätzliche Funktionstestsuite; ein vollständiger Lauf mit 261 Suiten wird hier nicht behauptet. Weitere jahrgangsweise Fachabgleiche und die Gesamtprüfung bleiben offen. Übersetzungen sind zurückgestellt; Physik, Mathematik, Chemie, Biologie und DGB bleiben vorrangig.
