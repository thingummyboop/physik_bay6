# Funktionsprüfung 23.09.2026

Aktualisierung nach `3a58ad6`: 271 Testsuiten vorhanden. [Handeln der 1. Klasse](DGB_HANDELN_KLASSE1.md) einschließlich vier Problemfällen, sämtlichen Antwortwegen, bewahrten Aufgaben und Druckausgabe gezielt geprüft. Der [Erstklassabgleich](DGB_KLASSE1_ABGLEICH.md) beschreibt die Zuordnung aller 24 Anforderungen. Kein neuer vollständiger 271-Suiten-Lauf; der folgende Gesamtbericht beschreibt weiterhin seinen damaligen Prüfstand.

Aktualisierung nach `3a58ad6`: 270 Testsuiten vorhanden. [Produktion der 1. Klasse](DGB_PRODUKTION_KLASSE1.md) einschließlich Medienvergleich, Schleife, Umfrage, Antworten und Druckausgabe gezielt geprüft; Druckbreitenfehler behoben und nativ nachgemessen. Kein neuer vollständiger 270-Suiten-Lauf. Der folgende Gesamtbericht beschreibt weiterhin den damaligen vollständigen Lauf, nicht automatisch spätere Änderungen.

Zeitliche Einordnung: Die nach dem folgenden 266-Suiten-Lauf ergänzte [Orientierung der 1. Klasse](DGB_ORIENTIERUNG_KLASSE1.md) wurde gezielt geprüft. Mit den anschließend ergänzten Kapiteln [Information](DGB_INFORMATION_KLASSE1.md) und [Kommunikation](DGB_KOMMUNIKATION_KLASSE1.md) enthält die Sammlung jetzt 269 Suiten. Alle drei Kapitel wurden gezielt geprüft; ein neuer vollständiger 269-Suiten-Lauf wird hier nicht behauptet. Der unten beschriebene unveränderte Codezustand gilt für den damaligen Laufabschluss.

## Aktueller Lauf nach 4d50180

Erneuter vollständiger Lauf abgeschlossen am **2026-09-23T13:12:54.784Z**: **266/266 Funktionstestsuiten bestanden**, keine Fehler oder Zeitüberschreitungen; summierte Laufzeit 636 Sekunden. `node scripts/run_functional_tests.js` erfasste alle vorhandenen `test_*.js`-Dateien, darunter nun auch `test_communication_media.js`, `test_points_workshop.js` und `test_signal_workshop.js`. Der maschinenlesbare Bericht liegt in `../functional-test-report.json`.

Der geprüfte Produktions- und Testcode entspricht dem gesicherten GitHub-Stand `4d50180`. Während des Laufs wurden keine Lerninhalte, Laufzeitdateien oder Funktionstests verändert. Nacharbeiten betreffen Berichte und Inventar. Übersetzungen wurden nicht bearbeitet; vorhandene Sprachprüfungen sind als Teil der Gesamtsammlung mitgelaufen.

Zusätzliche, getrennte Evidenz: [Produktion der 2. Klasse](DGB_PRODUKTION_KLASSE2.md) mit 36 nativen Antwortwegen, vier echten Downloads, drei offline erneut geöffneten HTML-Dateien, geprüfter Tonwiedergabe und sämtlichen 20 endgültigen Druckseiten. Der [Zweitklass-Abgleich](DGB_KLASSE2_ABGLEICH.md) ordnet 32 Lehrplanpunkte konkreten Tätigkeiten zu. Inventar: 198 Kapitel; Prioritätsaudit: 1.980 Frageninstanzen, darunter 238 in DGB, ohne Strukturfehler.

**Prüfgrenze:** Die erneute manuelle [Erstklass-Sichtung](DGB_KLASSE1_ARBEITSBEFUNDE.md) fand trotz bestandener Funktionstests fachliche und didaktische Nacharbeiten, insbesondere eine widersprüchliche Analog-/Digitalrückmeldung und schwache Antwortalternativen. Der Gesamtlauf ist ausdrücklich keine fachliche Gesamtabnahme. Der Gesamtauftrag bleibt offen; die neuen Nachweise sind lokal und wurden nicht erneut gepusht.

## Historischer Lauf um 12:11 UTC

Erneuter vollständiger Lauf abgeschlossen am **2026-09-23T12:11:09.822Z**: **263/263 Funktionstestsuiten bestanden**, ohne Fehler oder Zeitüberschreitungen. Dieser Lauf enthält auch Orientierung, Handeln sowie die neuen Bits-/Dateiwerkstätten der 2. Klasse. Seit Beginn des Laufs wurden keine Produktionsdateien oder Funktionstests verändert; die abschließenden Änderungen betreffen Dokumentation. Die summierte Laufzeit der Suiten beträgt 627 Sekunden.

Der Arbeitsstand wird auf ausdrücklichen Nutzerwunsch als GitHub-Zwischenstand gesichert. Gezielte Browsernachweise und verbleibende Drucksichtprüfung stehen im [Dateien-Bericht](DGB_DATEIEN_BITS_INTERNET_KLASSE2.md) und im [Handeln-Bericht](DGB_ARBEITSPLATZ_BETEILIGUNG_KLASSE2.md). Der Gesamtauftrag bleibt offen; bestandene Funktionstests sind keine vollständige fachliche oder visuelle Abnahme. Übersetzungen wurden nicht bearbeitet.

## Historischer Lauf um 11:09 UTC

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
