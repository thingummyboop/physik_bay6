# Grundstoff und Vertiefung – Physik, 2. Klasse

Fortsetzung: [Grundstoffabgrenzung und Inhaltsabgleich der 3. Klasse](PHYSIK_KLASSE3_ABGLEICH.md), einschließlich Kondensator, Transformator und Drehimpuls als Vertiefungen.

Stand: 23.09.2026, lokale Weiterarbeit nach dem GitHub-Zwischenstand `ab3156e`.

## Didaktische Entscheidung

Die Kapitel unterscheiden den **Grundstoff dieses Lernwegs** von zusätzlichen Vertiefungen. Diese Bezeichnung ist eine didaktische Auswahl der Website, keine amtliche Liste von Prüfungsfragen. Maßstab bleibt der [Lehrplan der Mittelschule](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html), dessen vollständiger Physikabschnitt am 23.09.2026 gelesen wurde. Die Zuordnung der neun Kompetenzen und acht Anwendungsbereiche steht im [Jahrgangsabgleich](PHYSIK_KLASSE2_ABGLEICH.md).

Sehen und Hören, sichere Anwendung, Schattenvorhersagen, Bildentstehung mit Lochkamera/Spiegel/Auge/Linsen, Farben und Spektren sowie Recherche und Bewertung optischer Geräte bleiben im Grundstoff. Die Geräte-Recherche ist ausdrücklich kein Zusatz. Detaillierte optische Konstruktionen gehen über diese gemeinsame Grundlage hinaus. Grundstoff umfasst auch praktische Untersuchungen und begründete Entscheidungen; ein Auswahlcheck ersetzt diese Tätigkeiten nicht.

| Kapitel | Grundstofffragen | Zusätzliche Übungen | Vertiefungsabschnitte | Revision |
|---|---:|---:|---|---:|
| Licht, Weg und Schatten | 21 | 3 | Beugung und Grenzen des Strahlenmodells | 5 |
| Farben und Sehen | 14 | 5 | Itten-Farbenkreis, Strukturfarben, Lichtaussendung im Atommodell | 4 |
| Linsen und Spiegel | 17 | 15 | Totalreflexion, gekrümmte Spiegel, detaillierte Mikroskop-/Teleskopmodelle, Beugung | 8 |
| Schall und Hören | 22 | 3 | Resonanz | 5 |
| **Summe dieser vier Kapitel** | **74** | **26** | | |

Alle bisherigen 100 Fragen, alle Abschnitte, ihre Reihenfolge und die bestehenden Modelle sind erhalten. Zusatzfragen aus den alten Abschlussfragepools stehen jetzt als tatsächlich bedienbare Übungen bei ihrem Abschnitt. Der übrige Grundstoffpool wurde nicht gekürzt. Das Kapitel Erde/Mond/Sonne und die jahrgangsübergreifenden Grundlagen sind unverändert.

## Verhalten für Lernende und Lehrkräfte

- Lernziele und Zusammenfassung trennen Grundstoff und Vertiefung. Zusätzliche Ziele und Merksätze lassen sich aufklappen.
- Inhaltsverzeichnis und Abschnitt weisen Vertiefungen aus. Der Lernweg erlaubt den Kapitelcheck nach dem Grundstoff.
- Vor und während des Checks ist sein Umfang sichtbar. Zusatzübungen verändern weder das Checkergebnis noch den gespeicherten Fortschritt.
- Katalog und persönliche bzw. Lehrer-Stoffliste nennen denselben Umfang. Die gedruckte Stoffliste enthält den Hinweis ebenfalls. Teilen erhält Kapitelwahl und Reihenfolge. Zusätzlicher Prüfungsstoff muss ausdrücklich mit der Lehrkraft vereinbart werden; es gibt keinen separaten bewerteten Vertiefungscheck.
- Arbeitsblätter enthalten weiterhin sämtliche Aufgaben. Die Zusatzfragen beginnen auf einer neuen Seite und heißen V1, V2 usw. Ihre Lösungen tragen dieselben Bezeichnungen in der standardmäßig ausgeblendeten Lösungsfassung.
- Ältere Ergebnisse werden aufgrund der neuen Inhaltsrevisionen nicht als bereits bestandener Check des veränderten Umfangs behandelt.

Technisch kennzeichnet `section.level = "extension"` die zusätzlichen Abschnitte. Ihre Fragen besitzen außerdem `practiceOnly: true`. Der gemeinsame Renderer berücksichtigt die Abschnittsebene auch dann, wenn eine später ergänzte Frage dieses zweite Merkmal noch nicht hat. Zusatzfragen auf Kapitelebene werden über ihre Abschnittsplatzhalter zugeordnet. Unveränderte Kapitel erhalten keinen neuen Umfangshinweis.

## Nachweise und Grenzen

Funktionsprüfung: Der vollständige Lauf vom 23.09.2026 um 16:40:42 UTC ergab 274/276. Die Lernzielprüfung wurde auf getrennte Haupt-/Zusatzlisten angepasst; der generierte Suchindex wurde von fünf veralteten Word-Metadateneinträgen bereinigt, ohne Übersetzungen zu erstellen. Beide Prüfungen und neun betroffene Begleitprüfungen bestanden danach erneut (2026-09-23T16:42:10.876Z). Damit liegt für jede der 276 Suiten ein bestandener aktueller Nachweis vor; dies war kein zweiter vollständiger Lauf. Berichte: `../functional-test-report.json` und `../functional-test-followup-report.json`.

`test_physics_core_scope.js` bestätigt die 74/26-Trennung anhand festgelegter Fragen-IDs, erhaltene freie Übungen, Revisionswechsel, Papiernummerierung, Lösungsschalter, Lehrerstoffliste und unveränderte Linkreihenfolge. Abschnittskennzeichnung und Ausschluss auf Kapitelebene werden zusätzlich mit gezielten Gegenfällen geprüft. Der Vergleich mit dem Stand vor dieser Änderung bestätigt die vollständige Erhaltung aller Fragen- und Abschnitts-IDs.

`browser_physics_core_scope.js` bestand am 23.09.2026 um 16:33:41 UTC: alle 78 Antwortwege der 26 Zusatzübungen mit unabhängig festgehaltenen Lösungen, Tastaturbedienung ohne Speicheränderung, 24 Ansichten bei 320/390/1280 Pixeln in hellem/dunklem Design, vier erfolgreiche Grundstoffchecks und geteilte Stoffliste ohne Browserfehler. Der abschließend präzisierte Anleitungssatz im Lernweg ändert keine Funktion; die gezielte Prüfung wurde danach erneut ausgeführt.

Die bisherigen Linsen-, Akustik-, Optik-Recherche- und Schulweg/Hörweg-Prüfungen sind an den tatsächlich neuen Umfang angepasst. Die Prüfung aller 20 Physik-Lernzielansichten unterscheidet jetzt die Hauptliste von der zusätzlichen aufklappbaren Liste und kontrolliert bei Farben sowohl die erhaltenen Zusatzübungen als auch die Rücksprünge der Grundstofffragen.

Zusätzliche native Nachtests: Optik-Grundstoff am 23.09.2026 um 16:42:06 UTC mit 51 bewerteten und zwölf freien Antwortwegen, 34 Abschnittsrücksprüngen und sechs Ansichten; Schulweg/Hörweg um 16:42:43 UTC mit neun bewerteten und neun freien Antwortwegen sowie zwölf Ansichten. Um 16:44:20 UTC wurde der tatsächlich erzeugte geteilte Link im vollständigen Seitenfenster geöffnet: alle vier Umfangshinweise, unveränderte Reihenfolge und Öffnen des Linsenkapitels mit fünf Vertiefungsabschnitten bestätigt. Auch der abschließende Anleitungssatz im Lernmodus wurde geprüft. Keine Browserfehler. Berichte liegen in `optics/`, `year2/` und `share-report.json` unter dem genannten Prüfverzeichnis.

Drucksichtung der endgültigen Lehrerfassungen: Licht/Schatten 25 Seiten, Farben 20, Linsen/Spiegel 38, Akustik 23. Visuell gelesen wurden die jeweiligen Einstiege der Zusatzfragen (19, 14, 24, 17), bei Linsen zusätzlich Seite 1 mit beiden Zielgruppen und Seite 35 mit V-Lösungen, sowie Seite 1 der vierseitigen Lehrer-Stoffliste. Die V1-Bezeichnungen von Licht und Farben wurden zusätzlich in hochauflösenden Ausschnitten bestätigt. Dies ist eine Prüfung der geänderten Ausgabe, keine neue vollständige Sichtung aller vorhandenen Kapiteltexte. Dateien und Browserbericht: `../browser-qa/physics-core-scope/`.

Offen bleiben der zusammenhängende Physikabgleich für die 3. und 4. Klasse und die fachübergreifenden Abschlussanforderungen des Gesamtplans. Bestehende Antwortalternativen außerhalb des geprüften Umfangs benötigen weiterhin eine inhaltliche Beurteilung; eine Kennzeichnung als Zusatz ersetzt keine Qualitätsprüfung. Übersetzungen bleiben entsprechend der Nutzerpriorität ausgesetzt. Neue Änderungen wurden nicht automatisch gepusht.
