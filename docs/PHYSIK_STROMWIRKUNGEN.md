# Elektrizität: Stromwirkungen und überarbeitete Fragen

Stand: 23.09.2026. Deutsche Fassung für die dritte Klasse Mittelschule, lokale Weiterarbeit nach `f601fda`. Der im selben Arbeitsstand zuvor ergänzte Datenvergleich ist in [PHYSIK_STROM_MESSDATEN.md](PHYSIK_STROM_MESSDATEN.md) dokumentiert; dessen Revision 5 ist ein historischer Zwischenstand. Aktuell gilt Revision 6.

## Ausgangspunkt und Inhalt

Die Abschnitte zu Ladung, Strom, Stromkreis, Batterie, Ohm-Modell, Kondensator sowie alle bisherigen 24 Fragen wurden gelesen. Wärmewirkung und Energieumwandlung kamen vor; ein zusammenhängender Vergleich der Stromwirkungen fehlte. Der letzte Abschnitt wiederholte überwiegend die schon vorhandene Regleraufgabe. Mehrere alte Fragen besaßen nur zwei Optionen oder wenig plausible Fehlantworten, etwa die Umwandlung von Elektronen in Protonen.

Der achte Abschnitt `sec6` enthält nun:

- Einordnung von Erwärmung, Leuchten, magnetischer Wirkung und chemischer Veränderung; mehrere Wirkungen können gemeinsam auftreten. Erwünschte Wirkung und zusätzliche Erwärmung werden am Heizgerät und an der Leselampe unterschieden. Beobachtung, Ursache und Energieübertragung bleiben getrennt.
- Sechs ausdrücklich erfundene Fallbeschreibungen: Heizbauteil, Glühlampe, LED ohne Temperaturdaten, Spule/Kompass, bestätigter Metallbelag mit Vergleich ohne Strom, abgesteckte Lampe in der Sonne.
- Eine Mehrfachauswahl mit begründeter Rückmeldung zu fehlenden und nicht gestützten Aussagen. „Nicht untersucht“ bedeutet nicht „tritt nicht auf“. Die Werkstatt behauptet keine durchgeführten Versuche und verändert keine gespeicherten Kapitelnoten.
- Sechs entsprechende Papierfälle mit getrennten Vergleichslösungen. Vier Schritte zum Planen, Durchführen und Auswerten eines von der Lehrkraft vorbereiteten Lampen-/Spulenvergleichs, zwei Durchgänge aus/an/aus, passende Beobachtungsgeräte und leeres Protokoll. Chemischer Fall ausschließlich als Leseaufgabe.
- Verbindungen zu Elektromagnetismus, Energie und chemischer Elektronenübertragung.

Vier neue Fragen prüfen mehrere Wirkungen, fehlende Temperaturdaten, kontrollierte Vergleiche und nicht elektrische Erwärmung. Elf alte Fragen wurden fachlich/sprachlich präzisiert und mit plausiblen, individuell erläuterten Fehlantworten versehen. Die Ohm-Frage prüft nun gleichzeitiges Verdoppeln von U und R; die erhaltene Transferfrage dagegen das Verdoppeln von U bei festem R. Damit werden nicht zweimal dieselben Zahlen mit derselben Änderung abgefragt. Insgesamt 28 Fragen mit je drei Antworten; alle IDs erhalten, vier neue IDs hinzugefügt. Lernziele und Zusammenfassung ergänzt.

Reihenfolge: Elektronik im Alltag → Stromwirkungen → Kondensator als ausdrücklich bezeichnete Vertiefung. Damit unterbricht die Vertiefung nicht länger den Kernweg. Abschnitts- und Wiederholungszuordnung entsprechend geprüft. Der Kondensator bleibt Teil des vorhandenen Kapitelchecks; eine allgemeine Trennung von Kern-/Vertiefungsprüfungen ist damit nicht umgesetzt.

## Fachliche Grundlage

Der gespeicherte, zuletzt am 14.09.2026 abgeglichene RIS-Text fordert im Bereich Elektrizität und Magnetismus Experimente zu elektrischen Grundgrößen und Stromwirkungen sowie das Diskutieren von Modellen und Versuchsdaten. Diese Ergänzung ist darauf ausgerichtet, belegt aber keinen erneuten vollständigen oder aktuellen Rechtsabgleich.

Am 23.09.2026 gelesen:

- [LEIFIphysik/FWU: Wirkungen des elektrischen Stroms](https://www.leifiphysik.de/elektrizitaetslehre/stromwirkungen/grundwissen/wirkungen-des-elektrischen-stroms): vier Wirkungsbereiche und deren gemeinsames Auftreten.
- [LEIFIphysik/FWU: Chemische Wirkung](https://www.leifiphysik.de/elektrizitaetslehre/stromwirkungen/grundwissen/chemische-wirkung-des-elektrischen-stroms): Elektrodenreaktion, Metallabscheidung und Galvanisieren. Keine Chemikalienanleitung aus dieser Quelle übernommen.
- [ENERGY STAR: Learn About LED Lighting](https://www.energystar.gov/products/learn-about-led-lighting): Lichtentstehung und Wärmeabgabe einer LED, Unterschied zum Glühfaden. Keine Effizienzprozente oder Kaufempfehlungen übernommen.

Alle sechs Falltexte und ihre Auswertung sind eigene didaktische Beispiele.

## Nachweise

- `test_electric_effects.js`: alle 192 Kombinationen aus sechs Fällen und 32 Auswahlmengen; unabhängige Schlüssel, richtige/falsche/fehlende Auswahl, genau eine sichtbare Fallkarte, Reset, Fokus, Wiederinitialisierung und unveränderter Speicher. Alle 84 Kapitelantwortwege anhand des separat festgelegten Schlüssels in `fixtures/electricity_answer_keys.json`, Rückmeldungen, Revisionsmigration und neue Abschnittszuordnung bestanden.
- `test_electricity_concepts.js`, `test_electric_measurement.js`, `test_physics_worksheets.js`, `test_physics_guides.js`: vorhandene Lampen-, Stromkreis- und Datenmodelle sowie Lernhilfen/Arbeitsblätter in den jeweiligen Prüfumfängen weiter bestanden. Erwartungen an Fragenzahl, Revision und Reihenfolge nachgeführt.
- `browser_electric_effects.js`: Chromium 151; 36 Layoutzustände (sechs Fälle, drei Breiten 320/390/1280 px, zwei Farbdarstellungen), 108 Entscheidungen, 84 freie Übungsantwortwege und 84 native Kapitelantwortwege. Tastatur einschließlich Leertaste für Auswahl/Reset, Fokus, Rückmeldung, Speicher und Papierübernahme bestanden. Keine gemessenen Seitenüberläufe, neue Bedienflächen mindestens 44 px hoch. Mobile Glühlampen-/LED-Ansichten und Desktop-Metallfall visuell gelesen.
- Interner Bericht `../browser-qa/electric-effects/report.json`. Interner A4-Ausdruck mit Lösungen umfasst 40 Seiten; für diese Änderung Seiten 13, 15–23, 25–26 und 30–40 visuell gelesen. Seite 19 enthält die unveränderte zufällige Rechenaufgabengruppe. Nach der letzten Ohm-Präzisierung die geänderten Frage-/Lösungsseiten 26 und 36–40 erneut geprüft. Kein neuer Gesamtnachweis aller 40 Druckseiten.
- Inventar und struktureller Audit aktualisiert: 198 Kapitel, 1921 Fragen in den priorisierten Fächern, davon 454 Physik; keine erfassten Strukturfehler. Der Audit ersetzt keine fachliche Einzelprüfung.

## Weitere Arbeit

Die gedruckten zufälligen Ohm-Rechenaufgaben besitzen im aktuellen Generator noch keine separat erzeugten Vergleichslösungen. Die nächste Prüfung sollte diese tatsächliche Lücke bearbeiten und die Zahlen ausdrücklich als Modellaufgaben einordnen. Die vorhandenen gesamten Kapitelbilder und der vollständige W/E/S-Abgleich aller Physikkapitel sind ebenfalls nicht durch diese Teilprüfung abgenommen. Keine reale Unterrichtserprobung, neue Übersetzung oder Veröffentlichung. Gesamtauftrag bleibt offen.


Nachtrag 23.09.2026: Die oben benannte Lücke bei den erzeugten Ohm-Rechenaufgaben ist anschließend geschlossen worden. Zehn Aufgaben mit Umrechnung, Rechenweg, Probe und getrennten Lösungen geprüft; siehe [PHYSIK_OHM_PAPIERAUFGABEN.md](PHYSIK_OHM_PAPIERAUFGABEN.md). Die übrigen offenen Umfänge bleiben bestehen.
