# Skelett und Bewegung: vergleichen, erklären und handeln

Stand 16.09.2026, Kapitel `bio_1_skelett_bewegung`, 1. Klasse Mittelschule, Revision 2. Lokale Weiterarbeit nach dem veröffentlichten Git-Zwischenstand `c428cf6`.

## Lernangebot

Alle sechs Abschnitte, 31 Glossareinträge und die bisherigen 13 Fragen einschließlich der unbewerteten Übung gelesen. 18 allgemeine Trainingskarten durch konkrete Aufträge ersetzt; der direkte Aufgabenmodus erhält ihre Texte im tatsächlichen Renderer. Die Aufgaben unterscheiden Skelettbereiche, Sehnen/Bänder/Knorpel, Bewegungsrichtungen und Grenzen von Modellen. Der Hinweis zu Hüftbeinen und Kreuzbein steht jetzt vor den darauf aufbauenden Aufgaben. Die Formulierung zu Bandscheiben bezieht sich auf viele Wirbelkörper, nicht auf jede Verbindung zwischen Wirbeln.

Das neue Vergleichsmodell zeigt Anfang und Ende von Anheben, Halten und langsamem Absenken eines gedachten Buches. Drei bewusst gewählte Winkelpaare: 150° → 90°, 90° → 90°, 90° → 150°. Die Knochenlängen bleiben gleich. Schüler:innen sagen die Längenänderung der Beugemuskeln voraus und prüfen sie mit begründetem Feedback. Die zentrale Unterscheidung: kürzer, etwa gleich lang und länger sind jeweils mit Muskelzug möglich. Die Zeichnung bildet keine Kräfte ab und fasst Elle und Speiche zusammen; sie ist keine anatomische Simulation. Keine Animation, kein Zeitdruck und keine Speicherung dieser Übung.

Ein dreizeiliges Protokoll hält Vorhersagen und Begründungen fest. Die Papieralternative enthält die Strichzeichnung, einen Zeichenauftrag im Heft und eine getrennt zuschaltbare Erklärung. Die Aufgaben sind mit Modell/Zeichnung bearbeitbar; eigene Bewegung ist freiwillig. Gesundheitssituationen verlangen das Beschreiben von Beobachtungen und Organisieren von Hilfe, keine Diagnose oder Selbstbehandlung. Bewegungspausen sollen unterschiedliche Bewegungsmöglichkeiten berücksichtigen.

Vier bewertete Fragen und die Zusatzübung überarbeitet, acht passende bewertete Fragen beibehalten. Sechs frühere Abschlussfragen ihren Lernabschnitten zugeordnet. Zwei neue Transferfragen prüfen kontrolliertes Absenken und die Aussagegrenze eines Standbilds. Insgesamt 14 bewertete Fragen und eine unbewertete Übung. Revision 2 macht alte Prüfungsergebnisse als veraltet kenntlich; Fehler führen zum passenden Abschnitt.

## Fachquellen

Am 16.09.2026 die einschlägigen Abschnitte erneut geöffnet und gelesen:

- [OpenStax: Muskelspannung mit und ohne Längenänderung](https://openstax.org/books/anatomy-and-physiology-2e/pages/10-4-nervous-system-control-of-muscle-tension): fachliche Grundlage für die drei Situationen. Eigene Strichzeichnung, kein übernommenes Lehrbuchbild.
- [OpenStax: Gelenkaufbau und Gelenktypen](https://openstax.org/books/anatomy-and-physiology-2e/pages/9-4-synovial-joints): Verbindungen, Gelenkflächen und Bewegungsrichtungen.
- [Österreichisches Gesundheitsportal: Bewegung für Kinder und Jugendliche](https://www.gesundheit.gv.at/leben/bewegung/gesund-durch-sport/bewegungsempfehlungen-jugendliche.html): Vielfalt und Unterbrechen langer Sitzzeiten.
- [Österreichisches Gesundheitsportal: Knochenbruch](https://www.gesundheit.gv.at/krankheiten/verletzungen/knochenverletzungen/knochenbrueche.html): angemessene Belastung/Erholung, Warnzeichen, medizinische Abklärung und österreichischer Rettungsnotruf.

## Nachweise

- `test_skeleton_movement.js`: 42 unabhängig vorgegebene bewertete Antwortwege, Abschnittszuordnung und Revision; Erhalt der 18 Kartentexte; neun Modellantworten, unabhängige Winkel-/Längenprüfung, offene Auswahl, Änderungen, Neustart/Fokus/Wiederinitialisierung und unveränderte Speicherung bestanden. Tatsächliche Papiererzeugung mit sechs Abschnitten, 31 Glossareinträgen, Protokoll, statischer Zeichnung und getrennten Lösungen geprüft. Ein fehlerhaftes Option-Tag wurde durch den ersten Test gefunden und vor den erfolgreichen Läufen korrigiert.
- 95 STEM-Arbeitsblätter nach der letzten Textänderung erneut bestanden.
- `browser_skeleton_movement.js`: abschließender Bericht `../browser-qa/skeleton-movement/report.json`, 2026-09-16T09:03:26.246Z, Chromium 151.0.7922.34. 45 native Übungsantworten, neun Vorhersagen per Tastatur, 18 Zustände aus drei Modellen × drei Breiten (320/390/1280 px) × zwei Designs, Protokollzugang sowie zwei 93-Prozent-Kapitelchecks mit genauer Wiederholung bestanden. Keine Seitenfehler. Der erste Browserlauf verwendete im Test einen falschen Selektor für die Lösungsauswahl; der korrigierte Test nutzt die vorhandene Checkbox.
- Mobile Ansichten von Halten und Absenken in hellem/dunklem Design gelesen. Nach der letzten Textänderung A4-Ausgabe erneut erzeugt; Seiten 2, 5, 9, 10, 11, 15 und 24 der 24-seitigen Fassung mit Lösungen tatsächlich gerendert und gelesen. Keine Sichtprüfung sämtlicher Druckseiten.

## Grenzen

Keine reale Muskelmessung oder Unterrichtserprobung. Bestehende externe Bilder und deren Lizenzangaben bleiben Teil der offenen Medienprüfung. Die Aufgaben bieten konkrete Lerngelegenheiten, beweisen aber keine vollständige W/E/S-Zuordnung oder Gesamtlehrplanabnahme. Weitere Kapitel, andere priorisierte Fächer und die übrigen vorhandenen Fächer bleiben im Gesamtauftrag. Übersetzungen zurückgestellt; neue Skelettänderungen noch lokal.


## Vollständiger Funktionstest nach der Skelettarbeit

Alle 187/187 Funktionstestsuiten bestanden; Bericht 2026-09-16T09:06:02.513Z in ../functional-test-report.json. Der Lauf umfasst auch die aktuellen Selektions- und Skelettänderungen. Während des Laufs wurden noch die freiwillige Modell-/Körperbeobachtung und ein Papierverweis präzisiert; die betroffenen Skelett- und 95 STEM-Arbeitsblattprüfungen liefen danach zusätzlich erfolgreich, die abschließende native Prüfung und Druckkontrolle erfolgten ebenfalls nach diesen Änderungen. Die vollständige fachliche, visuelle und Lehrplanabnahme folgt daraus nicht. Neue Skelettarbeit bleibt lokal nach c428cf6.
