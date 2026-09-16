# KI kritisch nutzen: konkrete Quellen, Auswahl und Gestaltung

Stand: 16.09.2026. Kapitel `dgb8_orientierung`, 4. Klasse / 8. Schulstufe, Revision 1. Lokale Weiterarbeit nach c1d432a.

## Problem und Überarbeitung

Das bisherige Kapitel enthielt allgemeine Arbeitsaufträge ohne das benötigte Ausgangsmaterial sowie vier Fragen mit teilweise offensichtlich unpassenden Ablenkantworten. Alle vier Abschnitte wurden gelesen und neu ausgearbeitet. Titel, Kapiteladresse, Abschnitts-IDs und die vier ursprünglichen bewerteten Frage-IDs bleiben erhalten.

1. Quellenwerkstatt: Ein ausdrücklich erfundener Beispielentwurf enthält drei Aussagen. Drei Quellenkarten unterscheiden aktuelles Veranstalterprogramm, Vorjahresprogramm und davon abhängigen Forumsbeitrag. Interaktive Urteile: Beginn belegt, kostenloser Eintritt widerlegt, stufenloser Zugang nicht geklärt. Neun eigene Rückmeldungen erklären die Beleglage. Der Entwurf wird ausdrücklich nicht als tatsächliche Ausgabe eines KI-Dienstes ausgegeben.
2. Stereotype: Eine erfundene Werbekarte legt Tätigkeiten pauschal nach Geschlecht fest. Vier Aufträge führen über Analyse zu einer neuen Einladung mit Skizze oder digitalem Layout, Prüfung und dokumentierter Überarbeitung. Individuelle Wahl und Rollenwechsel sind Kriterien; ein bloßer Farbwechsel genügt nicht.
3. Empfehlungsauswahl: Sechs vorgegebene Schulhofbeiträge und Modellwerte. Regel A wählt A/B/C nach höchsten Werten, Regel B A/D/E nach Themenvielfalt. Vier Aufgaben verlangen Berechnung, Ziel-/Grenzenvergleich, eine eigene angewandte Regel und einen begründeten Rechercheweg. Das Modell weist weder reale Filterblasen noch Wahrheit oder Bedürfnisse aller nach.
4. Abwägung: Zwei pauschale Haltungen werden mit konkreten Belegen beantwortet. Ein Team vereinbart Zweck, Prüfung, Zuständigkeit, Kennzeichnung und Aktualisierung einer Einladung. Ein Navigationsbeispiel überträgt die Abwägung auf Mobilität.

16 Arbeitsaufträge, acht bewertete Fragen mit je drei plausiblen Antworten und drei getrennte Übungen. Revision 1 macht frühere Ergebnisse als veraltet kenntlich. Freie Texte und Gestaltungen werden nicht automatisch bewertet. Alle Aufgaben sind ohne KI-Zugang möglich; Einzelarbeit ist berücksichtigt. Echte eigene Recherche ist ein Transferauftrag, keine Voraussetzung für das Lösen des erfundenen Falls.

## Umsetzung und Nachweise

Die vorhandene Fallauswahl in `core-learning.js` erhält nur einen optionalen, kapiteleigenen Anfangshinweis. Ihre übrige Bedienung und bisherige Standardformulierung bleiben erhalten. Native Auswahl und Schaltflächen, Statusrückmeldung, Reset mit Fokus und keine Speicherung der Urteile. Kurze Auswahlbezeichnungen werden durch den vollständigen sichtbaren Aussagetext ergänzt. Auf schmalen Bildschirmen lässt sich die Tabelle auch mit Tab/Pfeiltasten verschieben.

- `test_ai_evidence.js`: neun Urteile mit konkreten Belegprüfungen, Reset/Fokus/Speicher, 24 unabhängig festgelegte bewertete Antwortwege, passende Wiederholungsabschnitte, alte Revision, exakte sechs Tabellenzeilen, 16 Aufgaben und tatsächliche Arbeitsblattgenerierung bestanden. Drei Papierfälle und vier getrennte, zunächst ausgeblendete Vergleichslösungen geprüft.
- `browser_ai_evidence.js`: finaler Bericht vom 2026-09-16T15:20:07.251Z, Chromium 151.0.7922.34. Neun native Tastatururteile, 24 native bewertete Antwortwege mit erneutem Quizstart, 18 Ansichten aus drei Fällen, drei Breiten (320/390/1280) und zwei Designs. Fokus, unveränderter Speicher, 44-Pixel-Schaltflächen, Beschriftungsfarbe und tatsächliches Tastaturverschieben der Tabelle geprüft. Keine Seitenfehler.
- Die erste Browser-Sichtprüfung zeigte zu dunkle Beschriftung und enge Tabellenspalten. Farbe, kurze Auswahlbezeichnungen und verschiebbare Tabelle korrigiert; der gesamte gezielte Browserlauf danach erneut bestanden.
- Druckfassung mit Lösungen: 13 Seiten. Alle Seiten visuell gelesen. Nach letzter Text-/Layoutkorrektur Seiten 1 und 3 erneut gelesen; die übrigen elf sind per SHA-256 bildidentisch mit der bereits gelesenen Fassung bzw. wurden direkt im finalen Export gelesen. Quellenkarten, Aussagen und Arbeitsaufträge werden möglichst zusammengehalten; keine abgeschnittenen/überlappenden Inhalte festgestellt. Bildschirmbedienhinweise werden im Arbeitsblatt weggelassen.

Prüfberichte und Bilder: außerhalb des Repositorys unter `../browser-qa/ai-evidence`. Arbeitsblattlinks tragen bei lokalen Tests die lokale Vorschauadresse. Ein Fehler im zunächst fehlenden Export der Vergleichslösungen wurde durch die Prüfung erkannt und vor dem finalen Export behoben.

## Lehrplan und Quellen

[RIS, Lehrpläne der Mittelschulen, Fassung vom 16.09.2026](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007850), Anlage 1, DGB 4. Klasse, Orientierung, am 16.09.2026 unmittelbar gelesen. Der zunächst versuchte Einzelabruf lieferte 503; die Gesamtfassung war anschließend erreichbar. Die Lerngelegenheiten beziehen sich auf Möglichkeiten/Grenzen von KI, argumentativen Umgang mit pauschaler Technikbegeisterung/-ablehnung und das Erkennen sowie Verändern normativer Auswahl und stereotyper Darstellungen. Der Anwendungsbereich Gesundheit und ein vertiefter Fall zu selbstfahrenden Fahrzeugen sind damit nicht vollständig bearbeitet.

[Saferinternet.at: Künstliche Intelligenz](https://www.saferinternet.at/themen/kuenstliche-intelligenz) und [KI-generierte Texte überprüfen](https://www.saferinternet.at/zielgruppen/lehrende/unterrichtsbeispiele/kuenstliche-intelligenz/stimmts-ki-generierte-texte-ueberpruefen), am 16.09.2026 geöffnet. Hintergrund für Möglichkeiten generativer Systeme und den Vergleich einzelner Aussagen mit Quellen. Alle Veranstaltungsdaten, Werbekarten, Auswahlwerte und Aufgaben sind eigenes erfundenes Unterrichtsmaterial. Keine tatsächliche Anbieterleistung oder gesellschaftliche Häufigkeit wird daraus abgeleitet.

Keine Übersetzungen und kein neuer vollständiger Suitenlauf. Der Titelindex wurde nach der Revision neu erzeugt. Vollständige fachliche Abnahme des gesamten Fachs, reale Unterrichtserprobung und die übrigen Produktanforderungen bleiben offen.
