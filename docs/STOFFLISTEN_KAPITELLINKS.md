# Stofflisten: Kapitelkontext in kopierten und gedruckten Links

Stand 14.09.2026. Übersetzungen weiterhin zurückgestellt.

## Befund und Änderung

Der Knopf „Kapitel öffnen“ übergab bereits die ausgewählten Kapitel und den Lernmodus. Der daneben angezeigte native „Online-Kapitel“-Link verwies dagegen nur auf `index.html#kapitel`. Dieser Link wird auch gedruckt. Beim Kopieren auf ein anderes Gerät oder beim Öffnen aus einem PDF fehlte dadurch der Bezug zur Stoffliste. Der neue Regressionstest zeigte den Fehler vor der Änderung.

`js/learning.js` verwendet jetzt dieselbe Routenbildung für beide Wege. Reihenfolge, Modus und nicht mehr verfügbare Kapitel bleiben ausdrücklich in der URL enthalten. Nach Umordnen, Entfernen und Einfügen von Vorwissen werden die Links aus dem aktuellen Listenstand erstellt. Auch die Kapitelvorschau im Unterrichtsmodus vor der ersten Auswahl behält jetzt den Unterrichtsmodus mit einer ausdrücklich leeren Liste.

Der Teilen-Knopf erstellt weiterhin einen Wiederholungslink für Schüler:innen. Kapitelvorschau und gedruckte Kapitelverweise behalten den ausgewählten Modus. Die Fortsetzung im Wiederholungsmodus folgt der Stoffliste; der Lernmodus zeigt weiterhin die reguläre Fachreihenfolge. Persönliche Ergebnisse werden nicht in URLs übernommen.

## Nachweise

- 19 bestehende Funktionstests zu Lernbereich, Stofflisten, Navigation, Vorwissen und Unterricht bestanden; Bericht `../plan-link-tests.json`, 2026-09-14T02:16:36.418Z. Die Erweiterung von `test_plan_navigation_context.js` prüft native Linkziele zusätzlich zu Knöpfen, alle drei Modi, Reihenfolge nach Bearbeitung, unbekannte Kapitel, leere Listen und blockierten Browserspeicher. Die vorhandenen Tests zu Unterricht und Vorwissenseinfügung prüfen die neuen vollständigen Linkziele.
- Neuer separater Browsertest `scripts/browser_plan_links.js`, Chromium 151.0.7922.34, Bericht `../browser-qa/plan-links-report.json`, 2026-09-14T02:17:26.200Z. Sechs Kapitel aus Physik, Mathematik, Chemie, Biologie und DGB sowie ein absichtlich unbekannter Eintrag. Dies ist eine technische Testliste über mehrere Klassen, kein Stoffvorschlag für eine Schulklasse.
- Für alle drei Modi: alle sechs Linkziele geprüft, tatsächliche Navigation mit Enter, kopierter Link in einem neuen Browserkontext mit abweichender gespeicherter Liste, Rückkehr mit ursprünglicher Auswahl und Warnung. Im Wiederholungsmodus den nächsten vorgegebenen Listenschritt tatsächlich geöffnet. Keine übernommenen Quizergebnisse und keine Browserfehler.
- Nach Umordnen stimmen Kapitel- und Teilen-Link mit der neuen Liste überein. Browserbreiten 320, 390 und 1280 ohne horizontalen Seitenüberlauf. Mobile Kapitelzeile visuell geprüft.
- A4-PDF mit vier Seiten erzeugt und alle vier Seiten visuell gelesen. PDF-Linkannotationen für alle sechs Kapitel enthalten Modus und vollständige geordnete Liste einschließlich des unbekannten Eintrags. Der Warnhinweis bleibt sichtbar. Die langen URLs umbrechen innerhalb des Satzspiegels; Kapitelblöcke bleiben zusammen. PDF-Ausgabe unter `../browser-qa/plan-links.pdf` ist ein lokales Prüfarbeitsmittel mit Vorschauadressen.

Keine vollständige Produktabnahme, kein vollständiger Lauf aller Funktionstests und keine neue Veröffentlichung. Physische Geräte, Screenreader und das Öffnen der PDF-Links in externen PDF-Programmen wurden nicht geprüft; geprüft wurden die tatsächlichen PDF-Linkziele und deren Browsernavigation.
