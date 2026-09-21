# Flächen: Umkehraufgaben und regelmäßiges Sechseck

Stand 21.09.2026, Kapitel `math3_4_flaechensatz`, 3. Klasse / 7. Schulstufe, Revision 2. Lokale Änderungen nach Zwischenstand `be546e6`, noch nicht erneut gepusht.

## Befund und Ergänzung

Der vollständige bisherige deutsche Kapiteltext wurde gelesen: vier Abschnitte, acht Verständnisfragen, das bestehende Flächenlabor und die Grundrisswerkstatt. Es fehlten ausgeführte Umkehraufgaben und eine Konstruktion regelmäßiger Sechsecke. Beide sind in der gespeicherten RIS-Fassung vom 16.09.2026 bei Mathematik, 3. Klasse, Figuren und Körper ausdrücklich genannt. Die betreffende Kompetenzpräzisierung wurde erneut gelesen; kein neuer Abruf der rechtlichen Fassung behauptet.

Zwei neue Abschnitte ergänzen sechs direkte Arbeitsaufträge, sechs bewertete Fragen, zwei Papieralternativen und zwei ausführliche Vergleichslösungen. Bestehende acht Frage-IDs und Modelle bleiben erhalten; die Grundrisswerkstatt folgt als Abschnitt 7. Lernziele, Zusammenfassung und Revisionskennung berücksichtigen den neuen Prüfungsstoff.

- **Umkehraufgaben:** Dreieck und Trapez schrittweise nach h umformen, Klammern und passende Einheiten beachten, Einsetzprobe durchführen. Rechteckbeispiele zeigen, dass A allein die Höhe nicht bestimmt. Drei Eingabefälle für Dreieck, Trapez und Parallelogramm prüfen eine Höhe; Komma und Punkt sind möglich. Unzulässige Eingaben werden nicht als Rechenfehler bewertet. Die automatische Prüfung bezieht sich ausdrücklich nur auf den Zahlenwert, nicht auf den gesamten Lösungsweg.
- **Sechseck:** sechs konkrete Zirkel-/Linealschritte; Schnittpunktwahl, unveränderte Zirkelöffnung und Zeichnungenauigkeit. Drei Radien mit jeweils sieben Zuständen zeigen Hilfskreis, Radius, neue Seite und Abschluss. Das fertige regelmäßige Sechseck zerfällt in sechs gleichseitige Dreiecke. Eine eigene statische Zeichnung unterscheidet Radius und senkrechte Dreieckshöhe. Umfang, angenäherter Flächeninhalt und Verdopplung der Längen werden begründet.

Die Konstruktion ist ein ideales Modell ohne Zentimetermaßstab am Bildschirm. Die tatsächliche Arbeit mit Zirkel und Lineal bleibt als eigener Auftrag erforderlich. Die Flächenbeispiele geben gerundete Höhen ausdrücklich als Näherungen an. Keine neue Übersetzung; ältere Übersetzungen wechseln wie vorgesehen zur gekennzeichneten aktuellen deutschen Fassung.

## Nachweise

- `test_area_extensions.js`: 21 Zustände anhand unabhängig geprüfter Radien, Seitenlängen, Zirkel-Schnittpunkte und Polygonflächen; vor/zurück, Ende/Start, Fokus, erneute Initialisierung, Reset und unveränderter Speicher. Drei Rechenfälle, richtige/falsche/ungültige Eingaben, Dezimalkomma/-punkt und Enter. Alle 42 Antwortwege der 14 Kapitelprüfungsfragen mit 100/93-Prozent-Ergebnis, passenden Wiederholungs-IDs und Antwortbegründungen. Revision 1 ist kein aktueller Nachweis mehr. Papieralternativen, sechs Aufgaben und getrennte Lösungen geprüft. Nach der mobilen Textkorrektur erneut bestanden.
- `test_area_chapter.js`: bestehendes Flächenmodell weiterhin gegen Polygonflächen und Darstellungsgrenzen geprüft; Zuordnungswerkstatt erhalten. Die alten Sprachprüfungen erwarten nun den vorgesehenen Rückfall zur neuen deutschen Inhaltsfassung, ohne Sprachdateien zu verändern.
- `browser_area_extensions.js`, Bericht 11:36:07 UTC, Chromium 151.0.7922.34: 21 native Konstruktionszustände, 54 Layoutfälle in 320/390/1280 Pixel Breite und zwei Farbschemata, Eingaben, Tastatur/Fokus, unveränderter Speicher und sämtliche 42 bewerteten Antwortwege bestanden. Keine Browserfehler.
- Mobile Sichtprüfung fand abgeschnittene Maße im langen Auswahltext. Auswahl auf den Figurennamen verkürzt; vollständige Aufgabenmaße stehen nun darunter. Ergänzungsbericht 11:37:19 UTC: 18 Aufgabenansichten und zwölf Konstruktionsansichten geprüft. Acht endgültige hochauflösende Detailbilder in beiden Farbschemata tatsächlich gelesen; Skizzen, Beschriftungen und Maße sichtbar.
- Druckfassung vom 11:37:19 UTC: alle 17 A4-Seiten gelesen, Seiten 11/12 zusätzlich höher aufgelöst. Enthält die vorhandenen generierten Aufgaben, 14 Verständnisfragen, die neue Zeichnung, Papieraufträge und Lösungen. Keine abgeschnittenen Texte oder überlagerten Grafiken festgestellt. Die lokale Vorschauadresse im internen Prüfdokument ist kein veröffentlichtes Unterrichtsmaterial.
- Gemeinsame Arbeitsblattprüfung für 95 Mathematik-/Chemie-/Biologiekapitel und Revisionsprüfung bestanden. Syntax aller 106 Themenskripte geprüft. Inventar: 197 Kapitel; struktureller Prioritätsaudit: 1.714 Frageninstanzen ohne Befund. Kein vollständiger neuer Suitenlauf.

Der zusätzliche Mathematik-Zugänglichkeitsaudit meldete im unveränderten Zuordnungskapitel fälschlich ein fehlendes Live-Attribut trotz `role="status"`. Die vorhandene Statusrolle wurde im Quellcode geprüft; sie enthält implizit `aria-live="polite"` gemäß [W3C ARIA22](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22), am 21.09.2026 gelesen. Der Quelltextindikator berücksichtigt diese Rolle jetzt; der Audit besteht für 41 Katalogkapitel. Seine Aussage bleibt auf Quelltextindikatoren und die vorhandene Prüfung initialisierter Flächenlabels begrenzt, nicht auf echte Screenreader-Nutzung.

## Verbleibender Umfang

Die zwei konkret festgestellten Lerngelegenheiten sind ergänzt und geprüft. Das ist keine vollständige Mathematik- oder Lehrplanabnahme. Weitere Fachprüfungen, die systematische Zuordnung sämtlicher Kompetenzen und die vollständige Produktabnahme bleiben offen. Reale Schülerkonstruktionen und Unterrichtstauglichkeit wurden nicht praktisch erprobt.
