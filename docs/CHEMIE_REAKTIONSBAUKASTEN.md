# Reaktionsbaukasten: lesbare Teilchenbilder und Atombilanzen

Stand 16.09.2026, Chemie 4. Klasse / 8. Schulstufe. Lokale Weiterarbeit nach ba3f5d9. Die Fallwerkstatt aus CHEMIE_REAKTIONSBELEGE.md bleibt erhalten. Die zwölf bewerteten Fragen und Inhaltsrevision 3 sind unverändert.

## Verbesserung

Die bisherige Gesamtzeichnung verkleinerte Moleküle intern auf 23 Prozent und anschließend nochmals entsprechend der Bildschirmbreite. Dadurch waren die Atomsymbole besonders am Handy kaum lesbar. Jetzt erhält jedes eingestellte Molekül eine eigene Zeichnung mit 100 × 100 CSS-Pixeln und mindestens 16 Pixel großen Atomsymbolen. Benannte Karten gruppieren Moleküle nach Stoff und Seite der Gleichung. Sie ordnen sich auf schmalen Bildschirmen untereinander an. Gleichung, Anzahl pro Stoff, Zusammensetzung je Molekül, Atombilanz und gesamte Molekülzahlen sind zusätzlich in normal großem Text verfügbar.

Der Einstieg beginnt mit Wasserbildung, danach folgen Peroxidzerlegung und Methanverbrennung. Die Zahlenfelder sind als linke beziehungsweise rechte Seite beschriftet; nicht benötigte Felder verschwinden beim Reaktionswechsel. Ganze Zahlen von 0 bis 9 bleiben einstellbar. Ungültige oder leere Angaben werden nicht gerundet und zeigen keine scheinbar gültige Bilanz. Rücksetzen lädt Einsen für die aktuell gewählte Reaktion; Fokus und Auswahl bleiben nachvollziehbar. Die Werkstatt vergibt keine Punkte und schreibt nichts in den Lernstandsspeicher.

Rückmeldungen unterscheiden fehlende Stoffe, unterschiedliche Atomzahlen, gültige ganzzahlige Vielfache und das kleinste Verhältnis. Die leere Gleichung wird ausdrücklich nicht als dargestellte Reaktion akzeptiert. Eine gesonderte Molekülzählung verdeutlicht, dass nur die Anzahl jeder Atomsorte erhalten bleiben muss. Die Bilder sind Zählhilfen; sie behaupten weder eine räumlich korrekte Molekülgeometrie noch einen zeitlichen Reaktionsablauf. Ein rechnerisch nicht ausgeglichener Eingabezustand wird als Vergleich der eingestellten Teilchenzahlen gezeigt, nicht als mögliche Stoffumwandlung ausgegeben.

Vier begleitende Arbeitsaufträge verbinden Vorhersage, Ausgleichen, Verdoppeln/Kürzen, Nullfälle und begründete Korrektur. Die Papieralternative enthält für alle drei Reaktionen je ein Molekül jedes vorgegebenen Stoffes, eine unausgefüllte Atombilanz und Platz für die eigene ausgeglichene Gleichung. Zehn statische Molekülzeichnungen bleiben im Druck erhalten. Vergleichslösungen werden getrennt zugeschaltet. Die bestehenden Aufgaben zu Wort-, Formel- und Teilchendarstellung bleiben nutzbar.

## Fachliche Grundlage

[ACS Middle School Chemistry, Lesson 6.1](https://www.acs.org/middleschoolchemistry/lessonplans/chapter6/lesson1.html), am 16.09.2026 erneut geöffnet: Unterscheidung von Koeffizient und Index, Erhaltung jeder Atomsorte und Grenzen schematischer Teilchenbilder. Eigene Darstellung und Rückmeldungen; keine fremden Abbildungen übernommen. Die Reaktionsgleichungen und die praktische Peroxid-Anleitung waren bereits Bestandteil des Kapitels. Keine neuen praktischen Durchführungsbedingungen hinzugefügt.

## Nachweise

- `test_reaction_builder.js`: Alle 12.000 Zahlenkombinationen von 0 bis 9 für die drei vorhandenen Reaktionen unabhängig nachgerechnet. Genau zwölf positive ausgeglichene Einstellungen im gegebenen Bereich, einschließlich Vielfachen; Atomzahlen, Gültigkeit und Kürzungsfaktor stimmen. Unbekannte Reaktionen und ungültige Zahlen werden zurückgewiesen.
- 55 gerenderte Zustände mit unabhängig gezählten Atomsymbolen auf beiden Seiten, Tabellenzahlen und Molekülanzahlen geprüft. Nullfälle, fehlende Stoffe, gültige Vielfache, Eingabefehler, sichtbare Reaktionsauswahl, Fokus/Reset, wiederholte Initialisierung und unveränderter Speicher bestanden. Drei Papierfälle, zehn statische Zeichnungen, vier Arbeitsaufträge und Lösungstrennung ebenfalls geprüft.
- `test_chemistry_reactions.js`: Bestehende 125 Peroxidfälle, Wasser- und Methanbeispiele sowie Eingabeprüfungen weiter bestanden. Der Test wählt Methan jetzt ausdrücklich aus, da der neue Einstieg Wasserbildung zeigt.
- Alle 15 Chemie-Suiten, die Fallprüfung mit 36 Kapitelantwortwegen und die Prüfung der 95 STEM-Arbeitsblätter bestanden; Bericht 2026-09-16T14:19:59.572Z. Kein neuer Gesamtlauf aller Fächer.
- `browser_reaction_builder.js`: Chromium 151.0.7922.34, Bericht 2026-09-16T14:14:14.273Z. 18 tatsächlich bediente Modellzustände, 40 ungültige Eingaben, Fokus/Reset/Speicher und 54 Layoutfälle bei 320/390/1280 px in beiden Designs bestanden. Die Layoutfälle schließen alle Nullen und neun Moleküle pro Stoff ein. Atomsymbole innerhalb ihrer Zeichnungsgrenzen und mindestens 16 CSS-Pixel groß; kein Seitenüberlauf oder Seitenfehler.
- Sichtprüfung zeigte zunächst zu große Druckgrafiken: Eine allgemeine Druckregel überschrieb ihre gewünschte Größe. Spezifische Begrenzung auf 26 mm korrigiert; zehn Grafikbreiten im Druckmodus gemessen. Die Reihenfolge auf Papier entspricht jetzt dem Einstieg Wasser → Peroxid → Methan. Sechs weitere Breiten-/Designzustände bestanden, Bericht 2026-09-16T14:16:32.336Z.
- Abschließend native Pfeiltasten zum Ausgleichen der Wasserbildung sowie beide Textfarben nach Ende des vorhandenen Designwechsels geprüft. Die erste dunkle Gesamtaufnahme war noch während dieses Übergangs entstanden; sie wurde durch eine Aufnahme des fertigen Zustands ersetzt. Abschließender Export 2026-09-16T14:19:26.819Z, 23 Seiten. Seiten 5–9 und 22–23 gerendert und gelesen. Nach dem Zusammenhalten der Lösungsabsätze 22–23 erneut gelesen; 5–9 per Bild-Hash unverändert. Ausgewählte helle/dunkle Modellansichten und die vollständige dunkle mobile Werkstatt gelesen. Keine Sichtprüfung aller 23 Seiten behauptet.

## Verbleibende Gesamtarbeit

Diese Prüfung schließt die dokumentierte Lücke im vorhandenen Reaktionsbaukasten, aber keine vollständige Chemie- oder Produktabnahme. Reale Unterrichtsversuche, konkrete Geräte und assistive Technologien wurden nicht erprobt. Weitere Kapitel, Modelle und Lehrplananforderungen bleiben Bestandteil des Gesamtauftrags. Übersetzungen bleiben zurückgestellt; Physik, Mathematik, Chemie, Biologie und DGB behalten Vorrang. Kein erneuter Push.
