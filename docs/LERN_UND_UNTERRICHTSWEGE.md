# Lern- und Unterrichtswege: Funktionsabnahme

Stand 16.09.2026, lokale Weiterarbeit nach dem auf Wunsch gesicherten Zwischenstand d025576. Der vorherige Zielturn war Fortschritt: Commit und entfernter Stand wurden bestätigt. Diese Prüfung betrifft die gemeinsamen Wege des Lehrbuchs. Sie ersetzt keine fachliche Abnahme der 197 Kapitel.

## Verbesserungen aus der Prüfung

Auf schmalen Bildschirmen steht die Stoffliste unter dem Kapitelkatalog. Bei allen 197 Kapiteln lag ihre Überschrift im Browser mehr als 5.000 Pixel unterhalb des sichtbaren Bereichs. Neue Sprunglinks führen unmittelbar zur Stoffliste oder zur Kapitelauswahl. Die Liste zeigt außerdem einen Rückweg zur Auswahl. Die angezeigte Kapitelanzahl folgt Hinzufügen und Entfernen. Sprungziele erhalten den Tastaturfokus und bleiben unter der festen Bedienleiste sichtbar; die geteilte Adresse im übergeordneten Fenster bleibt erhalten. Die Links werden nicht mitgedruckt. Die neuen Texte sind deutsch; Übersetzungen bleiben zurückgestellt.

Der vollständige Funktionstest meldete 200 von 201 bestandenen Suiten, Bericht 2026-09-16T14:31:59.017Z. Der einzige Fehler war ein veralteter generierter Metadatenindex für `math2_5_var_gleichungen`: In fünf Sprachen enthielt er noch Titel einer Fassung, die der Kapitelrenderer nicht mehr auswählt. Der vorhandene Generator wurde erneut ausgeführt; genau diese fünf Einträge entfielen. Keine Sprachdatei und keine Übersetzung wurden geändert. Der Generatorhinweis nennt nun auch deutsche Kapitel- und Revisionsänderungen als Anlass zum Neubauen. Der zuvor fehlgeschlagene Test sowie alle 18 unmittelbar betroffenen Lern-/Stofflisten-Suiten bestanden anschließend, Bericht 2026-09-16T14:35:17.213Z. Kein zweiter Gesamtlauf behauptet.

## Nachgewiesene gemeinsame Funktionen

| Anforderung | Aktuelle Umsetzung und Nachweis |
| --- | --- |
| Neues lernen | Der Lernbereich filtert Kapitel nach Fach, Klasse und Suchbegriffen. `core-learning.js` erzeugt Abschnittslinks, Lernziele/Vorwissen, Zusammenfassung, Kapitelcheck und Fortsetzung im Fach. Die gemeinsamen Kapitel wurden im aktuellen Strukturlauf 197-mal gerendert; keine fehlenden Lernhilfen oder gemeldeten Renderfehler. Das ist kein Nachweis der fachlichen Güte aller Abschnitte. |
| Gezielt wiederholen | Ein geteilter Prüfungsstoff öffnet den Wiederholungsmodus. Kapitelchecks speichern unsichere Frage-IDs; der gemeinsame Renderer ordnet sie passenden Abschnitten zu. Der Elektrizitäts-Test prüft alle derzeitigen Abschnittsfragen und die dauerhaften Wiederholungslinks; der native DGB-Weg prüft Auswertung, sichtbares/fokussiertes Wiederholungsziel und Navigation. Wiederholen folgt der ausgewählten Kapitelreihenfolge. |
| Unterrichts- und Prüfungsstoff zusammenstellen | Kapitel auswählen, entfernen und umordnen; hilfreiches Vorwissen ansehen oder davor einfügen. Bestehende Tests prüfen Reihenfolge, Fokus, Such-/Klassenfilter, Ladefehler, gesperrten Speicher, Änderungen in anderen Tabs und unbekannte Kapitel in geteilten Links. |
| Teilen und wieder aufrufen | Native Tests mit getrennten Browserprofilen prüfen sechs Kapitel aus allen fünf priorisierten Fächern in allen drei Modi. Kopierte Kapiteladressen erhalten Stoffliste und Modus. Der Empfänger erhält keine Ergebnisse des Absenders. Die Stoffliste bleibt beim Öffnen, Fortsetzen und Zurückkehren nachvollziehbar; fehlende Kapitel werden gemeldet. |
| Stoffliste mit Lernzielen drucken | Vierseitiges A4-PDF mit sechs ausgewählten Kapiteln aus fünf Fächern, Fach/Klasse, Lernzielen, Vorwissen und Warnung für ein unbekanntes Kapitel. Alle vier Seiten gerendert und gelesen. Sechs unterschiedliche PDF-Linkziele enthalten Kapitel, Modus und geordnete Liste; keine persönlichen Ergebnisse. Der abschließende Export ist im Text und bei allen vier Seitenbildern identisch mit der gelesenen Fassung. |
| Direkter mobiler Zugang | Neuer nativer Test prüft 18 Kombinationen aus 320/390/1280 Pixeln, beiden Designs und drei Modi. Tatsächliches Enter/Tab, alle 197 Katalogeinträge, sichtbare Sprungziele, unveränderte Hauptadresse, Zähler nach Hinzufügen/Entfernen, leere Liste, mindestens 44 Pixel hohe Links, kein Seitenüberlauf und Ausblenden im Druck bestanden. Mobile helle/dunkle Ansichten gelesen. |

## Aktuelle Browsernachweise

Chromium 151.0.7922.34, separate Profile ohne Benutzerdaten:

- `scripts/browser_learning_shortcuts.js`: 2026-09-16T14:36:03.995Z, 18 Kombinationen und leere Liste; `../browser-qa/learning-shortcuts/report.json`.
- `scripts/browser_plan_links.js`: 2026-09-16T14:36:15.477Z, alle drei Modi, sechs Kapitel, fremdes Empfängerprofil, Reihenfolge, 320/390/1280 Pixel und PDF; `../browser-qa/learning-final-2026-09-16/plan-links-report.json`.
- `scripts/browser_learning_smoke.js`: 2026-09-16T14:36:20.724Z, Menü-/Sprachmenüfokus, DGB-Kapitelcheck und Abschnittswiederholung, Lehrer-/Empfängerweg sowie eingeklappte Desktopnavigation; gleicher Ordner, `learning-smoke-report.json`.
- Der zuvor laufende Lernradio-Test bestand ebenfalls: 30 Kapitel-/Breiten-/Designkombinationen und zehn weitere Ansichten, Tastaturdialoge, Speicherung, kein automatischer Start und Druckverhalten. Wiedergabe war simuliert; echte Streams sind dadurch nicht geprüft.

Die PDF-Prüfung verwendete die lokale Vorschauadresse. Sie bestätigt Drucklayout und Linkstruktur, nicht eine neue Veröffentlichung. Keine Prüfung auf echten Mobilgeräten oder mit assistiven Technologien behauptet. Die Nachweise außerhalb des Repositories sind Arbeitsartefakte; die ausführbaren Browserprüfungen liegen im Repository.

## Bedeutung für die Produktabnahme

Die beiden Produktpunkte „Zwei Lernwege“ und „Stoffliste auswählen, wieder aufrufen, teilen und mit Lernzielen drucken“ sind als gemeinsame Funktionen nachgewiesen. Andere Anforderungen bleiben eigenständig offen: vollständiger Lehrplan-/Inhaltsabgleich, didaktische Qualität jedes Kapitels, sämtliche fachlichen Rückmeldungen und Transferaufgaben, globale Barrierearmut und Medienprüfung sowie abschließende veröffentlichte Gesamtfassung. Vorhandene Strukturprüfungen und diese Funktionsabnahme dürfen nicht als Ersatz dafür verwendet werden.

Physik, Mathematik, Chemie, Biologie und Digitale Grundbildung bleiben vorrangig. Weitere Arbeit erfolgt anhand ihrer Kapitel- und Lehrplanprüfungen. Übersetzungen sind zurückgestellt. Kein erneuter Push in diesem Arbeitsschritt.
