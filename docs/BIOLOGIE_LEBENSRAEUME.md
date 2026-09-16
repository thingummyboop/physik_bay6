# Lebensräume: Beziehungen, Beobachtung und begründetes Handeln

Stand 14.09.2026. Der vorherige Zielturn war Fortschritt: Blütenpflanzen erhielt ein überprüftes Modell, bessere Fragen und einen angeleiteten Keimvergleich. Diese Änderungen wurden vor der Arbeit an `bio_1_lebensraeume` als vorhandener lokaler Stand festgestellt und erhalten. Letzter Push weiterhin `7c99011`.

## Fachlicher und didaktischer Stand

Alle fünf Lebensraum-Abschnitte einschließlich 23 Glossareinträgen und sämtliche elf bewerteten Fragen sowie die Zusatzübung wurden gelesen. Zehn bewertete Fragen und die Übung wurden überarbeitet; die bereits passende Abschlussfrage zur Unterscheidung unbelebter Messgrößen blieb erhalten. Alle sechs bisherigen Abschlussfragen sind jetzt passenden Abschnitten zugeordnet. Unverändert elf bewertete Fragen; Kapitelrevision 2.

Die Texte unterscheiden Bodenlebewesen von physikalischen und chemischen Bodenbedingungen, Stoffkreislauf von Energiefluss sowie Tierzahl, Zahl erfasster Gruppen und Artenzahl. Die neue Frage zum Verlust einer Nahrungsquelle vermeidet eine unbelegte Vorhersage fester Bestandsänderungen. Fünfzehn konkrete Trainingskarten ersetzen allgemeine Formulierungen und verwenden den vorhandenen direkten Aufgabenmodus, damit der Renderer sie unverändert erhält.

Das eigene Nahrungsnetz enthält fünf Bestandteile und sechs Ernährungsbeziehungen: Gras, eine pflanzenfressende Heuschrecke, Feldmaus, erwachsener Grasfrosch und Weißstorch. Es ist ein vereinfachtes Beispiel, keine Erhebung einer bestimmten Wiese und keine vollständige Artenliste. Die Pfeile verlaufen von der Nahrung zum fressenden Lebewesen. In einem Gedankenexperiment kann jeder der fünf Bestandteile fehlen. Das Modell blendet seine direkten Verbindungen aus und erklärt betroffene Konsumenten sowie weiterhin dargestellte Nahrung. Es berechnet keine späteren Bestände; auch indirekte Folgen sind nicht berechnet. Eine fehlende Linie belegt keine allgemeine Abwesenheit einer Beziehung in der Natur.

Vier Aufgaben verlangen eigene Ketten, eine Vorhersage vor der Modellbedienung, den Vergleich zweier Ausfälle und Kritik an einer quantitativen Behauptung ohne Mengendaten. Die Papierfassung enthält das vollständige Schema und eine Streichaufgabe, die sechs Beziehungen zusätzlich als Tabelle sowie eine getrennt zuschaltbare Erklärung. Die bisherige Bienenfotografie im Nahrungsnetz-Abschnitt wurde durch die thematisch passende Darstellung ersetzt. Das externe Teichfoto in Abschnitt 1 bleibt separat zu prüfen.

Der Schulhof-Fall vergleicht drei Möglichkeiten des Umgangs mit Laub. Eine geeignete Laubecke und ein nutzbarer Weg werden gemeinsam betrachtet; die Planung garantiert keine Ansiedlung bestimmter Tiere. Der Wiener Bezug ist mit einer städtischen Information zur Bedeutung von Laub und Totholz für Wildtiere belegt. Schüler:innen formulieren ihre Empfehlung und planen eine Beobachtung der Wirkung; es wurde keine Nachricht an Dritte versendet.

Der echte Standortvergleich besitzt jetzt acht Protokollzeilen für Methode, Bedingungen, erfasste Lebewesen und Unsicherheiten. Eine Momentaufnahme gleichzeitig sichtbarer Tiere nach gleicher Beobachtungszeit begrenzt wiederholtes Zählen beweglicher Tiere. Null und nicht erfasst sind ausdrücklich verschieden. Die vorgegebenen Beispielzahlen bleiben erfunden und sind von eigenen Einträgen getrennt. Aus mehr gefundenen Gruppen wird weder eine Artenzahl noch ein sicherer Feuchtigkeitseffekt abgeleitet.

## Bezug zur Mittelschule

Die zehn Kompetenzbeschreibungen W/E/S sowie die Anwendungsbereiche der 1. Klasse wurden erneut aus der bereits aktuell abgeglichenen RIS-Textgrundlage gelesen. Wechselbeziehungen zwischen Lebewesen in ihrem Lebensraum sind dort ein verbindlicher Anwendungsbereich. Das Kapitel bietet folgende konkrete Lerngelegenheiten:

| Bereich | Vorhandene Aufgabe oder Darstellung | Grenze des Nachweises |
|---|---|---|
| Wissen erklären und verknüpfen | Faktoren, Nahrungspfeile, Stoffkreislauf und Energiefluss erklären | Aufgabenangebot belegt keine tatsächlich erworbene Kompetenz |
| Darstellungen verwenden und Modelle beurteilen | Netz und Beziehungstabelle vergleichen, eigene Ketten zeichnen, Modellgrenzen diskutieren | Keine vollständige Medien- und Quellenvergleichsaufgabe für den gesamten Jahrgang |
| Beobachten und untersuchen | Gleichartige Probeflächen, festgelegte Zählregel und eigenes Protokoll | Reale Durchführung bleibt Teil des Unterrichts |
| Daten auswerten und Erklärungen prüfen | 18 versus 6 Tiere, eine versus drei Gruppen, offene Ursache und Wiederholung | Keine Artenbestimmung aus diesen Gruppendaten |
| Standpunkte begründen | Laub-Fall mit ökologischen Bedürfnissen und Wegnutzung | Entscheidung muss an tatsächliche Schulbedingungen angepasst werden |
| Reflektiert handeln | Vorschlag begründen, Tiere am Fundort lassen, Unsicherheit offenlegen | Keine Prüfung des Verhaltens von Schüler:innen |

Dies ersetzt weder den vollständigen W/E/S-Abgleich der zehn Biologiekapitel der 1. Klasse noch den aller 39 Biologiekapitel.

## Prüfungen

`test_habitat_relationships.js` prüft alle 33 bewerteten Antwortwege mit unabhängig festgelegten richtigen Optionen, Abschnittszuordnung, Auswertung, Rückmeldung und alter/aktueller Revision. Alle sechs Modellzustände werden gegen unabhängig aufgelistete Kantenmengen geprüft. Weitere Prüfungen: Ergebnistext, Grenzen, Rücksetzen/Fokus, erneute Initialisierung, unveränderte Quizspeicherung, 15 tatsächlich erhaltene Trainingskarten, acht Protokollzeilen und unveränderte Beispieldaten.

`browser_habitat_relationships.js` bedient alle 36 Übungsantworten per nativer Tastatur. Die sechs Netz-Zustände wurden in 36 Kombinationen mit 320/390/1280 Pixeln und hellem/dunklem Design geprüft. Auswahl mit Home/Pfeiltaste/Ende, Rücksetzen und Fokus funktionieren. Drei Tabellen passen in den Bildschirm oder lassen sich per Tastatur bis zum rechten Rand verschieben. Zwei 91-Prozent-Kapitelversuche führen mit genau einer Wiederholungsfrage in die passenden Abschnitte 2 und 5. Abschließender Bericht: `2026-09-14T04:20:16.708Z`, Chromium `151.0.7922.34`, keine gemeldeten Seitenfehler.

Die Papierprüfung erfasst elf Fragen, 15 Trainingskarten, 23 Glossareinträge, ein statisches Netz mit sechs Pfeilen, die Aufgaben und Protokolle sowie getrennte Lösungen. Die A4-Ausgabe umfasst 23 Seiten. Die mobilen Ausgangs-/Ausfallansichten und das Standortprotokoll sowie Druckseiten 4, 5, 8, 12, 14 und 23 wurden tatsächlich visuell gelesen. Zu schmale Schreibspalten im Standortprotokoll wurden danach verbreitert; die neue Seite 12 wurde erneut gelesen. Keine Sichtprüfung sämtlicher Druckseiten. Alle 95 STEM-Arbeitsblattprüfungen bestanden; die neue Prüfsuite erhöht die vorhandene Funktionstestsammlung auf 185 Suiten.

## Quellen und verbleibende Arbeit

Primärquellen am 14.09.2026 geöffnet; Aufgaben, Fall, Diagramm und Implementierung sind eigenständig verfasst:

- [OpenStax Biology 2e: Energy Flow through Ecosystems](https://openstax.org/books/biology-2e/pages/46-2-energy-flow-through-ecosystems).
- [NABU-Station Ostfriesland: Nahrung des Weißstorchs](https://www.nabu-station-ostfriesland.de/themenschwerpunkte/wei%C3%9Fstorch/).
- [Deutsche Wildtier Stiftung: Feldmaus](https://www.deutschewildtierstiftung.de/wildtiere/feldmaus).
- [NABU Dreisamtal: Grasfrosch](https://www.nabu-dreisamtal.de/teichschild-bickenreute/grasfrosch/).
- [Stadt Wien / DIE UMWELTBERATUNG: Bei Herbstarbeiten Wildtiere schützen, 23.09.2024](https://presse.wien.gv.at/presse/2024/09/23/bei-herbstarbeiten-im-garten-die-wildtiere-schuetzen).
- Aktueller Lehrplanvergleich und Rohtextnachweis: [LEHRPLAN_QUELLENSTAND.md](LEHRPLAN_QUELLENSTAND.md).

Eigene Naturbeobachtung und Unterrichtserprobung wurden nicht durchgeführt. Die noch offenen Fach-, Lehrplan-, Abbildungs- und Gesamtproduktprüfungen bleiben bestehen. Übersetzungen sind zurückgestellt; die neuen Änderungen sind lokal und nicht erneut gepusht. Der Gesamtauftrag bleibt aktiv.


## Abschließender Gesamttest

Vollständiger Funktionstest vom 2026-09-14T04:26:34.223Z: 185/185 Suiten bestanden. Der Lauf erfolgte nach den lokalen Pflanzen- und Lebensraumänderungen; währenddessen wurden keine Produktdateien oder Tests geändert. Er ersetzt den früheren 184/184-Nachweis als aktuellen Funktionsstand. Er beweist keine vollständige fachliche, visuelle oder Lehrplanabnahme.
