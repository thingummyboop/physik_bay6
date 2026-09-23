# Elektrizität: Modell und Daten vergleichen

Stand: 23.09.2026. Deutsche Fassung, dritte Klasse Mittelschule. Lokale Weiterarbeit nach dem angeforderten und verifizierten GitHub-Zwischenstand `f601fda`. Keine Veröffentlichung dieser Ergänzung.

## Belegter Ausgangspunkt und Änderung

Der vorhandene Ohm-Rechner und die drei kontrollierten Modellfälle erklärten konstantes R. Sie boten noch keine auswertbare Reihe mit Abweichungen und keinen eigenen Strom-Spannungs-Messauftrag. Der qualitative Reihen-/Parallellampenversuch bleibt erhalten.

In `elektrizitaet/sec5` ergänzt:

- Zwei ausdrücklich erfundene Übungsreihen mit je vier Wertepaaren. Reihe A: 1/2/3/4 V und 20/41/59/80 mA. Reihe B: dieselben Spannungen und 20/30/40/50 mA. Das Vergleichsmodell mit 50 Ω liefert 20/40/60/80 mA.
- Schrittweises Aufdecken, SVG mit Modellgerade und einzelnen Datenpunkten, gleichwertige beschriftete Tabelle und drei begründete Entscheidungen. Ein einzelner passender Punkt reicht nicht zur Prüfung über mehrere Spannungen. Eine vereinbarte Spanne von 2 mA ist nur eine Aufgabenregel, keine Gerätegenauigkeit. Daten allein identifizieren keine Glühlampe.
- Papieralternative mit vier Auswertungsaufträgen und getrennt zuschaltbarer Vergleichslösung. Diese Alternative liegt als Template direkt im interaktiven Bereich; sie wird nur für das Arbeitsblatt übernommen und verdoppelt nicht den Bildschirmtext.
- Sechs Arbeitsschritte für einen von der Lehrkraft vorbereiteten Kleinspannungsversuch, Gerätegrenzen, Strom-/Spannungsmesseranordnung, drei Einstellungen je Bauteil, Wiederholung der ersten Einstellung, acht leere Protokollzeilen, Messunsicherheit und Modellgrenzen. Ohne Geräte bleiben die eigenen Beobachtungen leer. Die Übungszahlen sind keine Einstellvorgaben.
- Vier neue Verständnisfragen mit verteilten Lösungsschlüsseln 1/2/0/1, individuellen Rückmeldungen und Lernstandsrevision 5. Insgesamt 24 bewertete Kapitelfragen. Bestehende Abschnittsreihenfolge und Frage-IDs erhalten; Lernziele und Zusammenfassung ergänzt.

Die Erwärmung des Metallfadens und die dadurch nicht proportionale Kennlinie wurden am 23.09.2026 mit dem [IBE der Freien Universität Berlin](https://tetfolio.fu-berlin.de/web/1302465) abgeglichen. Die Messgeräteanordnung wurde mit dem [LEIFIphysik-Versuchsaufbau des FWU](https://www.leifiphysik.de/elektrizitaetslehre/ohmsches-gesetz-kennlinien/versuche/ohmsches-gesetz-version-b) verglichen. Die Zahlen, Vergleichsspanne, Aufgaben und Grafik sind eigene didaktische Beispiele, keine übernommenen Versuchsdaten.

## Prüfung

- `node scripts/test_electric_measurement.js`: acht Zustände, 24 Entscheidungen, zwölf neue Kapitelantwortwege mit unabhängig festgelegten Schlüsseln; Tabellen-/Diagrammwerte, Papierwerte, Abschnittszuordnung, Revision, Reset, Fokus, wiederholte Initialisierung und unveränderter Lernspeicher beim Erkunden.
- `node scripts/test_electricity_concepts.js`: bestehende Schutz-/Gerätefragen, zwölf Sensorlampenzustände, acht Stromkreiszustände mit unabhängiger Graphprüfung und fünf Ohm-Fälle weiterhin bestanden. Auf 24 Kapitelfragen angepasste Erwartung; keine Behauptung einer Prüfung sämtlicher alter Antwortwege.
- `node scripts/test_physics_worksheets.js` und `node scripts/test_physics_guides.js`: alle 20 Physik-Arbeitsblätter bzw. Lernhilfen in ihrem vorhandenen Prüfumfang bestanden.
- `node scripts/browser_electric_measurement.js`: Chromium 151, 48 Zustände bei 320/390/1280 px in heller/dunkler Darstellung, 144 Entscheidungen, zwölf neue native Kapitelantwortwege. Tastatur, Fokus, Reset, Speicher und Lösungsschalter geprüft; keine horizontalen Überläufe, alle neuen Bedienelemente mindestens 44 px hoch. Beschriftungen innerhalb des SVG-Rahmens. Neue Papieralternative, acht Protokollzeilen und sechs Arbeitsschritte tatsächlich im Arbeitsblatt vorhanden; Lösungen standardmäßig verborgen.
- Interner Browserbericht: `../browser-qa/electric-measurement/report.json`. Mobile Diagramm-/Tabellenansichten und beide Farbdarstellungen gesichtet.
- Interner A4-Ausdruck mit Lösungen: 32 Seiten. Für diese Änderung Seiten 10–12, 23–24 und 30–32 visuell gelesen, also neue Erklärung, Datenaufgabe, Messauftrag, Protokoll, vier Fragen und deren Lösungen. Geteilten Arbeitsschritt an einer Seitengrenze durch absatzweisen Umbruchschutz korrigiert und Seiten 11–12 erneut gelesen. Kein neuer Gesamtnachweis aller 32 Seiten oder aller alten Druckinhalte.
- Inventar: 198 Kapitel. Struktureller Audit der fünf priorisierten Fächer: 1917 Fragen, davon 450 Physik, keine erfassten Strukturfehler. Dies belegt keine vollständige fachliche Abdeckung.

## Offen

Echte Durchführung mit dem jeweiligen Schulmaterial und Unterrichtserprobung wurden nicht vorgenommen. Keine Aussage über reale Messdaten, amtliche Approbation, gesamten Lehrplan oder sämtliche alten Elektrizitätsfragen. Die weiteren Stromwirkungen und der verbleibende W/E/S-Abgleich des Kapitels sind als Nächstes am tatsächlichen Inhalt zu prüfen. Übersetzungen bleiben gemäß Nutzerpriorität ausgesetzt; Gesamtauftrag offen.
