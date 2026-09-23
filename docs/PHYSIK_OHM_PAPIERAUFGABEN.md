# Ohm-Papieraufgaben mit Rechenwegen

Stand: 23.09.2026. Lokale Weiterarbeit nach `f601fda`; keine Veröffentlichung.

## Änderung

Der Elektrizitätszweig im Arbeitsblattgenerator enthielt zehn zufällige Aufgaben ohne zugehörige Lösungen: fünf zur Spannung und fünf zur Stromstärke. Die erzeugten Werte reichten teilweise bis in den Bereich mehrerer hundert Volt; eine ausdrückliche Einordnung als Rechenmodell fehlte.

Die zehn Aufgaben bleiben erhalten, heißen jetzt O1–O10 und verwenden fünf Widerstände (20, 25, 50, 100, 200 Ω) und fünf Stromstärken (10, 20, 30, 40, 50 mA). Daraus ergeben sich Spannungen von 0,2 bis 10 V. Diese Zahlen sind ausdrücklich keine Versuchsvorgaben und begründen keine Freigabe eines realen Aufbaus. Das Rechenmodell setzt konstantes R voraus; die Grenze bei einer sich erwärmenden Glühlampe wird benannt.

O1–O5 verlangen U, O6–O10 I in A und mA. Eine Rechenhilfe erklärt Formeln und mA/A-Umrechnung. Jede Aufgabe erhält eine passende Vergleichslösung mit Umrechnung, eingesetzten Werten und Rückrechnung als Probe. Aufgaben und Lösungen werden aus derselben Ziehung erzeugt; der Lösungsschalter zeigt lediglich die bereits zugehörigen Lösungen. Die Schülerfassung verbirgt sie standardmäßig.

Nummern, Formelzeichen, Einheiten, Dezimalkomma und Platz für Rechenweg/Probe sind vorhanden. Im schmalen Bildschirm stehen die Karten untereinander, im A4-Ausdruck zweispaltig. Aufgaben- und Lösungsblöcke werden nicht innerhalb einer Karte über Seiten geteilt. Keine Änderung der 28 Kapiteltestfragen und keine weitere Revisionsänderung; das Kapitel bleibt auf Revision 6.

## Prüfung

- `node scripts/test_ohm_worksheet_answers.js`: alle 50 Kombinationen aus fünf Widerständen, fünf Stromstärken und zwei gesuchten Größen; 250 erzeugte Aufgaben mit Lösungen. Sichtbare Zahlen, Einheitenumrechnung, Formelansatz, Ergebnis und unabhängige Probe mit ganzzahliger Bruchrechnung überprüft. Zusätzlich zwei vollständige Arbeitsblattziehungen, eindeutige Zuordnung und unveränderte Aufgaben beim Lösungsschalten.
- `node scripts/test_physics_worksheets.js`: alle 20 Physik-Arbeitsblätter in ihrem vorhandenen Struktur-/Materialumfang weiter bestanden.
- `node scripts/browser_ohm_worksheet.js`: Chromium 151, drei echte Ladevorgänge mit insgesamt 30 passenden Lösungen, Lösungsschalter auch per Tastatur, Aufgabenraster bei 320/390/1280 px ohne gemessenen Überlauf innerhalb der Karten. Der Layoutnachweis betrifft das neue Raster, nicht sämtliche alten Tabellen der Seite.
- Interner Bericht: `../browser-qa/ohm-worksheet/report.json`. Mobile Aufgabenkarte visuell gelesen.
- Interne Druckfassungen: 34 Seiten ohne Lösungen, 43 Seiten mit Lösungen. Neue Aufgaben auf Seiten 19–20 und neue Lösungen auf Seiten 40–41 visuell gelesen; Übergang zu den bisherigen Papierlösungen auf Seiten 42–43 ebenfalls geprüft. Aufgabenblätter 19–20 beider Fassungen sind nach dem Rendern bildidentisch. Alle 34 Seiten der Schülerfassung besitzen denselben extrahierten Text wie die entsprechenden Seiten des Lösungsdrucks; Vergleichslösungen stehen ausschließlich auf den späteren Seiten. Keine erneute visuelle Gesamtabnahme aller alten Seiten.

## Verbleibender Umfang

Die in PHYSIK_STROMWIRKUNGEN.md benannte Lücke der erzeugten Ohm-Lösungen ist damit geschlossen. Vollständige Sichtprüfung aller vorhandenen Kapitelgrafiken, weiterer Physik-W/E/S-Abgleich und die Anforderungen der übrigen Fächer bleiben offen. Echte Schulversuche wurden nicht durchgeführt. Übersetzungen bleiben ausgesetzt; der Gesamtauftrag ist nicht abgeschlossen.
