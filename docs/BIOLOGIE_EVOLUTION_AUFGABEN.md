# Evolution: vollständiger Fragenpool und sichtbare Arbeitsaufträge

Stand 14.09.2026. Der vorige Zielturn war Fortschritt mit dem vollständig geprüften Selektionspool und den nativen Biologie-Modellen. Diese Runde betrifft `bio_1_evolution` sowie die nachgewiesene Ausblendung bereits ausgearbeiteter Pflanzenaufgaben.

## Inhalt und Zuordnung

Das Evolutionskapitel enthält fünf Abschnittsfragen und acht zusätzliche Abschlussfragen, insgesamt 13 bewertete Fragen. Die bisherige gezielte Prüfung umfasste nur die fünf Abschnittsfragen. Jetzt sind sämtliche 13 Fragen mit ihren Antwortalternativen und Rückmeldungen gelesen und geprüft. Sieben der acht Abschlussfragen wurden überarbeitet; die bereits passende Frage zur verschachtelten Zuordnung der Hauskatze bleibt inhaltlich erhalten. Alle acht stehen nun bei den entsprechenden Abschnitten, mit unveränderten IDs. Kapitelrevision 3 kennzeichnet ältere Ergebnisse als veraltet.

Die neuen Fälle betreffen Lebensmerkmale, die Aussagegrenze einer erfundenen Bläschenbildung, Anteile einer vererbbaren Farbvariante, den Umgang mit widersprechenden Befunden, Ranglistenfehler, Merkmalskombinationen und funktionelle Ähnlichkeit gegenüber enger Verwandtschaft. Jede falsche Option erhält eine passende Erklärung. Die Erklärtexte unterscheiden mögliche Veränderung und bestimmte Ursache deutlicher; die Wissenschaftsbegründung verweist unmittelbar auf überprüfte Befunde.

Alle fünf Erklärungstexte, die 20 Glossareinträge und alle Quizantworten wurden in dieser Runde textlich gelesen. Die 15 bisherigen allgemeinen Trainingskarten wurden durch konkrete Aufgaben ersetzt. Beispiele: Versuchsergebnis und historische Behauptung trennen, zwei Gruppen mit je zehn Symbolen vergleichen, gemeinsame Quellenherkunft nachzeichnen und die Hauskatze in ineinanderliegende Gruppen einordnen. Dies ist keine aktuelle Prüfung sämtlicher Forschungsangaben, Bilder oder Bildlizenzen.

## Ein im Browser nachgewiesener Darstellungsfehler

Der erste native Test fand trotz 15 verfasster Karten keine einzige angezeigte Trainingskarte. Die bestehende Funktion `mergeBiologyWorkAssignment` ersetzte die Karten durch eine ausgewählte Mini-Aufgabe und generierte Standardtexte. Die fünf Evolutionsabschnitte verwenden nun den bereits vorhandenen Modus `data-assignment-mode="direct"`, der die ausgearbeiteten Aufgaben erhält. Kein globales Renderer-Verhalten wurde geändert.

Die anschließende Prüfung zeigte denselben Befund bei den 15 zuvor ausgearbeiteten Blütenpflanzen-Aufgaben. Diese Texte wurden vollständig gelesen und ebenfalls auf den direkten Modus gestellt. Ihr Inhalt, ihre Fragen und ihre Kapitelrevision bleiben unverändert. Die Aufgaben waren zuvor im Papiermaterial vorhanden, wurden online aber durch die automatische Zusammenfassung verdrängt.

## Verifikation

Die erweiterte Funktionstest-Suite prüft jetzt alle 39 bewerteten Evolutions-Antwortwege und alle 33 Selektions-Antwortwege gegen unabhängig festgelegte richtige Optionen. Ergebnis, Rückmeldung, Wiederholungs-ID, Abschnitt und alte/aktuelle Revision sind eingeschlossen. Zusätzlich vergleicht sie in beiden betroffenen Aufgabenkapiteln alle 15 gerenderten Kartentexte mit den verfassten Texten und schließt die generierte Ersatzaufgabe aus. Die 121 bestehenden Selektionsrechnungen bleiben geprüft.

`browser_evolution_assessment.js` bedient alle 42 Evolutions-Übungsoptionen per Tastatur, einschließlich der drei Optionen einer zusätzlichen unbewerteten Übung. Zwei 92-Prozent-Versuche prüfen Wiederholungsfokus in verschiedenen Abschnitten; der zweite nutzt die echte Funktion zum erneuten Versuch. Die Übungen verändern keine Kapitelquiz-Ergebnisse. Je sechs Breiten-/Designzustände bei 320/390/1280 Pixeln prüfen Evolution und die wieder sichtbaren Pflanzenaufgaben auf Seitenüberlauf.

Die Papierprüfung erfasst 13 Fragen, 15 Evolutions-Arbeitsaufträge, 20 Glossareinträge und getrennt zuschaltbare Lösungen. Die 23-seitige Evolutionsausgabe wurde erzeugt; ausgewählte Seiten 5, 10 und 12 sowie mobile Aufgaben- und Antwortansichten wurden tatsächlich visuell gelesen. Das ist keine Sichtprüfung sämtlicher Seiten. Die 95 STEM-Arbeitsblattprüfungen und die Titelindexprüfung bestanden ebenfalls.

Der vollständige 184/184-Funktionstest vom 2026-09-14T03:21:02.945Z liegt vor den neuen Biologie-Änderungen. Für diese Runde wurden gezielte Prüfungen ausgeführt; kein neuer Gesamtlauf. Die Anzahl der Funktionstestsuiten bleibt 184.

## Quellen und offene Arbeit

Primärquellen für Wissenschaftsverständnis, Evolutionsbelege und Gruppenzuordnung, am 14.09.2026 recherchiert:

- [OpenStax Biology 2e: The Science of Biology](https://openstax.org/books/biology-2e/pages/1-1-the-science-of-biology).
- [OpenStax Biology 2e: Understanding Evolution](https://openstax.org/books/biology-2e/pages/18-1-understanding-evolution).
- [OpenStax Biology 2e: Chordates](https://openstax.org/books/biology-2e/pages/29-1-chordates).

Die Aufgaben und Zahlenbeispiele sind eigene Unterrichtsmaterialien. Eine Laboruntersuchung oder Unterrichtserprobung wurde nicht durchgeführt. Die übrigen automatisch zusammengefassten Biologie-Aufgaben, der vollständige W/E/S-Abgleich aller 39 Kapitel, aktuelle fachliche Detailprüfungen und die Gesamtproduktabnahme bleiben offen. Übersetzungen sind zurückgestellt. Änderungen nach 8415e67 bleiben lokal; kein neuer Push. Der vollständige Auftrag bleibt aktiv.

Abschließender nativer Browserbericht: 2026-09-14T03:42:33.782Z, Chromium 151.0.7922.34, keine gemeldeten Seitenfehler.
