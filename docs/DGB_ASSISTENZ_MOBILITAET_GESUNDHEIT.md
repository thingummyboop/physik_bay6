# DGB 4. Klasse: Mobilität und vernetzte Gesundheitsdaten

Stand: 23.09.2026. Lokale Weiterarbeit nach `47c553a`; keine erneute Veröffentlichung.

## Lehrplanbezug und Umsetzung

Der aktuelle [RIS-Gesamttext](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007850) wurde am 23.09.2026 direkt per HTTPS abgerufen und der Orientierungsbereich der 4. Klasse gelesen. Die Anwendungsbereiche Mobilität und Gesundheit sind dort ausdrücklich genannt. Quellenbelege außerhalb des Repositories: `../lehrplan-2026-09-23.html` und daraus extrahierter Text. Dies ist eine gezielte Prüfung dieses Bereichs, kein neuer Vergleich aller Fachlehrpläne.

`dgb8_orientierung` hat zwei neue Abschnitte nach den vier bestehenden KI-/Medienabschnitten. Die bisherigen Aufgaben und Fragen bleiben erhalten. Revision 2 umfasst sechs Abschnitte, sechs Lernziele und 14 bewertete Fragen. Frühere Ergebnisse aus Revision 1 zählen nicht als aktueller Nachweis des erweiterten Stoffs.

| Lernhandlung | Konkretes Material | Ergebnis |
|---|---|---|
| Aufgaben zwischen Mensch und System unterscheiden | M1: Lenk-/Bremsunterstützung mit laufender menschlicher Überwachung | Begründetes Urteil gegen die überzogene Werbung; eigenes Ablaufbild |
| Einsatzbedingungen und Ausfälle beurteilen | M2: begrenzter Shuttle-Einsatz; M3: alte Sensormeldung auf zwei Anzeigen | Begrenzte Fahrgastinformation, fehlender Nachweis für andere Bedingungen, Umgang mit Datenlücken |
| Nutzen und Grenzen argumentieren | Fiktive Verbindung zwischen Wiener Haltestelle und Schule | Anforderungen an Zugang, Wetter, Verkehr und Zuständigkeit; begründete Gegenposition zu pauschalen Technikurteilen |
| Zuordnung und Aktualität prüfen | G1: gleicher Name, verschiedene Kennungen; G2: Übertragungslücke | Datenprüfkarte mit Herkunft, Zeitpunkt, Zuordnung, offener Information und Klärungsweg |
| Fehler automatischer Hinweise unterscheiden | G3: zehn erfundene Aufnahmen mit vorgegebener Referenz | Drei passende Hinweise, zwei unnötige Hinweise, ein übersehener Fall, vier passend nicht markierte Aufnahmen |
| Quellen und Zuständigkeit verbinden | ELGA-/WHO-Recherche mit Herausgeber und Fundstelle | Vernetzung und Auswertung trennen; Ablauf für begrenzten Zugriff, fachliche Prüfung und Korrektur entwerfen |

Zwei Fallwerkstätten erlauben je drei Entscheidungen pro Fall mit begründeten Rückmeldungen, Fallwechsel und Zurücksetzen. Acht weiterführende Aufträge verlangen eigene Darstellungen, Datenprüfung, Interpretation, Gestaltung und Argumentation. Die sechs Fälle sowie die Datentabelle erscheinen vollständig im Arbeitsblatt; Vergleichslösungen sind separat zuschaltbar. Die schmale Bildschirmtabelle zeigt alle drei Spalten gemeinsam; kurze Überschriften vermeiden abgeschnittene Angaben.

## Quellen und Aussagegrenzen

Alle folgenden Seiten wurden am 23.09.2026 geöffnet und gelesen:

- [NHTSA: Automated Vehicle Safety](https://www.nhtsa.gov/vehicle-safety/automated-vehicle-safety): technische Unterscheidung von Assistenz, Überwachungsaufgaben und begrenztem automatisiertem Einsatz. Keine Übernahme der US-Aussagen über Marktverfügbarkeit oder Zulassung als österreichische Rechtslage.
- [ELGA: Wissenswertes](https://www.elga.gv.at/faq/wissenswertes-zu-elga/): österreichisches Beispiel für die Vernetzung vorhandener Gesundheitsinformationen als Unterstützung der Betreuung. Die erfundenen Karten und Assistenzhinweise bilden ELGA nicht nach.
- [WHO: Chancen und Risiken von KI im Gesundheitsbereich](https://www.who.int/news/item/28-06-2021-who-issues-first-global-report-on-ai-in-health-and-six-guiding-principles-for-its-design-and-use), Veröffentlichung 28.06.2021: Nutzenpotenziale und Risiken. Die Unterrichtsaufträge untersuchen Informationsqualität; sie verlangen keine Diagnosen oder echten Gesundheitsdaten.

Die Aufgaben sind verfasste Lernfälle. Weder Fahrzeuge noch Gesundheitsgeräte wurden erprobt. Der Zehn-Fälle-Datensatz ist keine Zuverlässigkeitsstudie. Die Ergänzungen liefern die bisher fehlenden konkreten Lerngelegenheiten im Orientierungsbereich; sie belegen keine vollständige DGB-Abdeckung oder durchgeführte Unterrichtserprobung.

## Prüfbelege

- `test_assistance_cases.js`: alle 18 neuen Entscheidungen mit unabhängig festgelegten Schlüsseln; Fallwechsel, Rücksetzen/Fokus, eindeutige IDs und unveränderter Speicher; unabhängige Zuordnung aller zehn Datensätze; sechs Papierfälle, acht Aufträge und getrennte Lösungen.
- `test_ai_evidence.js`: ursprüngliche Quellenwerkstatt und Schulhofdaten weiterhin geprüft; alle 42 Antwortwege der 14 Kapitelcheckfragen mit Rückmeldung, Wiederholungs-ID, 100/93-Prozent-Ergebnis, Abschnittszuordnung und Revision.
- `test_dgb_worksheets.js`: alle 21 DGB-Arbeitsblätter im vorhandenen Prüfungsumfang bestanden. Titel-/Metadatenprüfung ebenfalls bestanden.
- `browser_assistance_cases.js`: Chromium 151; 36 Ansichten (sechs Fälle × drei Breiten 320/390/1280 × hell/dunkel), 108 native Tastaturentscheidungen, Fokus/Reset, keine gemessenen Seitenüberläufe und keine Speicheränderungen. Die Referenztabelle bleibt in allen sechs Breiten-/Designkombinationen vollständig innerhalb ihres Bereichs. Ausgewählte Werkstattansichten und die endgültige Tabelle bei 320 px visuell gelesen.
- `browser_ai_evidence.js`: neun bisherige Quellenurteile, alle 42 Kapitelantwortwege und 18 Ansichten der ursprünglichen Werkstatt erneut bestanden. Interne Berichte in `../browser-qa/assistance-cases/` und `../browser-qa/dgb-orientation-rev2/`.
- Endgültiger interner Druck: 19 Seiten Schülerfassung, 24 Seiten mit Lösungen. Sämtliche 24 Seiten visuell gelesen; doppelte Überschriften der neuen Papierwerkstätten entfernt. Die 19 Schülerseiten stimmen textlich mit den entsprechenden Seiten der Lösungsfassung überein. Lösungen werden erst danach ergänzt. Dieser Nachweis betrifft die konkrete Kapitel-Druckfassung, nicht alle anderen Kapitel.

Inventar weiterhin 198 deutsche Kapitel. Strukturprüfung der fünf priorisierten Fächer: 1927 Frageninstanzen ohne gemeldete Strukturfehler. Kein erneuter vollständiger Funktionslauf aller inzwischen 253 Suiten; der vorangegangene Lauf mit 252 Suiten gehört zum gesicherten Zwischenstand. Übersetzungen bleiben ausgesetzt. Die übrigen Fach- und Produktanforderungen bleiben offen.
