# Vom Kapitelcheck zur passenden Erklärung

Aktualisierung zum angeforderten GitHub-Zwischenstand: [Physik-Wiederholungswege und Statik](PHYSIK_WIEDERHOLUNG_STATIK.md) dokumentiert die Erweiterung auf alle 406 Physikfragen und die Statiküberarbeitung. Die nachfolgenden Zahlen beschreiben den früheren Meilenstein mit 28 neuen Zuordnungen; aktuell fehlen noch 133 Abschnittsziele in Mathematik, Chemie und Biologie.

Stand: 23.09.2026, lokale Weiterarbeit nach dem bestätigten GitHub-Zwischenstand `0ddcb5e`. Der vorherige Zielturn war Fortschritt: Der angeforderte Zwischenstand wurde gepusht und mit dem Remote verglichen.

## Änderung und fachliche Zuordnung

Fragen innerhalb eines Abschnitts waren bereits mit diesem verknüpft. Ältere Abschlussfragen außerhalb der Abschnitte hatten dagegen keinen konkreten Wiederholungsweg. `reviewSectionId` ordnet eine solche Frage ausdrücklich einem bestehenden Abschnitt zu. Die Auflösung verwendet die Abschnitts-ID statt einer festen Position und bleibt dadurch bei einer Umordnung korrekt. Fehlende, doppelte oder ungültige IDs sowie Verweise auf Vertiefungs-/reine Übungsabschnitte werden nicht geraten. Ohne Zuordnung bleibt der bisherige Hinweis auf die Zusammenfassung erhalten.

Nach Lektüre der Fragen und ihrer erklärenden Abschnitte sind 28 Abschlussfragen zugeordnet:

| Kapitel | Neue Zuordnungen | Inhaltliche Ziele |
| --- | ---: | --- |
| Wärmelehre | 15 | Temperatur/Teilchenbewegung, Leitung/Dämmung, Strahlung, Auftrieb, Zustandsänderung, Ausdehnung |
| Wetter | 5 | Geschwindigkeit und Feuchte, Blitz/Donner, Hochdruck mit Nebel, Meeresströmungen |
| Klima | 4 | Treibhauseffekt, Klimafaktoren und natürliche Archive |
| Klimawandel | 4 | Klima/Erwärmung sowie Klimaschutz und Anpassung |

Alle 105 bewerteten Fragen der sechs Kapitel der 4. Klasse besitzen damit ein konkretes Abschnittsziel. Die beiden anderen Kapitel, Strahlung und Energieversorgung, hatten bereits ausschließlich abschnittsgebundene Fragen. Die Frage-IDs, Antwortoptionen, Lösungen, Reihenfolge und Ergebnisrevisionen ändern sich durch diese Verknüpfung nicht. Im Wettertext ergänzen zwei kurze Erklärungen die Bedingungen einer Geschwindigkeitsangabe und die unterschiedlichen Laufzeiten von Licht und Schall; beide erscheinen auch auf dem Arbeitsblatt.

Ein Wiederholungsbutton schließt den Check, zeigt die Lerntexte und fokussiert die Überschrift des Zielabschnitts. Die gespeicherten Wiederholungslinks verwenden denselben Ablauf. Thema, Modus und ausdrückliche Stoffliste bleiben erhalten; bloßes Navigieren verändert den Lernstand nicht. Mit Strg oder anderen Zusatztasten bleiben gewöhnliche Linkaktionen möglich.

## Nachweise

`test_quiz_review_sections.js` prüft alle 105 Fragen, die 28 expliziten Zuordnungen nach Umordnung, Auswertung und wieder geladene Fehlerlisten, Tastaturfokus, unveränderte Ergebnisse/Stofflisten, ungültige Verweise und den Ablauf bei gesperrtem lokalen Speicher. Acht bestehende Suiten zu Wiederholung, Abschnittslinks, vollständigen Checks, Ergebnisrevisionen, Sprachrückfall, Physik-Arbeitsblättern und Wetter bestanden zusätzlich.

Die native Browserprüfung bestand mit Chromium 151.0.7922.34 am 23.09.2026 um 19:04:37 UTC: 245 Wege aus einer Auswertung und 105 Wege aus erneut geladenen Wiederholungslisten per Tastatur. Alle sechs Kapitel wurden bei 320, 390 und 1280 Pixeln in heller und dunkler Darstellung geprüft (36 Kombinationen); alle 28 neuen Zuordnungen in jeder dieser sechs Ansichten. Keine Browserfehler, keine veränderten Ergebnisse oder verlorenen Stofflisten. Dabei entdeckter horizontaler Überlauf im Strahlungsquiz wurde durch begrenzte Mindestbreite und Wortumbruch der Fragekarten behoben. Die betroffene Frage passt jetzt in 320 Pixel; anschließend visuell gelesen.

Visuell gelesen: mobile Wetterauswertung und zugehörige Erklärung, gespeicherter Desktop-Wiederholungslink sowie beide ergänzten Wettertexte im Druck (Seiten 1 und 5 der 15-seitigen A4-Prüffassung). Dies ist keine neue vollständige Prüfung aller unveränderten Druckseiten. Artefakte und Browserbericht: `../browser-qa/quiz-review-sections/`.

Der gemeinsame Render-Audit lädt 198 von 198 Kapiteln, ohne fehlende Lernhilfen oder erfasste Befunde. Seine alte Regel zählte zusätzlich eingeführte Vertiefungsziele/-zusammenfassungen bei den Grundstofflisten mit und meldete deshalb 14 falsche Zählbefunde in sieben Physikkapiteln. Die korrigierte Regel vergleicht Grundstoffziele, Grundstoffzusammenfassung, Vertiefungsziele und Vertiefungszusammenfassung jeweils getrennt und textgenau mit den Quelllisten. Der erneute Lauf bestand. Er führt weiterhin keine individuellen Kapitelskripte aus und belegt weder vollständige fachliche Qualität noch Darstellung im Browser.

## Vollständiger Funktionslauf und Nachtests

Der Gesamtlauf `node scripts/run_functional_tests.js` endete am 23.09.2026 um 19:15:01 UTC mit 282/285 bestandenen Suiten. Drei Befunde wurden anschließend behoben:

- `test_climate_english`: Die ältere englische Klimawandel-Fassung hat Quellenrevision 1, das deutsche Kapitel Revision 2. Der Test prüft nun zuerst den tatsächlichen Rückfall auf alle 17 aktuellen deutschen Fragen. Die bisherigen 39 englischen Antwortwege und dynamischen Zustände bleiben in einer ausdrücklich isolierten Revision-1-Testumgebung geprüft; die Übersetzung selbst wurde nicht verändert.
- `test_translated_title_search`: Der generierte Titelindex enthielt noch genau einen veralteten englischen Klimawandel-Eintrag. Er wurde mit dem bestehenden Generator entfernt. Die Laufzeit schloss ihn schon über die Revision aus; der gespeicherte Index stimmt jetzt ebenfalls mit der tatsächlichen Kapitelauswahl überein. Alle anderen Indexeinträge sind unverändert.
- `test_worksheets`: Der Test erwartete noch 24 Wärmefragen, obwohl das Kapitel bereits 29 besitzt. Jetzt werden 29 Fragen und exakt 87 Antwortoptionen geprüft. Die bisherigen Prüfungen von getrennten Lösungen, Druckfreigabe, Formelfehlern, Kunstmaterialien, Quellen und Ladefehlern bleiben erhalten.

Alle drei Nachtests und vier Begleitprüfungen (`test_learning_metadata_english`, `test_learning_entry_english`, `test_core_navigation_language`, `test_translation_revisions`) bestanden. Damit liegt für jede der 285 Suiten ein bestandener Nachweis vor; kein zweiter vollständiger 285er-Lauf wird behauptet. Der ursprüngliche Bericht bleibt unverändert unter `../functional-test-report.json`, die sieben Nachprüfungen sind mit Bezug auf diesen Lauf und Prüfsummen der Testdateien unter `../functional-review-followup.json` dokumentiert. Kein Testprozess bleibt aktiv.

## Weitere Lücken

Der neue [strukturelle Audit](QUIZ_REVIEW_AUDIT.json) verwendet die tatsächlichen Fragepools des Renderers, einschließlich Ausschluss von Vertiefungen, reinen Übungen und Duplikaten. Seine Zahlen unterscheiden sich deshalb vom Inventar aller gespeicherten Fragen.

| Fach | Mit Abschnittsziel / bewertete Fragen | Noch ohne spezifisches Ziel |
| --- | ---: | ---: |
| Physik | 325 / 406 | 81 |
| Mathematik | 527 / 590 | 63 |
| Chemie | 71 / 127 | 56 |
| Biologie | 422 / 436 | 14 |
| Digitale Grundbildung | 200 / 200 | 0 |

Kein vorhandener ausdrücklicher Verweis ist ungültig. Dieser Audit belegt die Auflösbarkeit, nicht die fachliche Eignung sämtlicher Zieltexte. Der nächste konkrete Schritt sind die 81 älteren Physikfragen ohne Abschnittsziel; sie verteilen sich auf Optik, Farben, Akustik, Kräfte, Energie, Arbeit und Statik. Die übrigen Fachlücken und die vollständige Produktabnahme bleiben offen. Übersetzungen sind weiterhin ausgesetzt.
