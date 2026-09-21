# Prismen und Pyramiden: Darstellung, Masse und Dichte

Stand 21.09.2026; `math3_9_koerper`, Revision 3, 3. Klasse / 7. Schulstufe. Lokale Änderungen nach `be546e6`, noch nicht erneut gepusht.

## Befund und Lerngelegenheiten

Alle vier bisherigen Abschnitte, neun Prüfungsfragen, das Netzmodell, der Volumenvergleich und die Materialkistenwerkstatt wurden vollständig gelesen. Die relevante Präzisierung zu Figuren und Körpern in der gespeicherten RIS-Fassung vom 16.09.2026 wurde erneut geprüft: Schrägrisse gerader Prismen und Pyramiden sowie Sachaufgaben insbesondere zu Massen und Dichten sind ausdrücklich genannt. Die bisherigen Inhalte enthielten keine ausgeführte Schrägriss-Anleitung und keine Masse-/Dichteaufgabe. Dies ist ein Abgleich mit der gespeicherten Quelle, kein neuer Abruf der geltenden Rechtsfassung.

Zwei neue Abschnitte ergänzen diese Lerngelegenheiten:

| Anforderung | Konkrete Umsetzung |
|---|---|
| Körper darstellen | Dreiecksprisma und quadratische Pyramide: je vier Zeichenschritte, eigene SVG-Schrägrisse mit verdeckten Kanten; ausdrücklich festgelegte Konvention 45° und halbe Tiefenlänge. Tatsächliche Maße und gezeichnete Maße werden getrennt. |
| Körperhöhen unterscheiden | Im Prismabild liegt das Grunddreieck vorne; seine Höhe ist von der Tiefenrichtung des Körpers getrennt. Die Pyramidenzeichnung zeigt Spitze, Grundflächenmittelpunkt und senkrechte Höhe; Aufgaben unterscheiden diese von Seitenkante und Seitendreieckshöhe. |
| Masse aus Volumen berechnen | Eigener Rechenweg über G, V und m = ρ · V. Interaktive Vorhersage mit Quader, rechtwinkligem Dreiecksprisma und quadratischer Pyramide, jeweils drei Höhen und drei ausdrücklich erfundenen Werkstoffdichten. |
| Dichte berechnen und deuten | ρ = m / V mit Einheitenrechnung, umgekehrter Aufgabe und Plan für eigene Kanten-/Massenmessungen. Mittlere Dichte identifiziert keinen Werkstoff eindeutig. |
| Sachrechnungen beurteilen | Hohlräume und mehrere Werkstoffe, Masse in g/kg, passendes Werkstoffvolumen und Vergleich von Prisma/Pyramide bei gleicher Dichte. Die vorhandene fiktive Wiener Materialkiste bleibt als Werkstatt erhalten. |

Sechs neue direkte Aufgaben, fünf neue bewertete Fragen, zwei Vergleichslösungen und drei vollständige Papier-Rechenfälle. Das Kapitel hat jetzt sechs Abschnitte plus Werkstatt und 14 bewertete Fragen; alte Frage-IDs bleiben erhalten. Die Massenprüfung bewertet nur den Zahlenwert und erklärt dies. Aufgaben verlangen zusätzlich eigene Rechenwege, Konstruktionen und Begründungen. Kein Punkt- oder Speichereffekt der neuen Werkstatt.

## Bedienung und Darstellung

Alle Angaben stehen als lesbarer Text neben kurzen Auswahlbezeichnungen. Komma und Punkt werden bei Zahlen akzeptiert; leere, negative, nullwertige oder fremde Eingaben erhalten einen Eingabehinweis. Geänderte Angaben entfernen alte Antworten/Rückmeldungen. Enter prüft, Reset setzt Auswahl und Fokus zurück; wiederholte Initialisierung verdoppelt keine Ereignisse.

Der vorhandene Gegenstandsvergleich funktioniert nun ebenfalls mit Enter und entfernt überholtes Feedback beim Tippen. Seine Eingabe besitzt ausreichende Höhe und verwendet die gewählten Farben. Der bestehende Volumenvergleich setzt den Fokus beim Reset auf den ersten Regler.

Die Pyramiden-Höhenbeschriftung wurde nach Sichtprüfung außerhalb der Kanten mit einer Hinweislinie angeordnet. Die vorhandene Netzzeichnung bleibt mindestens 360 Pixel breit und lässt sich auf kleinen Bildschirmen seitlich verschieben, auch per Pfeiltaste in einer benannten Region. Die Breitenbeschriftungen liegen innerhalb ihrer Rechtecke, ohne Kanten zu überlagern. Die Auswahl der Körper-/Netzansicht und der Flächengruppen bleibt erhalten.

## Prüfungen

- `test_solid_mass.js`: 27 unabhängig berechnete Massenfälle, falsche und ungültige Antworten, Fokus, Enter, Reset, erneute Initialisierung und unveränderter Speicher. Die statischen Projektionen werden anhand von Längen, 45°-Verschiebung, Mittelpunktslage und senkrechter Höhe unabhängig nachgerechnet. Alle 39 Antwortwege der 14 bewerteten Fragen mit 100/93-Prozent-Ergebnis, Wiederholungs-IDs und passender Rückmeldung geprüft. Revision 2 gilt nicht mehr als aktueller Nachweis. Aufgaben, Zeichnungen, Papieralternative und getrennte Lösungen geprüft; nach den Darstellungsänderungen erneut bestanden.
- `test_solid_chapter.js`: bestehende 400 Volumenvergleiche, sechs Netz-/Flächenauswahlen, einzelne Netzflächen, Eingaben, Reset und Lernstandsrevision weiterhin bestanden; nach der abschließenden Verschiebung der Netzbeschriftungen erneut bestanden. `test_prism_geometry.js` ebenfalls bestanden.
- `browser_solid_mass.js`, 11:51:12 UTC, Chromium 151.0.7922.34: 27 native Massenrechnungen, 18 Layoutkombinationen aus drei Körpern, drei Breiten und zwei Farbschemata, Tastatur/Fokus, unveränderter Speicher und alle 39 bewerteten Antwortwege bestanden. Keine Browserfehler. 14 mobile Detailbilder kontrolliert.
- Ergänzungsbericht 11:52:04 UTC: korrigierte Pyramidenbeschriftung, ausreichende Eingabehöhe, stabile Farben und seitliches Verschieben des Netzes in sechs Layouts geprüft; zehn zusätzliche Detailbilder gelesen. Schlussprüfung 11:54:11 UTC: drei Netzbreitenlabels bei allen drei Flächenauswahlen innerhalb der jeweiligen Flächen und frei von Kantenüberlagerung; Tastaturscrollen erneut geprüft und finales Detailbild gelesen.
- Druckfassung vom 11:52:04 UTC: alle 18 A4-Seiten visuell kontrolliert. Neue Schrägrisse, Zeichenschritte, Masse-/Dichteaufgaben und Vergleichslösungen sind lesbar. Die spätere Verschiebung der Bildschirm-Netzlabels verändert diese Druckfassung nicht. PDF und Bilder liegen als interne Prüfergebnisse außerhalb des Repositorys.
- Gemeinsame Arbeitsblattprüfung für 95 Mathematik-/Chemie-/Biologiekapitel, Revisionsprüfung und Mathematik-Zugänglichkeitsindikatoren bestanden. Syntax aller 106 Themenskripte geprüft. Inventar: 197 Kapitel; Prioritätsaudit: 1.719 Frageninstanzen ohne Strukturfehler. Kein vollständiger neuer Suitenlauf und keine echte Screenreader-Prüfung.

## Grenzen und nächster Umfang

Die zwei festgestellten Inhaltslücken sind bearbeitet. Reale Schülerzeichnungen, Arbeit mit Messgeräten und praktische Unterrichtserprobung sind damit nicht durchgeführt. Eine vollständige Kompetenzmatrix sämtlicher Mathematikklassen, weitere Fachprüfungen und die Gesamtproduktabnahme bleiben offen. Übersetzungen sind weiterhin zurückgestellt.
