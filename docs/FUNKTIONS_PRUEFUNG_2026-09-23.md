# Funktionsprüfung 23.09.2026

Zeitliche Einordnung zum anschließend angeforderten GitHub-Zwischenstand: Dieser Bericht hält den Lauf um 11:09 UTC fest. Die danach ergänzte [Orientierung der 2. Klasse](DGB_WERKZEUGWAHL_KLASSE2.md) wurde gezielt geprüft und fügt eine weitere Suite hinzu; sie gehört nicht zum unten dokumentierten vollständigen 260-Suiten-Lauf. Angaben zum lokalen Stand und unveränderten Dateien beziehen sich auf den damaligen Abschluss dieses Laufs.

Nach der Neuordnung von DGB-Produktion der 3. Klasse wurde `node scripts/run_functional_tests.js` vollständig ausgeführt: **260 von 260 vorhandenen `test_*.js`-Suiten bestanden**, keine Fehler oder Zeitüberschreitungen. Der Bericht `../functional-test-report.json` wurde um **11:09:08 UTC** erstellt. Die summierte Laufzeit beträgt 626 Sekunden. Der geprüfte Arbeitsstand liegt nach dem GitHub-Zwischenstand `624b1e5`; diese Weiterarbeit ist noch lokal.

Der Runner sucht sämtliche passenden Testdateien im aktuellen Verzeichnis, führt jede in einem eigenen Node-Prozess aus und bewahrt Ausgabe, Rückgabewert und Dauer auf. Ein bestandener Lauf bedeutet daher nicht nur, dass ausgewählte neu hinzugekommene Tests grün waren. Seit Beginn dieses Laufs wurden keine Produktionsdateien oder Funktionstests verändert; abschließende Ergänzungen betreffen Browser-Screenshots und Dokumentation.

Die Prüfungen umfassen unter anderem Kapitelquiz-Auswertung und Wiederholung, Speicherung einschließlich Fehlerfällen, Lernzugang, Stofflisten und Teilen, Kapitelmaterialien, Arbeitsblätter sowie die jeweiligen fachbezogenen Rechen- und Interaktionsverträge. Vorhandene Sprachprüfungen sind mitgelaufen, ohne Übersetzungen zu bearbeiten.

## Zusätzliche gezielte Nachweise

- DGB-Produktion: 27 Materialprogramm-Fälle und alle 39 bewerteten Antwortwege des unveränderten 13-Fragen-Pools; neue Abschnittszuordnung und Reserveauftrag mit getrennten Lösungen.
- Separater nativer Browserlauf: neun freie Antworten, sechs Breiten-/Designzustände, zwei vollständige Kapitelversuche und Wiederholung bei den neu zugeordneten Fragen. Text-/Überschriftenkontrast der drei geprüften Karten mindestens 4,5:1. Bericht vom 23.09.2026, 10:59:44 UTC, Chromium 151.0.7922.34.
- Sämtliche 27 Lösungsdruckseiten des Produktionskapitels gelesen; Kartentitel-Umbruch korrigiert, geänderte Seiten erneut gesichtet, letzte Ausgabe durch Seitenbildvergleich bestätigt.
- Aktueller Inventarlauf: 198 Kapitel. Prioritätsaudit: 1.952 Frageninstanzen ohne strukturellen Befund. Der [Drittklass-Abgleich](DGB_KLASSE3_ABGLEICH.md) dokumentiert Inhalt, Lehrplanzuordnung und Grenzen.

## Prüfgrenze

Der Funktionslauf enthält keine automatische Sichtprüfung sämtlicher Webseiten, keine vollständige Prüfung aller externen Medien und keine Unterrichtserprobung an Schulgeräten. Browserprüfungen sind separate Skripte. Die 260 bestandenen Suiten belegen ihre jeweiligen Verträge; sie beweisen keine vollständige fachliche Richtigkeit, Lehrplanabdeckung aller Fächer, Barrierefreiheit oder Veröffentlichung. Der Gesamtauftrag bleibt offen. Nach diesem Lauf wurde nicht erneut auf GitHub gepusht.
