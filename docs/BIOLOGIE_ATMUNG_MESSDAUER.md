# Atmung: Stoffwege, Messdauer und begründete Entscheidungen

Stand 21.09.2026. `bio_3_atmung_energie`, Revision 2. Zwölf konkret verfasste Aufgaben ersetzen vier automatisch aufbereitete Trainingsblöcke. Zehn bewertete Fragen, eine punktfreie Übung, 16 Fachbegriffe und vier getrennte Vergleichslösungen. Alte Frage-IDs erhalten; frühere Ergebnisse werden durch die Revision als überholt kenntlich.

## Unterricht und Modell

Ein eigenes Wegschema trennt Luftbewegung, Gasaustausch, Bluttransport und aerobe Zellatmung. Pfeilrichtung und ausgeschriebene Gasnamen ergänzen die Farben. Das Schema ist kein anatomischer Schnitt: Herz, Kreislaufgefäße und chemische Einzelschritte sind ausdrücklich ausgelassen. Aufgaben behandeln auch die Fehlvorstellung, die Lunge verwandle Sauerstoff in Kohlenstoffdioxid.

Drei Karten vergleichen Heuschrecke, Bachforelle und Mensch anhand von Sauerstoffquelle, Austauschfläche und Weitertransport. Tracheensystem und menschliche Luftröhre werden nicht gleichgesetzt. Die Tiere dienen als konkrete Beispiele; keine Versuche an lebenden Tieren nötig.

Vier erfundene Datensätze: A 8 Atemzüge/30 s, B 13/30 s, C 9/30 s und D 16/60 s. A–C bilden eine Reihe mit Ruhe, Bewegung und Erholung; D einen weiteren Vergleich. Die Werkstatt rechnet ganze Anzahlen für 15, 30 oder 60 Sekunden auf eine Minute um. Vier Datensatzknöpfe, bearbeitbare Felder, Berechnung und Reset. Änderungen entfernen alte Ergebnisse; leere, negative, gebrochene und zu große Eingaben erhalten verständliche Rückmeldung. Der Zahlenbereich 0–120 ist ausdrücklich eine Grenze der Rechenaufgabe, kein medizinischer Normalbereich.

Die Werkstatt zeigt zusätzlich, wie ein einziger zusätzlich gezählter Atemzug die Umrechnung verändert: +4, +2 bzw. +1 pro Minute. Das ist keine vollständige Unsicherheitsrechnung. Frequenz, Atemzugvolumen und gesundheitliche Bewertung bleiben getrennt. Keine Speicherung der Werkstattdaten, keine Diagnosen oder Fitnessranglisten. Die optionale eigene Beobachtung bleibt freiwillig, leicht und angeleitet; alle Aufgaben sind mit den bereitgestellten Daten zugänglich.

Drei erfundene Fälle behandeln einen rauchfreien Warteplatz vor einer Wiener Sporthalle, eine unbegründete Fitnessrangliste und Hilfe bei akuter starker Atemnot. Die österreichische Rettungsnummer und der Vorrang von Hilfe vor der Unterrichtsmessung sind enthalten. Freie Begründungen werden nicht automatisch benotet. Papierfassung mit Schema, vollständigen Daten, Rechenalternative und getrennten Lösungen.

## Quellen und Lehrplanbezug

Am 21.09.2026 unmittelbar gelesene Abschnitte:

- [Gesundheitsportal Österreich: Atemwege und Lunge](https://www.gesundheit.gv.at/krankheiten/atemwege/atemwegserkrankungen.html): Atemwege, Alveolen, Kapillaren und Transport. Keine Erwachsenennormalwerte auf Schulkinder übertragen.
- [OpenStax Biology 2e: Systems of Gas Exchange](https://openstax.org/books/biology-2e/pages/39-1-systems-of-gas-exchange): Austauschflächen, Kiemen und Tracheensystem. Eigene Karten und Zeichnung, keine übernommenen Abbildungen.
- [OpenStax Biology 2e: Breathing](https://openstax.org/books/biology-2e/pages/39-3-breathing): Atemmechanik und Unterschied von Frequenz und Volumen. Vereinfachung auf ruhiges Ein-/Ausatmen ausdrücklich benannt; keine pauschalen Amphibienaussagen übernommen.
- [OpenStax Biology 2e: Oxidative Phosphorylation](https://openstax.org/books/biology-2e/pages/7-4-oxidative-phosphorylation): Sauerstoffbeteiligung und Energieumwandlung bei aerober Zellatmung. Die molekularen Einzelheiten sind kein Lernziel dieses Kapitels.
- [Gesundheitsportal: Passivrauchen](https://www.gesundheit.gv.at/leben/gesundheitsvorsorge/nichtrauchen/gesundheitsschaeden.html): Rauchbelastung und Atemwege.
- [Gesundheitsportal: Pneumothorax](https://www.gesundheit.gv.at/krankheiten/atemwege/pneumothorax.html): Abschnitt zur umgehenden Hilfe bei schwerer Atemnot; keine Ursachendiagnose im Unterrichtsfall.
- [Gesundheitsportal: Erste Hilfe bei verschiedenen Notfällen](https://www.gesundheit.gv.at/krankheiten/erste-hilfe/notfaelle.html): Hilfe, Notruf 144 und Anweisungen der Leitstelle. Das Kapitel ersetzt keinen Erste-Hilfe-Kurs.

Gespeicherten RIS-Text vom 16.09.2026 erneut zum Anwendungsbereich der 3. Klasse gelesen: Tracheen, Kiemen und Lungen; Bedeutung von Sauerstoff bei der Nutzung energiereicher Nährstoffe; Zusammenwirken von Atmung und Kreislauf sowie gesundheitsbezogenes Handeln. Wissen: Stoffwege und Struktur/Funktion. Erkenntnisgewinnung: standardisierte Zählung, Umrechnung, Fehler und Schlussfolgerungsgrenzen. Standpunkte/Handeln: Schutz der gemeinsamen Umgebung und rechtzeitige Hilfe. Keine erneute Online-Gesamtprüfung des Rechtsstands, keine vollständige Biologieabnahme.

## Prüfung

- `test_respiration_measurements.js`: zwölf unabhängig festgelegte Zahlenbeispiele einschließlich Grenzen, alle vier Datensätze, ungültige Angaben, Verwerfen alter Ergebnisse, Reset/Fokus, doppelte Initialisierung und unveränderter Speicher. Alle 30 Quizantwortwege mit festgelegten richtigen Antworten und Abschnittszuordnung; 90 % bei genau einem Fehler, passende Rückmeldung und Wiederholungsfrage. Zwölf unverändert gerenderte Aufgaben, 16 Begriffe, alle vier Datenzeilen, eigenes Schema und vier getrennte Papierlösungen.
- `browser_respiration_measurements.js`: Chromium 151.0.7922.34; Bericht `2026-09-21T06:10:40.960Z`. Elf Rechenbeispiele, vier Datensatzknöpfe, vier Fehlereingaben, 18 Zustands-/Layoutfälle bei 320/390/1280 Pixel in beiden Designs. Native Tastaturbedienung, Reset/Fokus, unveränderter Speicher, 30 Quizantwortwege und Export ohne Browserfehler.
- Sichtprüfung fand einen Kontrastfehler der Karten im dunklen Design. Karten und Eingabefelder auf vorhandene Designvariablen umgestellt. Abschließende 18 Layoutfälle einschließlich tatsächlicher Schrift-/Hintergrundfarben aller Karten und Felder: `2026-09-21T06:12:20.279Z`. Alle zehn mobilen Detailbilder gelesen, korrigierte Karten und Werkstatt erneut geprüft. Dauerhafte Browserprüfung um Farbprüfungen ergänzt.
- Alle 19 Druckseiten tatsächlich gelesen. Nach letzter sprachlicher Vereinfachung nur Seite 7 verändert und erneut gelesen; übrige 18 Seiten per SHA-256 bildidentisch mit der geprüften Fassung. Finaler Export `2026-09-21T06:13:47.692Z`. Keine abgeschnittenen Inhalte. Lokale Vorschauadressen im Prüfexport sind keine veröffentlichten Unterrichtsadressen.
- Gemeinsame Materialprüfung für 95 STEM-Kapitel, Kapitelrevisionen, vollständige Quizpools und Syntax aller 92 Themenskripte bestanden. Inventar aktualisiert: 197 Kapitel; Prioritätsaudit: 1.654 Frageninstanzen ohne Strukturfehler. Kein neuer Gesamtsuitenlauf. Die abschließende Sprachänderung betraf weder Quiz noch Interaktion.

Biologie-Strukturzählung: 99 direkte und 57 automatisch verarbeitete Trainingsblöcke, 31 allgemeine Situationsformulierungen und 17 Kapitel mit mindestens einem automatischen Block. Dies benennt weitere Prüfarbeit, keine Bewertung aller übrigen Inhalte. Vollständige Fach- und Produktabnahme bleiben offen; Übersetzungen zurückgestellt, neue Änderungen lokal nach `c86f016`.
