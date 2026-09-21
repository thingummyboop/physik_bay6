# Boden: faire Vergleiche und begründeter Bodenschutz

Stand: 21.09.2026. Kapitel `bio_3_boden_mikroorganismen`, Revision 2, für die 7. Schulstufe. Voraussetzungen: Ökosysteme und Geologie/Lebensräume.

## Ausarbeitung

Vier Abschnitte mit zwölf direkten Arbeitsaufträgen, 16 Fachbegriffen, zehn bewerteten Fragen, einer punktfreien Übung und vier getrennten Vergleichslösungen. Die vier bisherigen Abschnittsfrage-IDs und die Übungs-ID bleiben erhalten. Der frühere separate Diplom-Pool wird durch den zusammengeführten, inhaltlich überarbeiteten Kapitelpool ersetzt. Frühere Ergebnisse gelten durch Revision 2 als veraltet, bleiben aber erhalten.

- Eigenes Bodenprofil und Bestandteiltabelle: Horizonte unterscheiden sich von Poren; eine dunkle Farbe ist kein umfassender Qualitätsnachweis. Eine fiktive Probenkarte ermöglicht alle Aufgaben ohne eigenes Sammeln. Eine bereitgestellte unbedenkliche Probe ist optional.
- Drei Rollenkarten und ein eigenes Stoffwegschema erklären Zerkleinerung, mikrobiellen Abbau, Mineralisierung und Pflanzenbezug. CO₂-Abgabe und länger verbleibende organische Substanz ergänzen den vereinfachten Weg. Nicht alle Bodenorganismen werden als Zersetzer eingeordnet. Mykorrhiza ist ein Beispiel für Stoffaustausch mit lebenden Pflanzen.
- Vergleichswerkstatt mit vier erfundenen Ansätzen: A/B bei 20 °C, C/D bei 8 °C; jeweils feucht oder trocken. Jede Variante enthält drei unabhängige Laubproben mit anfangs 10 g Trockenmasse und gleicher Dauer von vier Wochen. Mittlere Restmassen A/B/C/D: 6/8,5/8/9 g; Verluste 4/1,5/2/1 g bzw. 40/15/20/10 Prozent. Die Zahlen sind Unterrichtsmaterial, keine berichteten Experimente oder Vorhersage für echte Böden.
- Lernende wählen Feuchte oder Temperatur als untersuchten Einfluss und zwei Ansätze. Alle 32 Kombinationen werden ausgewertet: acht passende Vergleiche, acht Vergleiche zum anderen Einfluss, acht mit gleichzeitig veränderten Bedingungen und acht mit identischem Ansatz. Rückmeldungen begründen die Einordnung und rechnen Mittelwerte und Verluste vor. Eine kleinere Restmasse belegt keinen entsprechend großen Humuszuwachs; Auswaschung und Bruchstücke sind mögliche zusätzliche Verlustwege. Die Übung speichert nichts und vergibt keine Punkte. Änderungen löschen alte Ergebnisse, Rücksetzen stellt den Ausgangsvergleich wieder her.
- Verdichtung, Versiegelung und Wurzelatmung werden unterschieden. Die bereits vorhandene Durchlaufaufgabe mit 100 ml je Probe und 70/20 ml aufgefangenem Wasser wird präzisiert: 30/80 ml nicht aufgefangen sind keine langfristig pflanzenverfügbaren Mengen. Ein Beetfall verlangt alternative Erklärungen und passende Beobachtungen.
- Ein fiktiver 240-m²-Schulhof verbindet Flächenrechnung mit Nutzbarkeit. Ausgangszustand 160 m² dicht/80 m² offen; Plan B 120/120; Plan C 60/180. Die ausdrücklich aufgabeninterne Mindestfläche von 100 m² geeigneter Befestigung erfüllen A und B. B erweitert zusätzlich offene Fläche. Verglichen werden Prozent und Prozentpunkte; Untergrund, Kosten und Wurzelschutz bleiben vor Ausführung zu klären. Das Wiener Schwammstadt-Prinzip liefert einen realen regionalen Bezug.

## Prüfungen

- `scripts/test_soil_comparisons.js`: alle 32 Einordnungen anhand separat festgelegter Matrizen geprüft. Vier Rechenergebnisse, tatsächlich dargestellte Ausgangstabellen, Entfernen alter Ergebnisse, drei ungültige Auswahlfälle, Rücksetzen/Fokus, doppelte Initialisierung und unveränderter Speicher bestanden. Alle 30 Quizantwortwege anhand unabhängiger Schlüssel mit passenden Rückmeldungen, 90 Prozent bei einer falschen Antwort und korrekter Wiederholungszuordnung geprüft. Zwölf direkte Aufgaben bleiben im Renderer unverändert. 16 Begriffe, zwei eigene Schemata und vollständige Papieralternative mit getrennten Lösungen geprüft.
- `scripts/browser_soil_comparisons.js`: Chromium 151.0.7922.34, Bericht 21.09.2026, 07:24:28 UTC. Alle 32 Vergleiche nativ ausgewählt; 30 Layoutzustände aus fünf repräsentativen Ausgaben bei 320/390/1280 Pixeln und beiden Farbschemata geprüft. Kein horizontaler Seiten-/Ergebnisüberlauf, Bedienelemente mindestens 44 Pixel hoch, passende Kartenfarben. Native Tastatur, Fokus, Rücksetzen und Verwerfen alter Ergebnisse bestanden. Alle 30 Quizantwortwege im Browser geprüft, keine Browserfehler.
- Alle 18 mobilen Detailbilder gelesen; dunkles Stoffwegschema zusätzlich bei 320 Pixeln neu aufgenommen und gelesen. Alle 20 Seiten der Druckfassung einschließlich Quellen und Lösungen visuell kontrolliert. Seiten 14, 15 und 17 zusätzlich höher aufgelöst geprüft. Keine abgeschnittenen Inhalte festgestellt; Vergleichslösungen bleiben zusammen.
- Gemeinsame Materialprüfung für 95 STEM-Arbeitsblätter, Kapitelrevisionen, vollständige Quizpools für 13 zuvor ausgebaute Kapitel und Syntax aller 96 Themenskripte bestanden. Inventar 197 Kapitel; Prioritätsaudit 1.665 Frageninstanzen ohne Strukturfehler. Kein neuer Gesamtsuitenlauf und keine vollständige Fach- oder Produktabnahme.

Browser-/Druckberichte und Bilder liegen lokal außerhalb des Repositorys unter `../browser-qa/soil`. Die Werkstatt beurteilt den ausdrücklich festgelegten Versuchsplan; sie simuliert weder echte Zersetzungsraten noch einen gesamten Boden. Eine kurze Einzelmessung, ein Mittelwert oder eine reine Flächenbilanz werden nicht als allgemeines Umwelturteil ausgegeben.

## Quellen und Lehrplan

Am 21.09.2026 gegengeprüft:

- [Umweltbundesamt Deutschland: Entwicklung des Bodens](https://www.umweltbundesamt.de/themen/boden-flaeche/kleine-bodenkunde/entwicklung-des-bodens): Bodenbestandteile und Entwicklungsfaktoren. Keine allgemeine feste Bildungsgeschwindigkeit übernommen.
- [NRCS: Soil Biology Primer](https://www.nrcs.usda.gov/resources/education-and-teaching-materials/soil-biology-primer): Bodenleben, Stoffkreisläufe und Bodenfunktionen. Eigene Darstellungen, keine übernommenen Fotos.
- [NRCS: Soil Respiration](https://www.nrcs.usda.gov/state-offices/illinois/soil-tech-note-17a-soil-respiration): Wurzeln, Mikroorganismen und Bodentiere als Beiträge zur Bodenatmung; mehrere Umweltbedingungen wirken zusammen. Keine angeblich optimale Feuchtezahl oder allgemeine Ratenformel übernommen.
- [NRCS: Biological Underground Community](https://www.nrcs.usda.gov/state-offices/illinois/soil-tech-note-11a-biological-underground-community): Stoffaustausch bei Mykorrhiza ergänzend geprüft.
- [Umweltbundesamt Deutschland: Verdichtung](https://www.umweltbundesamt.de/themen/boden-flaeche/bodenbelastungen/verdichtung): Poren und Folgen mechanischer Belastung; keine deutschen Rechts- oder Flächenangaben auf Wien übertragen.
- [Stadt Wien: Schwammstadt-Prinzip](https://www.wien.gv.at/umwelt/schwammstadt-baeume): Wurzelraum, Materialien und Regenwasserwege. Die Hofzahlen sind eigene fiktive Aufgaben, keine Daten eines Wiener Bauprojekts.
- [Umweltbundesamt Österreich: Bodenschutzthemen](https://www.umweltbundesamt.at/soil4you/themen): Versiegelung, Erosion, Verdichtung und weitere Einflüsse als getrennte Schutzthemen.

Die gespeicherte österreichische Lehrplangrundlage nennt für die dritte Klasse Funktionen von Mikroorganismen im Boden, die Bedeutung des Bodens für Pflanzen und menschliche Einflüsse auf den Boden. Dieser Absatz wurde erneut gelesen. Die Ausarbeitung verbindet die drei Inhalte mit Beobachtung, kontrolliertem Vergleich und begründetem Handeln. Der vollständige Fach- und Produktabgleich bleibt offen.
