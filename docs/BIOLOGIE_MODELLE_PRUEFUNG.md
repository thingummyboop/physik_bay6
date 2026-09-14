# Biologie: Modelle, Vergleichsdaten und vollständiger Selektionscheck

Stand 14.09.2026. Der vorherige Zielturn war Fortschritt mit zwei ausgearbeiteten DGB-Konfigurationsaufgaben. Diese Runde prüft die vorhandenen Biologie-Modelle tatsächlich im Browser und schließt eine nachgewiesene Lücke im Selektions-Fragenpool.

## Vollständiger Funktionstest vor den Biologie-Änderungen

Der abgeschlossene Bericht vom **2026-09-14T03:21:02.945Z** enthält **184 von 184 bestandene Funktionstestsuiten**. Der Lauf umfasst die zuvor ergänzte DGB-Leseansicht, den Medienvergleich und die Konfigurationsaufgaben. Während des Laufs wurden die geprüften Produktdateien nicht verändert. Das neue Biologie-Browserskript ist kein Teil dieses Funktionstest-Runners.

Erst nach Abschluss wurden die folgenden Biologie-Inhalte und Darstellungen geändert. Für diese Änderungen wurden die betroffenen Tests gezielt erneut ausgeführt. Der 184-Suiten-Lauf ist daher kein neuer Gesamtnachweis für den nachfolgenden Biologie-Stand. Automatisierte Funktionstests beweisen auch keine vollständige fachliche oder visuelle Abnahme.

## Inhaltliche Korrekturen

Das Selektionskapitel enthielt zusätzlich zu fünf Abschnittsfragen sechs Fragen in `diplom.questions`. Die bisherige Evolutions-/Selektionsprüfung erfasste nur die fünf Abschnittsfragen. Alle sechs zusätzlichen Fragen wurden jetzt vollständig gelesen und überarbeitet: Fortpflanzungserfolg gegenüber bloßem Überleben, kontrollierter Untergrundvergleich, örtliche Population, nicht definierter Anteil bei null Gesamtbestand, Zusammensetzung gegenüber Umfärbung sowie Aussagegrenzen einer Datentabelle. Die Antwortalternativen greifen konkrete Verwechslungen auf und besitzen jeweils eine eigene Erklärung.

Die sechs Fragen stehen nun bei den passenden Abschnitten; ihre IDs bleiben erhalten. Dadurch führt die gezielte Wiederholung zu einer konkreten Erklärung. Insgesamt weiterhin elf bewertete Fragen; Revision 3 macht ältere Ergebnisse veraltet.

Die Faltertabelle im fünften Abschnitt ist jetzt ausdrücklich eine eigene erfundene Datengeschichte mit vier Zeitpunkten und je 20 betrachteten Faltern. Sie ist kein Protokoll des Papiermodells: Dessen farbgleiche Verdopplung würde nicht automatisch diese Zahlen erzeugen. Die Auswertung trennt Zahlenbeschreibung und mögliche Tarnungserklärung. Tabellenüberschrift und Zeilenbezeichnungen, Kopf- und Zeilenbezüge sowie Lernziel und Zusammenfassung präzisiert. Im Grundtext werden Vererbbarkeit und offene Untersuchungsergebnisse deutlicher; die Einstiegsaufgabe vergleicht Blätter derselben Pflanzenart und zieht aus dem Aussehen keinen Vererbungsnachweis.

Fachliche Grundlage für Fortpflanzungserfolg, vererbbare Unterschiede und vorhandene Variation: [OpenStax Biology 2e, Adaptive Evolution](https://openstax.org/books/biology-2e/pages/19-3-adaptive-evolution), am 14.09.2026 geöffnet. Die neuen Zahlenfälle und Fragen sind eigene Unterrichtsaufgaben. Keine neue Naturstudie oder reale Birkenspannerbeobachtung wird behauptet.

## Bedienung und Druck

Die zwei Zahleneingaben der Selektions-Rechenhilfe waren im echten Browser nur kleine Standardfelder. Sie nutzen jetzt die Schrift der Seite und mindestens 44 Pixel Höhe. Die Wiederholungstabelle verwendet die vorhandene Biologie-Tabellengestaltung. Generationen- und Neustartprotokoll besitzen im Druck 12 mm hohe Eingabezellen.

Die breite Merkmals- und Protokolltabellenansicht erzeugt keinen horizontalen Überlauf der Seite. Die vorhandenen benannten Scrollbereiche sind per Tab erreichbar; mit Pfeiltasten lassen sich die Spalten erreichen. Dies wurde im neuen Browserlauf einschließlich des rechten Scrollendes geprüft. Passende Tabellen ohne Überbreite benötigen keinen eigenen Scrollbereich.

`browser_biology_models.js` prüft 81 Kombinationen der Wirbeltier-Merkmalskarten gegen unabhängige Merkmalsmengen und 121 eingegebene Selektionsrechnungen. Dazu kommen ungültige Eingaben, Leeren und Fokus, Eingabetaste, unveränderte Quizspeicherung bei den Modellen, sämtliche 33 Selektions-Übungsantwortwege per Tastatur sowie je ein 91-Prozent-Kapitelversuch beider Kapitel mit passendem Wiederholungsabschnitt. Zwölf Kombinationen aus 320/390/1280 Pixeln und hellem/dunklem Design werden auf Seitenüberlauf geprüft. Keine Prüfung eines physischen Geräts oder Screenreaders.

Die erweiterten Funktionstests umfassen alle 33 Antwortwege des Selektionskapitels mit unabhängig festgelegten richtigen Optionen, Abschnittszuordnung und Revision sowie weiterhin 15 Evolutions-Antwortwege und 121 Rechenfälle. Die bestehende Wirbeltierprüfung mit 81 Modellfällen und 33 Kapitelantwortwegen, 95 STEM-Arbeitsblätter und Titelindexprüfung bestanden ebenfalls nach den Biologie-Änderungen.

Mobile Modellansichten und ausgewählte Tabellen wurden tatsächlich visuell gelesen. Bei Wirbeltieren wurden die Karten und der Entscheidungsweg auf A4-Seiten 10–11 gelesen; bei Selektion wurden die Regel-/Rechenhilfe-/Protokollseiten und anschließend die geänderten Protokolle und die Datengeschichte betrachtet. Dies ist keine Sichtprüfung sämtlicher Seiten beider Kapitel.

## Verbleibender Umfang

Die Rechenhilfe führt keinen Suchversuch aus. Die Merkmalskarten bestimmen keine unbekannte reale Art. Praktische Unterrichtserprobung, vollständige W/E/S-Zuordnung aller 39 Biologiekapitel, deren vollständige fachliche Prüfung und die Produktabnahme bleiben offen. Auch die generischen Trainingsformulierungen im Biologiebestand sind nicht durch diesen Prüfschritt vollständig überarbeitet. Übersetzungen bleiben zurückgestellt. Änderungen nach 8415e67 sind lokal; in dieser Runde kein Push. Der Gesamtauftrag bleibt aktiv.

Abschließender nativer Browserbericht: 2026-09-14T03:28:17.244Z, Chromium 151.0.7922.34, keine gemeldeten Seitenfehler. Letzte Selektions-PDF-Ausgabe: 23 Seiten; die geänderten Seiten 7, 10 und 13 tatsächlich visuell gelesen. Die Wirbeltierausgabe hat 22 Seiten.
