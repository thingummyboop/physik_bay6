# Blütenpflanzen: Vorgänge unterscheiden und selbst untersuchen

Stand 14.09.2026. Der vorherige Turn war Fortschritt: Zwischenstand `7c99011e3997796c4a261f45b335571a47f93556` wurde auf `main` gepusht und die Remote-SHA unabhängig abgeglichen. Die folgenden Änderungen entstanden danach lokal.

## Inhalt und Lerngelegenheiten

Das Kapitel `bio_1_bluetenpflanzen` bleibt in der 1. Klasse, mit fünf Abschnitten, elf bewerteten Fragen und einer zusätzlichen unbewerteten Übung. Alle zwölf Fragen samt Antwortalternativen wurden neu formuliert. Die sechs bisherigen Abschlussfragen stehen jetzt bei den zugehörigen Abschnitten; ihre IDs bleiben erhalten. Die Kapitelrevision steigt von 1 auf 2, damit ältere Ergebnisse nicht als Nachweis für den neuen Fragenpool gelten.

Die Fragen prüfen Organfunktionen, Merkmalsvergleich, Bestäubung versus Befruchtung, Fotosynthese, Keimung, Beobachtung versus Ergänzung und die Teile des Stempels. Die Alternativen greifen konkrete Verwechslungen auf. Das vorher missverständliche Zeichnen eines Pollenwegs bis zur Samenanlage wurde korrigiert: Der Pollenschlauch wächst, das ganze Pollenkorn wandert nicht durch den Griffel. Die Tabelle unterscheidet Narbe, Griffel und Fruchtknoten. Der Text erklärt Reservestoffe und unterscheidet den Beginn der Keimung von eigener Fotosynthese.

Die neue Darstellung besitzt vier wählbare Schritte: Orientierung, Bestäubung, Pollenschlauchwachstum und Verschmelzung mit der Eizelle. Ein eigenes SVG zeigt die Lage der Strukturen; Text erklärt den jeweiligen Zustand. Tastaturbedienung, Rücksetzen mit Fokus und mehrfache Benutzung sind möglich. Keine Punkte oder gespeicherten Quizresultate entstehen durch Betätigen des Modells. Vier Arbeitsaufträge verlangen Vorhersage, Vergleich, Unterscheidung sichtbarer Beobachtung und innerer Vorgänge sowie Zuordnung von Pflanzenkeim und Samen. Modellgrenzen einschließlich weggelassener Zellvorgänge sind benannt. Das Schema ist weder maßstabsgetreu noch ein zeitlicher Messverlauf und garantiert keinen Erfolg jeder Bestäubung.

Für die Papierfassung wird ein statisches Schema des dritten Schritts mit vier Erklärungen übernommen. Die Vergleichslösung ist getrennt zuschaltbar. Der erste Browserlauf deckte auf, dass der neue Modellbereich noch nicht als `interactive-zone` gekennzeichnet war und die Papieralternative dadurch nicht übernommen wurde. Das wurde im Kapitel korrigiert. Die Prüfung statischer Figuren berücksichtigt nun auch ausdrücklich verfasste Vorlagen in `template[data-worksheet-alternative]`.

Ein eigener Keimvergleich erweitert die praktische Untersuchung: zwei zufällig gebildete Gruppen mit je fünf Bohnensamen derselben Packung, feuchte beziehungsweise trockene Unterlage, gleich gehaltene sonstige Bedingungen, vorherige Vermutung und einheitliche Zählregel. Sieben leere Protokollzeilen nehmen echte Beobachtungen auf. Fehlende Einträge, unerwartete Ergebnisse und begrenzte Aussagekraft werden berücksichtigt. Der vorgeschaltete Feucht-/Trockenfall ist ausdrücklich ein erfundenes Beispiel. Ohne Durchführung bleibt die praktische Aufgabe ein Plan.

Im Hinblick auf die im Biologie-Abgleich dokumentierten Kompetenzbereiche bietet das Kapitel konkrete Lerngelegenheiten: Wissen zu Organen und Vorgängen; Erkenntnisgewinn durch Merkmalsvergleich, Modellkritik und kontrollierten Keimvergleich; begründetes Handeln durch schonende Untersuchung und transparente Kennzeichnung von Unsicherheit. Dies ist keine vollständige Zuordnung aller W/E/S-Deskriptoren und kein Nachweis tatsächlicher Schülerkompetenz.

## Verifikation und Grenzen

- `test_biology_evolution_assessment.js`: 105 bewertete Antwortwege in Evolution, Selektion und Blütenpflanzen mit unabhängig festgelegten richtigen Optionen, exakter Abschnittszuordnung, Rückmeldungen und Revisionsprüfung. Weiterhin Erhaltung von 30 verfassten Trainingskarten. Zusätzlich vier Pflanzen-Modellzustände, Zustandswechsel, erneute Initialisierung, Rücksetzen/Fokus und unveränderte Quizspeicherung; bestehende 121 Selektionsrechnungen weiterhin geprüft.
- `browser_flowering_plants.js`: alle 36 Übungsantworten mit nativer Tastatur und Rückmeldung; 24 Kombinationen aus vier Modellschritten, 320/390/1280 Pixeln und hellem/dunklem Design ohne Seitenüberlauf. Native Auswahl mit Home/Pfeiltaste/Ende, Rücksetzen und Fokus geprüft. Zwei 91-Prozent-Kapitelversuche mit jeweils einer gezielten Wiederholungsfrage führen korrekt in Abschnitt 3 beziehungsweise 4. Kapitelrevision 2. Abschließender Bericht: `2026-09-14T04:05:54.818Z`, Chromium `151.0.7922.34`, keine gemeldeten Seitenfehler.
- Papierprüfung: elf Fragen, 15 Trainingskarten, 25 Glossareinträge, vier Modellaufträge, vier Versuchsschritte, sieben Protokollzeilen, genau ein statisches Schema, keine Auswahlsteuerung im Material und getrennte Lösungen. A4-PDF mit 24 Seiten erzeugt. Mobile Modellansichten und ausgewählte Druckseiten tatsächlich visuell gelesen; nach der Druckkorrektur Seiten 8–9 und 12–15 erneut geprüft. Die Lösungsseite 24 wurde vor der letzten reinen Druck-/Textstraffung gelesen. Keine Behauptung einer Sichtprüfung sämtlicher Seiten.
- Aus der Sichtprüfung behoben: zu kleine Beschriftungen, doppelte Modellgrenzen in der Papierfassung und ein vom Erklärungstext getrenntes Glossar-Stichwort. Die gemeinsame Druckregel hält das Stichwort beim folgenden Absatz; ihre Wirkung wurde hier am Pflanzenkapitel geprüft.
- Alle 95 STEM-Arbeitsblattprüfungen, Physik-Kernmodelle, Kapitelnavigation und Titelindexprüfung bestanden. Die Titelindexprüfung prüft Konsistenz; Übersetzungen wurden nicht bearbeitet. Inventar weiterhin 197 Kapitel; struktureller Prioritätsaudit weiterhin 1539 Frageninstanzen ohne Befund.

Der letzte vollständige Funktionstest mit 184/184 Suiten stammt von `2026-09-14T03:21:02.945Z` und liegt vor diesen sowie den vorherigen Biologie-Änderungen. Die aktuelle Runde verwendet gezielte Prüfungen, keinen neuen Gesamtlauf. Naturbeobachtung, realer Keimversuch und Unterrichtserprobung wurden nicht durchgeführt. Die vorhandenen externen Abbildungen sind noch nicht insgesamt auf Darstellung, Quellenangaben und Lizenzen geprüft. Der vollständige Biologie-Abgleich aller 39 Kapitel sowie die übrigen Fach- und Produktabnahmen bleiben offen. Kein weiterer Push in dieser Runde; Gesamtauftrag aktiv.

## Fachlicher Abgleich

Primärquellen am 14.09.2026 geöffnet; Texte, Aufgaben und SVG sind eigenständig verfasst:

- [OpenStax Biology 2e: Pollination and Fertilization](https://openstax.org/books/biology-2e/pages/32-2-pollination-and-fertilization).
- [OpenStax Biology 2e: Reproductive Development and Structure](https://openstax.org/books/biology-2e/pages/32-1-reproductive-development-and-structure).
- [OpenStax Biology 2e: Overview of Photosynthesis](https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis).
- [OpenStax Biology 2e: Roots](https://openstax.org/books/biology-2e/pages/30-3-roots).


## Nachfolgender Gesamttest

Vollständiger Funktionstest vom 2026-09-14T04:26:34.223Z: 185/185 Suiten bestanden. Der Lauf erfolgte nach den lokalen Pflanzen- und Lebensraumänderungen; währenddessen wurden keine Produktdateien oder Tests geändert. Er ersetzt den früheren 184/184-Nachweis als aktuellen Funktionsstand. Er beweist keine vollständige fachliche, visuelle oder Lehrplanabnahme. Details der nachfolgenden Lebensraumrunde: [BIOLOGIE_LEBENSRAEUME.md](BIOLOGIE_LEBENSRAEUME.md).
