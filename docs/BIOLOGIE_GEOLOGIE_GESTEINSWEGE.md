# Geologie: Gesteinswege, Platten und Lebensräume

Stand: 21.09.2026. Kapitel `bio_3_geologie_lebensraeume`, Revision 2, 7. Schulstufe.

Vier Abschnitte ersetzen die bisherigen generischen Aufgaben durch zwölf konkrete Arbeitsaufträge, 16 Begriffe, zehn bewertete Fragen, eine punktfreie Übung und vier getrennte Vergleichslösungen. Die Gesteinswerkstatt erlaubt verschiedene Wege zwischen fünf Materialzuständen. Sie unterscheidet Erstarren, Verwitterung bis Ablagerung, Verfestigung, Metamorphose und Aufschmelzen. Elf der 25 auswählbaren Zustand-/Prozesspaare sind direkte Wege der vereinfachten Karte. Andere Fälle erklären, welcher Zwischenschritt fehlt; sie behaupten keine vollständige geologische Prozesssimulation. Die letzten acht Schritte bleiben sichtbar, der Gesamtzähler zählt weiter. Auswahlwechsel, Zurücksetzen und Tastaturfokus sind berücksichtigt; keine Punkte und keine Speicherung.

Vier eigene Skizzen unterscheiden divergente, konvergente und seitliche Plattenbewegung; Subduktion und kontinentale Kollision werden getrennt gezeigt. Erdkruste und starrer oberster Mantel gehören zur Lithosphäre. Der tiefere Mantel wird nicht als Magmaozean dargestellt. Die erfundene Rechnung mit drei Zentimetern relativer Bewegung pro Jahr ist keine Erdbebenvorhersage.

Flysch- und Karbonat-Wienerwald liefern den regionalen Bezug zwischen Ausgangsgestein, Boden und Lebensbedingungen. Zwei ausdrücklich erfundene Bodenproben werden keinem Gebiet zugeordnet: je drei Messwerte ergeben 75 bzw. 41 ml aufgefangenes Wasser. Nicht aufgefangenes Wasser ist keine Messung langfristig pflanzenverfügbaren Wassers. Ein fiktiver Schulhofauftrag vergleicht 40 neue Platten mit 28 wiederverwendeten und zwölf neuen. 70 Prozent weniger Neubedarf sind keine nachgewiesene CO₂- oder Kostenersparnis.

## Nachweise

- `scripts/test_geology_paths.js`: 25 Zustand-/Prozessentscheidungen, vier Aufgabenwege, zwölf Schritte mit begrenzter Historie, ungültige Eingaben, Rücksetzen, Fokus, unveränderter Speicher und doppelte Initialisierung bestanden. 30 Quizantwortwege anhand separat festgelegter Schlüssel, 90 Prozent bei einer falschen Antwort, passende Wiederholungszuordnung und Revision geprüft. Papieralternative, zwölf direkte Aufgaben, 16 Begriffe, vier Skizzen und getrennte Lösungen geprüft. Nach letzter Textänderung erneut bestanden.
- `scripts/browser_geology_paths.js`: Chromium 151.0.7922.34, Bericht 21.09.2026, 07:02:10 UTC. 25 native Entscheidungen, 42 Layoutzustände bei 320/390/1280 Pixeln, hell/dunkel, 30 Quizantwortwege, native Tastatur, Fokus, Rücksetzen und Speicher bestanden; keine Browserfehler. Anschließend sechs finale Langverlauf-Layouts nach präzisierter Zählerbeschriftung geprüft (07:03:48 UTC).
- 22 ursprüngliche mobile Detailbilder kontrolliert; die vier dunklen Plattenskizzen und beide finalen Werkstattansichten zusätzlich als JPEG gelesen. Die abschließende Druckfassung vom 07:11:10 UTC hat 22 Seiten. Alle gegenüber der vorher geprüften Fassung veränderten Seiten (2 und 15–22) gelesen; übrige Seiten bildidentisch. Seiten 16, 21 und 22 zusätzlich höher aufgelöst kontrolliert. Die Vergleichslösungen werden als vollständige Blöcke zusammengehalten. Keine abgeschnittenen Inhalte festgestellt.
- Gemeinsame Materialprüfung für 95 STEM-Arbeitsblätter nach letzter Änderung bestanden. Inventar 197 Kapitel; Prioritätsaudit 1.662 Frageninstanzen ohne Strukturfehler. Das ist keine vollständige Fach- oder Produktabnahme und kein neuer Gesamtsuitenlauf.

Lokale Browser-/Druckartefakte: `../browser-qa/geology`, außerhalb des Repositorys. Die letzte Änderung verbessert die Lava/Bodenbildungsfrage und einen Tabellenverweis; der richtige Antwortindex bleibt unverändert. Die vollständigen Browserantwortwege stammen aus der vorherigen Formulierung, der DOM-Test aus der finalen Fassung.

## Fachliche Grundlage

Am 21.09.2026 geprüft; eigene Texte, Skizzen und erfundene Zahlen:

- [BGS: Rocks and minerals](https://www.bgs.ac.uk/discovering-geology/rocks-and-minerals/): Gesteinsgruppen und ihre Entstehung.
- [USGS: Rocks and minerals / rock cycle](https://www.usgs.gov/educational-resources/whats-new-weeks-9-12): mehrere mögliche Gesteinswege, keine vorgeschriebene Runde.
- [BGS: What causes earthquakes?](https://www.bgs.ac.uk/discovering-geology/earth-hazards/earthquakes/what-causes-earthquakes/): Platten und Bewegungen.
- [BGS: How volcanoes form](https://www.bgs.ac.uk/discovering-geology/earth-hazards/volcanoes/how-volcanoes-form-2/): Vulkanismus, Grenztypen und Hotspots.
- [Stadt Wien: Gesteins- und Klimazonen des Wienerwaldes](https://www.wien.gv.at/freizeit/wienerwald-gesteins-und-klimazonen): regionale Gesteins-, Boden- und Vegetationsbezüge; keine Höhenangaben übernommen.
- [BGS: Soil parent material](https://www.bgs.ac.uk/news/how-bgs-is-helping-the-farming-sector-of-great-britain/): Ausgangsmaterial als einer von mehreren Einflüssen auf Bodeneigenschaften.
- [Umweltbundesamt Österreich: Kreislaufwirtschaft in der Baubranche](https://www.umweltbundesamt.at/news260429-kreislaufwirtschaft-baubranche): Wiederverwendung und Ressourcenschonung; keine pauschale Umweltbilanz daraus abgeleitet.

Lehrplanbezug: Gesteinskreislauf und Plattentektonik sowie Zusammenhänge zwischen Geologie und Lebensräumen in der dritten Klasse. Grundlage bleibt der dokumentierte österreichische Lehrplanabgleich.
