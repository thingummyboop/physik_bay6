# Pubertät und Fortpflanzung: Sachwissen, Privatsphäre und Hilfe

Stand 16.09.2026, Kapitel `bio_1_pubertaet_fortpflanzung`, 1. Klasse Mittelschule, Revision 2. Lokale Weiterarbeit nach dem auf GitHub gesicherten Zwischenstand `e5b4748`.

## Inhalt und Unterricht

Die fünf Abschnitte und 25 Glossareinträge wurden geprüft. 15 konkrete Aufträge ersetzen allgemeine Trainingskarten. Körperliche Entwicklung, Gefühle und soziale Veränderungen werden anhand erfundener Beobachtungen besprochen; persönliche Mitteilungen und Körperbeobachtungen werden nicht verlangt. Der missverständliche Satz „Du darfst private Fragen nicht beantworten“ lautet nun „Du darfst die Antwort auf private Fragen ablehnen“.

Die bisherige Reihenfolgeaufgabe vermischte Ei- und Samenzelle, Befruchtung und Gebärmutter. Neue Aufgaben unterscheiden Zellen, Vorgänge und Organe. Das vorhandene Verlaufsschema verbindet beide Geschlechtszellen mit Befruchtung, weiteren Teilungen und möglicher Einnistung. Ergänzte Erklärungen unterscheiden Eisprung, Befruchtung und Einnistung; eine Schwangerschaft ist kein garantiertes Ergebnis des Schemas. Die externe Hormonabbildung mit lediglich pauschaler Lizenzangabe wurde entfernt.

Ein vierteiliges Zyklusschema ersetzt die zuvor fehlende Grundlage der Schemaaufgabe. Es enthält keine festen Tageszahlen oder persönlichen Vorhersagen und benennt Überlappungen, unterschiedliche Verläufe und seine Grenze gegenüber Verhütung. Zwei ausdrücklich erfundene Quellenkarten unterstützen das Prüfen von Urheberschaft, Belegen, Aktualität und Verkaufsabsichten. Beschwerden werden nicht im Quiz diagnostiziert.

Vier interaktive Fälle behandeln private Unterrichtsfragen, Weitergabe eines Fotos, Schweigen bei abwertenden Bemerkungen und weitere Unterstützung nach einer erfolglosen Bitte um Hilfe. Jede der zwölf Handlungen erhält eine eigene Begründung. Native Auswahl und Schaltflächen, Statusmeldung, Neustart und Fokus sind vorhanden; keine Zeitmessung, Punkte oder Speicherung dieser Übung. Die Verantwortung für Grenzverletzungen wird nicht auf betroffene Kinder verschoben. Die Aufgaben verlangen kein Rollenspiel oder Erzählen eigener Erlebnisse.

Alle elf bisherigen bewerteten Fragen und die Zusatzübung überarbeitet; sechs Abschlussfragen den tatsächlichen Lernabschnitten zugeordnet. Zwei zusätzliche Fragen unterscheiden Organe von Zellen und Unterstützung von öffentlichem Weitererzählen. Insgesamt 13 bewertete Fragen und eine unbewertete Übung. Revision 2 kennzeichnet frühere Kapiteltestergebnisse als veraltet.

## Quellenprüfung

Am 16.09.2026 die einschlägigen Primärquellenabschnitte geöffnet und gelesen:

- [Österreichisches Gesundheitsportal: Die erste Regelblutung](https://www.gesundheit.gv.at/leben/frauengesundheit/erste-regelblutung.html): Vorgänge, Zykluszählung, Schwankungen, mögliche Zyklen ohne Eisprung und Abklärung stärkerer Beschwerden. Die Seite nennt 03.05.2024 als letzte Aktualisierung.
- [Österreichisches Gesundheitsportal: Eine Schwangerschaft beginnt](https://www.gesundheit.gv.at/leben/eltern/schwangerschaft/info/beginn-schwangerschaft.html): Unterschied zwischen Befruchtung, Teilungen und Einnistung. Letzte Aktualisierung laut Seite 11.05.2020; keine konkrete Behandlungsanleitung oder persönliche Fruchtbarkeitsberechnung daraus abgeleitet.
- [Österreichisches Gesundheitsportal: Verhütungsmethode finden](https://www.gesundheit.gv.at/leben/sexualitaet/verhuetung/verhuetungsmethode-finden.html): Abschnitt über Information und Beratung für Jugendliche, Grenzen zeitlicher Vorhersagen. Keine konkrete Methode im Kapitel neu empfohlen.
- [Rat auf Draht](https://www.rataufdraht.at/): bestehende Angabe zur österreichischen Telefonnummer 147, Erreichbarkeit rund um die Uhr und kostenloser anonymer Beratung bestätigt. Chatzeiten werden im Kapitel nicht pauschal mit der Telefonerreichbarkeit gleichgesetzt.

## Funktions- und Browserprüfung

`test_puberty_boundaries.js` bestanden: 39 unabhängig vorgegebene bewertete Antwortwege, Abschnittszuordnung und Revision, Erhalt aller 15 Aufgabentexte im tatsächlichen Renderer, zwölf unterschiedliche Entscheidungsbegründungen, Fallwechsel, Neustart, Fokus, Wiederinitialisierung und unveränderter Speicher. Papiererzeugung mit fünf Abschnitten, 25 Glossareinträgen, vier Fällen, zwölf Handlungsoptionen, vier Protokollzeilen und zwei getrennten Lösungsblöcken geprüft.

Native Prüfung `browser_puberty_boundaries.js`, Bericht `../browser-qa/puberty-boundaries/report.json`, abschließend 2026-09-16T09:44:00.604Z, Chromium 151.0.7922.34: 42 Quizantworten und zwölf Fallentscheidungen per Tastatur, 24 Zustände aus vier Fällen × drei Breiten (320/390/1280 px) × zwei Designs, Neustart/Fokus/Speicher, Protokollzugang und zwei 92-Prozent-Kapitelchecks mit zutreffender Wiederholung bestanden. Keine Seitenfehler.

Mobile Ansichten der Foto-/Hilfefälle und des Zyklusschemas tatsächlich gelesen. Die abschließende A4-Ausgabe mit Lösungen hat 24 Seiten; nach der letzten Textänderung Seiten 4, 7, 8, 9, 11 und 24 gerendert und gelesen. Dabei sind Falltexte, Protokoll, fachliche Erklärung, Zyklusschema und getrennte Lösungen lesbar. Die Aufgabenformulierung verweist sowohl auf Bildschirmrückmeldungen als auch auf den Papierlösungsteil. Keine Sichtprüfung aller Druckseiten.

95 STEM-Arbeitsblätter, Skelett, Ernährung/Verdauung, Physik-Kernmodelle und gemeinsamer Lern-/Stofflistenweg gezielt bestanden. Syntax und `git diff --check` bestanden. Der letzte vollständige Lauf mit 187/187 Suiten liegt vor Ernährungs- und Pubertätsänderungen; kein neuer Gesamtlauf in dieser Runde.

## Verbleibend

Keine Unterrichtserprobung oder individuelle medizinische Bewertung. Vollständige fachliche, visuelle, Medien-, W/E/S- und Lehrplanabnahme der Webseite bleibt offen. Übersetzungen sind zurückgestellt; Physik, Mathematik, Chemie, Biologie und DGB behalten Vorrang. Diese Pubertätsänderungen sind lokal und noch nicht auf GitHub gesichert.
