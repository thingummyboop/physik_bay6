# Funktionsprüfung 21.09.2026

Nach Ergänzung des Kreiskapitels wurde `node scripts/run_functional_tests.js` vollständig ausgeführt. Der Lauf erfasst sämtliche 232 vorhandenen `test_*.js`-Suiten. Bericht `../functional-test-report.json`, erstellt 13:33:52 UTC: 231 bestanden, ein Fehler in `test_translated_title_search.js`. Kein Prozess wurde wegen eines Beobachtungstimeouts neu gestartet.

## Ursache und Behebung

Der generierte `js/chapter-title-index.js` enthielt noch Metadaten älterer Mathematikfassungen, unter anderem `math3_4_flaechensatz` Revision 1. Die aktuelle deutsche Fassung hat eine neuere Revision. Der Renderer wählt in diesem Fall den deutschen Inhalt; die Suche filtert Metadaten ebenfalls nach Revision. Der Generatorvertrag verlangt zusätzlich, veraltete Einträge aus dem erzeugten Index zu entfernen.

`node scripts/build_chapter_title_index.js` hat den Index anhand der tatsächlichen Auswahlregeln neu erstellt. Die Sprachdateien wurden nicht verändert und keine neuen Übersetzungen angefertigt. Der fehlgeschlagene Test wurde unverändert erneut ausgeführt und besteht nun für alle Kapitel und fünf Sprachdateien, einschließlich richtiger Rückfallebene, Suchbarkeit, Richtungsangaben und Lehrstofflisten.

## Gezielte Nachprüfungen

Nach dem Index-Neuaufbau bestanden:

- `test_translated_title_search.js`
- `test_learning_search.js`
- `test_learning_metadata_english.js`
- `test_learning_flows.js`
- `test_translation_revisions.js`

Nach den abschließenden Kreis-Anpassungen außerdem `test_circle_parts.js` und `test_stem_worksheet_material.js` mit allen 96 betroffenen Arbeitsblättern. Der ursprüngliche Gesamtbericht bleibt unverändert mit seinem tatsächlich beobachteten Ergebnis erhalten; nach der Korrektur wurde kein zweiter vollständiger 232-Suiten-Lauf behauptet. Alle im Gesamtlauf beobachteten Fehler sind durch unveränderte betroffene Tests nachgeprüft und behoben.

Der separate gemeinsame Renderer-Audit meldet 198/198 geladene Kapitel, keine fehlenden Lernhilfen und keine Befunde in seinem begrenzten Umfang. Er führt weder alle individuellen Themenskripte noch externe Medien aus. Inhaltliche und visuelle Prüfungen einzelner Kapitel sind in den zugehörigen Fachberichten dokumentiert.

Ein bestandener Funktionslauf beweist weder vollständige Lehrplanabdeckung noch sachliche Richtigkeit jeder Aufgabe, praktische Unterrichtstauglichkeit, vollständige Zugänglichkeit oder korrekte Veröffentlichung. Der Gesamtauftrag bleibt offen. Änderungen seit `1367d26` sind lokal.
