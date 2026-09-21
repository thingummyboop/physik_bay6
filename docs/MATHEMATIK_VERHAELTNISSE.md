# Verhältnisse und Proportionen – dritte Klasse

Stand 21.09.2026. `math3_5_verhaeltnisse` ist auf Revision 2 erweitert: fünf Abschnitte, 13 bewertete Fragen, sieben Lernziele und sechs Zusammenfassungspunkte. Alte Ergebnisse gelten nicht als Nachweis für die erweiterte Fassung. Die Navigation ordnet das Kapitel der dritten Klasse (7. Schulstufe) zu.

## Fachlicher Ausgangsbefund

Das bisherige Kapitel wurde vollständig gelesen: Mischungsverhältnisse, zwei Anteile, Gesamtmenge, gleichwertige Verhältnisse und fünf bewertete Fragen waren vorhanden. Das Interaktionsskript prüfte ausschließlich die Mischung 2 + 10 = 12 Becher. Die Papierfassung hatte acht zufällige Kürzungsaufgaben ohne zugehörige erzeugte Lösungen. Der vorhandene Vergleichsabschnitt war noch nicht als druckbare Lösung ausgezeichnet.

Die gespeicherte RIS-Fassung vom 16.09.2026 nennt für die dritte Klasse das Aufstellen/Interpretieren von Termen, Gleichungen und Formeln im Zusammenhang mit Verhältnissen und das Umformen von Proportionen. Diese konkrete Lücke ist ergänzt. Der erneute Abruf der RIS-Seite am 21.09.2026 scheiterte mit HTTP 503; es wird keine neue Quellenverifikation behauptet. [Dokumentierter Quellenstand](LEHRPLAN_QUELLENSTAND.md). Direkte/indirekte Zuordnungen und Graphen sind zusätzlich im [Zuordnungskapitel](MATHEMATIK_ZUORDNUNGEN_KLASSE3.md) behandelt.

## Ergänzter Lernweg

| Inhalt | Erklärung und Tätigkeit |
| --- | --- |
| Gleichung aus zwei Verhältnissen | a/b = c/d, Nenner ungleich null; Multiplikation beider Seiten mit b · d begründet a · d = c · b. Auch die Rückrichtung benötigt die Nennerbedingungen. |
| Unbekannte Verhältniszahl | Acht Aufgaben mit x an jeder der vier Positionen, ganzzahligen und endlichen dezimalen Ergebnissen. Eigene Eingabe, Rückmeldung zu den beiden Kreuzprodukten, auf Wunsch vollständiger Rechenweg und Probe. x = 0 im Nenner wird eigens erklärt. |
| Formeln deuten | A = G · m/(m+n), B = G · n/(m+n); Gesamtmenge und Verhältnisparameter unterschieden. Verdoppeln von G verändert die Anteile; gemeinsames Verdoppeln von m und n erhält sie. |
| Einheiten | 250 ml : 1 l sowie kg/g; Abgrenzung zu einem Quotienten mit Einheit, etwa Euro je Heft. |
| Drei Gruppen | Zehn gleich große Teile im Verhältnis 2 : 3 : 5, statische beschriftete Grafik und eigener Streifenauftrag. |
| Grenzen eines Mengenmodells | 11 unteilbare Perlen lassen sich nicht exakt im Verhältnis 2 : 3 aufteilen. Gerundete Mengen können die Summe erhalten und trotzdem das Verhältnis verändern. Flüssigkeitsmengen und Messgenauigkeit werden getrennt behandelt. |

Die bestehende Mischungsprüfung bleibt erhalten. Beide Werkstätten haben eigenständige Papieralternativen. Vier Lösungsgruppen einschließlich des bisherigen Vergleichsabschnitts sind optional druckbar. Neben den fünf bisherigen direkten Vergleichsaufträgen stehen vier Proportions- und vier Kontextaufträge sowie die Papieralternative zur Mischungsprüfung zur Verfügung. Die Papierfassung enthält außerdem zwölf erzeugte Aufgaben zu Kürzen, unbekanntem Zähler/Nenner und Aufteilen, jeweils mit passenden Lösungen und Proben.

## Prüfung

- `scripts/test_ratio_reasoning.js`: alle 39 Antwortwege gegen einen unabhängig festgelegten Schlüssel; Revision 2, Wiederholungsbedarf und erneute Versuche. Acht Modelle mit unabhängigen Ergebnissen und Quotientenproben; Nullnenner, leere/ungültige Eingaben, Komma/Punkt, Enter, Zurücksetzen, Lösungsanzeige und unveränderter Lernstand. 300 erzeugte Aufgabenlösungen unabhängig auf Quotienten, Summe und vollständiges Kürzen geprüft. Die bisherige Unterscheidung zwischen falschem Verhältnis und falscher Gesamtmenge bleibt geprüft.
- `scripts/browser_ratio_proportions.js`: 204 Ansichten bei 320, 390 und 1280 Pixeln, hell/dunkel. Keine festgestellten Überläufe in den Werkstätten; Bedienelemente mindestens 44 Pixel hoch und SVG-Text mindestens 12 sichtbare Pixel. Tastatur, Fokus, Lösungsanzeige, Zurücksetzen, alle 39 Kapitelantwortwege mit tatsächlichem Neustart und Ergebnisspeicherung geprüft. Keine erfassten Browserfehler.
- Arbeitsblatt: beide Papieralternativen, vier Lösungsgruppen, statische Grafik und stabile erzeugte Aufgaben beim Umschalten der Lösungen geprüft. Alle zwölf Antworten des reproduzierbaren Exports unabhängig nachgerechnet. Alle 18 Druckseiten visuell gelesen; mobile Werkstatt und Grafik zusätzlich als Bilder geprüft. Eine weitere Sichtkontrolle zeigte ungünstig zerlegte Überschriften in der älteren Vergleichstabelle; gezielte mobile Spalten-/Schriftregeln und eine erlaubte Worttrennung korrigieren dies. Die gesamte Seite wurde bei allen sechs Breiten-/Themenkombinationen auf Überlauf geprüft, Tabelle und Mischungsprüfung visuell gelesen. Der anschließende reproduzierbare PDF-Export enthält 18 bildidentische Seiten.
- Materialprüfung für 96 STEM-Arbeitsblätter sowie Such- und Lernwegprüfungen bestanden. Inventar: 198 Kapitel; Prioritätsaudit 1895 Frageninstanzen, davon 668 Mathematik, ohne gemeldete Strukturfehler. Dies ist kein Vollständigkeitsnachweis für die Fächer.

Lokale Prüfbelege außerhalb des Repositorys: `../browser-qa/ratio-proportions/report.json`, `ratio-solutions.pdf`, `checked/ratio-solutions.pdf`, `extra-layout.json`, Seitenbilder und Bildschirmansichten. Das PDF ist ein internes Prüfarbeitsblatt. Änderungen nach dem angeforderten Zwischenstand `fe188ee` bleiben lokal.

Die hier festgestellten Kapitel- und Papierlücken sind bearbeitet. Der vollständige Abgleich der übrigen Mathematikbereiche, insbesondere der ersten Klasse, und die fachübergreifende Produktabnahme bleiben offen. Übersetzungen sind gemäß Nutzerwunsch zurückgestellt.
