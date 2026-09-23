# Word-Werkstatt: selbstständig arbeiten und Ergebnisse prüfen

Stand 23.09.2026, lokale Weiterarbeit nach dem auf Nutzerwunsch gepushten `f9dbb0c`. Kapitel `dgb_word_werkstatt`, erste Inhaltsrevision 1. Die Zusatzwerkstatt ergänzt die fünf DGB-Bereiche in Klasse 1/2; sie ersetzt keinen Jahrgangslehrplan. Übersetzungen bleiben ausgesetzt.

## Befund und Änderung

| Befund | Änderung im Kapitel | Nachweis der Lernhandlung |
| --- | --- | --- |
| Windows-Tasten und Menüwege ohne klar benannte Umgebung | Desktop-Word unter Windows ausdrücklich benannt, vereinfachte Zeichnungen und abweichende Fassungen erklärt | Tatsächlich benutzten Weg notieren; passende Herstellerhilfe verwenden |
| Nach dem Seitenumbruch blieb der Cursor beim bisherigen Inhalt | Mini-Aufgabe 9: zurück mit Strg + Pos1, Position vor dem Umbruch kontrollieren, automatisches Verzeichnis einfügen | Verzeichnis auf Seite 1; echte Überschriften prüfen und eine umbenannte Überschrift vollständig aktualisieren |
| Absätze als Text zwischen zwei Enter-Tasten erklärt | Absatzmarke, Enter und Umschalt + Enter unterschieden | Fünf Gegenstände als fünf Absätze und Listenpunkte gestalten |
| Tabellenanleitung versprach bei Tab in einer beliebigen letzten Zeilenzelle eine neue Zeile | Mini-Aufgabe 13: eindeutiger Menüweg mit aktiver letzter Zeile; Zellwechsel gesondert erproben | Erst 6 Zeilen/4 Spalten, nach zusätzlichem Wochentag 6 Zeilen/5 Spalten; vorhandene Einträge bewahren |
| Bild/Form verwechselt, unverzerrtes Verkleinern zu pauschal erklärt | Bildformat/Formformat getrennt, gesperrtes Seitenverhältnis und konkrete Größenkontrolle | Proportion erhalten, zwei Umbrüche vergleichen, Aussage beschreiben und informatives Bild mit Alternativtext versehen |
| Fünf Fragen mit durchgehend erster richtiger Antwort und teils absurden Alternativen | Neun kontextbezogene Fragen mit begründetem Feedback | Speicherprobe, passende Textauswahl, Absätze, Cursorposition, Aktualisierung, Bildverhältnis, Tabellenposition und erneuter PDF-Export |
| Abgabe ohne Rückmeldungsrunde | Abschlussprojekt ergänzt gegenseitiges Öffnen, konkrete Rückmeldung, Überarbeiten und neue PDF-Kontrolle | Word-Datei, aktuelle PDF und kurze Dokumentation von Fundstelle, Änderung und Öffnungsprobe |

Alle 13 Abschnitte, 18 Mini-Aufgaben und das Abschlussprojekt sind erhalten. Die 13 ursprünglichen SVG-Zeichnungen sind unverändert; die umgebenden Diagrammflächen sind nun fokussierbar und bei schmaler Ansicht per Pfeiltasten scrollbar. Der bestehende 30-Punkte-Projektraster bleibt eine Beurteilung des tatsächlich erstellten Dokuments. Das Kapitelquiz ersetzt diese praktische Beurteilung nicht.

## Geprüft

- `scripts/test_word_workshop.js`: alle 27 Antwortwege mit unabhängig festgelegten Schlüsseln, Rückmeldungen, 100/89-Prozent-Auswertung und konkreten Wiederholungsabschnitten. Revision 1 verwirft einen alten bestanden-Status für Revision 0. Druckmaterial enthält sämtliche 13 Abschnitte und 18 Mini-Aufgaben; Lösungen zunächst verborgen.
- `scripts/browser_word_workshop.js`: Abschluss **2026-09-23T15:16:06.694Z**, Chromium **151.0.7922.34**. 27 native Quizantworten und 27 freie Übungsantworten, sechs Ansichten (320/390/1280 Pixel, hell/dunkel), Tastaturbedienung und tatsächliches seitliches Scrollen eines fokussierten Diagramms. Übungsantworten ändern den gespeicherten Lernstand nicht; keine JavaScript-Fehler oder gemeldete Seiten-/Kartenüberläufe.
- Native Bildschirmbilder für Inhaltsverzeichnis, Bild, Tabelle und Projekt erzeugt; schmale helle Inhaltsansicht und dunkle Desktop-Projektansicht visuell gelesen. Automatisierte Breitenprüfung ergänzt diese Sichtung, ersetzt sie nicht.
- Finale A4-Ausgabe `../browser-qa/word-workshop/dgb-word-solutions.pdf`: **22 Seiten vollständig visuell gelesen**. Material, Arbeitsraum, neun Fragen und getrennte Lösungen vorhanden. Die scheinbar fehlenden Teile der kleinen Vorschaubilder auf Seite 5/20 wurden zusätzlich an hoch aufgelösten Ausschnitten geprüft und sind im PDF vorhanden.
- DGB-Arbeitsblätter, Revisionsbehandlung und vollständige Fragenpools gezielt geprüft. Inventar und Prioritätsaudit neu erstellt: 198 Kapitel, 2.002 Frageninstanzen in den fünf priorisierten Fächern, davon 260 in DGB, keine strukturellen Auditbefunde.

Der vollständige **271/271-Lauf um 15:08:25 UTC** prüfte den unveränderten GitHub-Stand `f9dbb0c` vor dieser Word-Änderung. Jetzt sind 272 Suiten vorhanden; ein vollständiger neuer 272-Suiten-Lauf wird nicht behauptet. Siehe [Funktionsbericht](FUNKTIONS_PRUEFUNG_2026-09-23.md).

## Quellen und Grenze

Die Menüwege wurden am 23.09.2026 anhand der offiziellen Microsoft-Anleitungen zu [Inhaltsverzeichnis](https://support.microsoft.com/de-de/word/training/insert-a-table-of-contents), [Aktualisieren](https://support.microsoft.com/de-de/word/update-a-table-of-contents), [Tabellen](https://support.microsoft.com/de-de/word/add-a-cell-row-or-column-to-a-table-in-word), [Objektgröße](https://support.microsoft.com/en-us/word/change-the-size-of-a-picture-shape-text-box-or-wordart-in-word), [Tasten nach Plattform](https://support.microsoft.com/en-us/accessibility/word/keyboard-shortcuts-in-word) und [Alternativtext](https://support.microsoft.com/de-de/accessibility/office-accessibility/add-alternative-text-to-a-shape-picture-chart-smartart-graphic-or-other-object) geprüft. Der Tabellenauftrag verwendet den eindeutig belegten Einfügebefehl; eine beliebige Position in der letzten Zeile wird nicht mit der letzten Tabellenzelle gleichgesetzt.

Die technische Prüfung betrifft die Lernwebseite, nicht eine automatisierte Ausführung sämtlicher Aufgaben in einer installierten Word-Version. Unterrichtserprobung und vollständige Barrierefreiheitsprüfung fehlen weiterhin. Nächster Schritt für DGB: die vier Jahrgangsmatrizen und diese Zusatzwerkstatt in einem gemeinsamen Fachabgleich zusammenführen, die tatsächliche Progression und verbliebene generische Aufträge prüfen. Der Gesamtauftrag für alle elf Fächer bleibt offen; Physik, Mathematik, Chemie, Biologie und DGB haben Vorrang.
