# Physik der 4. Klasse: laufender Inhaltsabgleich

Stand: 23.09.2026. Dieser Abgleich ist **noch nicht abgeschlossen**. Er betrifft die 8. Schulstufe der österreichischen Mittelschule. Die vollständigen erklärenden Texte und Arbeitsaufträge der sechs Kapitel `waermelehre`, `wetter`, `klima`, `klimawandel`, `strahlung_radioaktivitaet` und `kraftwerke_energieversorgung` wurden gelesen. Die interaktiven Beschriftungen des Klimakapitels wurden zusätzlich im Quellcode und Browser geprüft. Eine neue vollständige Prüfung aller älteren Fragen, Modelle und Abbildungen der sechs Kapitel ist damit nicht belegt.

Grundlage: [Mittelschullehrplan im RIS](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html), direkt abgerufen am 23.09.2026 um 15:21:38 UTC. Zehn Kompetenzbeschreibungen und zehn Anwendungsbereiche werden in eigenen Worten zugeordnet. „Vorhanden“ beschreibt eine konkrete Lerngelegenheit und ist keine Aussage über bereits erreichte Schülerkompetenzen.

## Kompetenzmatrix und nächste Lücken

| Nr. | Anforderung | Vorhandener Inhalt / nächster Schritt |
|---|---|---|
| K1 | Temperaturen mit verschiedenen Geräten bestimmen (E) | `waermelehre/temperatur_messen`: zwei unterschiedliche geeignete Schulthermometer, Geräteangaben, Anpassungszeit, eigene Zeitreihe, Beispielreihe und Unsicherheiten. Kein Erhitzen nötig. |
| K2 | Wärmeübertragung experimentell planen, durchführen und auswerten; Klimabedeutung diskutieren (E/S) | Neu in `waermelehre/sec1–sec3`, Revision 4: Eis auf Metall/Holz, helle/dunkle Flächen im Sonnenlicht und eine Farbwolke mit Kontrollfall und handwarmem Wasser. Je fünf Arbeitsschritte, kontrollierte Bedingungen, eigene Protokolle, Wiederholung, Auswertungsgrenzen und Transfer zu Gebäuden/Atmosphäre; vier getrennte Vergleichslösungen. Fünf zusätzliche Fragen wurden auf 15 bewerteten und 15 freien Antwortwegen geprüft. Native Browserprüfung und visuelle Druckprüfung dieser neuen Aufgaben stehen beim GitHub-Zwischenstand noch aus. |
| K3 | Temperatur- und Druckunterschiede als Wetterantrieb im Alltag nutzen (W) | `wetter/sec2`: drei Küstenzustände, eigener Oberflächenvergleich als überprüfbare Frage, Zirkulation und Grenzen der Übertragung auf Wien. `sec1`: fünf Schultage Wetterprotokoll mit Aufbau und Messbedingungen. |
| K4 | Erdbilanz und menschliche Einflüsse aus mehreren Quellen erschließen und physikalisch bewerten (W/S) | `klimawandel/sec1–sec2`: qualitative Strahlungswirkung, datierte Temperaturreihen mit Methode und Bezugszeitraum. Neu in `klima/sec2`: zwei Fachquellen, drei Rechercheaufträge, Messbefund/Erklärung unterscheiden und ein Modell kritisch begrenzen. Die frühere unphysikalisch genaue Regleranzeige wurde ersetzt; Details unten. |
| K5 | Maßnahmen aktuellen Klimaschutzzielen auf persönlicher, regionaler und globaler Ebene zuordnen und Umsetzung diskutieren (S) | **Noch unvollständig:** `klimawandel/sec4` und `sec6` unterscheiden Schutz/Anpassung, benennen mehrere Verantwortungsebenen und Wiener Quellen. Es fehlt eine konkrete Aufgabe zu aktuell verifizierten Klimaschutzzielen, Geltungsbereichen, Zieljahren und Umsetzungsbedingungen auf allen drei Ebenen. Ziele vor Übernahme frisch aus Primärquellen prüfen. |
| K6 | Kraftwerksprozesse erklären und wirtschaftlich, ökologisch, ethisch bewerten (W/S) | `kraftwerke_energieversorgung`: Energiefluss, Kraft-Wärme-Kopplung, Freudenau/Spittelau, Speicher, drei fiktive Angebote mit gleicher erwarteter Jahresenergie. Kostenvergleich, Winterbeitrag, Lebensräume, Verteilung von Nutzen/Lasten und begründeter Beschluss mit fehlenden Daten. |
| K7 | Energie- und Informationsübertragung durch Strahlung recherchieren und Quellen bewerten (W/S) | `strahlung_radioaktivitaet/types` nennt Radiomodulation und Wärmebild; `forschung_bildgebung` enthält Bildgebung und eine Quellenprüfung. **Offen:** ein ausdrücklicher, altersgerechter Recherchevergleich von Energieübertragung und technischer Informationsübertragung mit benannten Signalen, Empfänger, Quellenbelegen und Grenzen. |
| K8 | Wechselwirkung verschiedener Strahlungsarten untersuchen und Risiken ableiten (E/S) | `forschung_bildgebung`: eigenständige Auswertung zweier modellhafter Messreihen, Untergrundkorrektur, Probendicke, Wiederholung und Grenzen; kein echter Bestrahlungsversuch. `types/decay/evaluate` unterscheiden Strahlungsarten und Exposition. **Noch unvollständig:** sichtbare Strahlung, UV und IR ausdrücklich in geeignete qualitative Untersuchungs-/Vergleichsaufträge einbeziehen und Risikoaussagen an Bedingungen binden. |
| K9 | Zufallszerfall im Kern mit Modellen darstellen (W) | `strahlung_radioaktivitaet/half`: 200 Modellkerne, einzelne Zufallsschritte, Vergleich mehrerer Versuche, Erwartungswert versus Einzelzahl, eigener Mittelwert und Streuung. Zerfallsprodukte und Grenze von zehn Schritten offengelegt. |
| K10 | Aktuelle Physikforschung altersgerecht bearbeiten (W/E/S) | `forschung_bildgebung`: datierte PSI-Forschungsnachricht von 2026 und Wiener Anlagenbezug, unabhängige Modellaufgabe, Befund versus Deutung, vier eigene Erklärungssätze und Aussagegrenzen. Die fiktiven Daten werden ausdrücklich nicht dem Forschungsprojekt zugeschrieben. |

## Anwendungsbereiche

| Nr. | Bereich | Konkreter Bezug und Status |
|---|---|---|
| A1 | Temperatur und innere Energie | `waermelehre/sec0`, `temperatur_messen`: Temperatur versus Energiemenge, Teilchenmodell und reale Messung. |
| A2 | Thermische Energieübertragung | `waermelehre/sec1–sec3`: Erklärung/Modelle vorhanden; eigene Versuchsreihe gemäß K2 ergänzen. |
| A3 | Phasenübergänge | `waermelehre/sec4`: Zustände, Übergänge, Verdunsten unterhalb der Siedetemperatur, Energiezufuhr ohne Temperaturanstieg beim Schmelzen; Druckabhängigkeit. |
| A4 | Wetterentstehung, Messgeräte und Extreme | `wetter`: Geräte, Schulprotokoll, Küstenmodell, Niederschlag und Warnungen mit Gebiet/Zeit/Auswirkungen. |
| A5 | Treibhauseffekt, Klima und menschlicher Einfluss | `klima/sec2` jetzt qualitativ berichtigt; `klimawandel` mit Datenvergleich und Handlungsunterscheidung. Konkrete aktuelle Ziele siehe K5. |
| A6 | Modelle der Wärmelehre, Kernphysik und des Klimas | Teilchen, Zufallszerfall, Küstenvergleich und Strahlungsschema. Das neue Schema benennt fehlende Rückkopplungen und die nicht berechnete zeitliche Entwicklung. |
| A7 | Radioaktivität, Quellen, ionisierende Strahlung und biologische Wirkung | `strahlung_radioaktivitaet/types–evaluate`: Kern versus technisch erzeugte Strahlung, Strahlungsart, Weg und Dauer der Einwirkung. Eine umfassendere Untersuchung verschiedener Strahlungsarten bleibt gemäß K8 offen. |
| A8 | Elektromagnetische Strahlung in Medizin und Technik | Radio, Wärmebild und Röntgen/Tomografie als Einstiege; konkrete Quellen-/Vergleichsaufgaben für Übertragung und verschiedene Anwendungen gemäß K7/K8 ergänzen. |
| A9 | Kraftwerksarten | `kraftwerke_energieversorgung/chain`, `vienna`, `abwaegung`: Prozesse und begründete Entscheidungen statt bloßer Typenliste. |
| A10 | Einblick in aktuelle Forschung | `strahlung_radioaktivitaet/forschung_bildgebung`, einschließlich Trennung von Forschungsbericht, eigener Modellaufgabe und tatsächlicher Durchführung. |

## Bereits umgesetzt: Klimakapitel Revision 2

Der ältere Regler in `klima` leitete aus 0–100 frei gewählte ppm-Werte, Temperaturen und einen angeblichen Prozentanteil bleibender Wärme ab. Diese Zahlen waren keine tragfähige Klimarechnung. Sie wurden durch drei qualitative Zustände bei zunächst gleichen Temperaturen ersetzt. Einfallende Sonnenstrahlung bleibt gleich, Energieabgabe ins All bleibt vorhanden. Eine klare Legende erklärt die drei Strahlungswege, fehlende Reflexion und zusammengefasste atmosphärische Abstrahlung. Die Grafik beansprucht weder Orts-/Zeitprognosen noch ein fertiges Strahlungsgleichgewicht. Die Pfeilstärken dienen nur der qualitativen Reihenfolge.

Höhenklima wurde mit Ausdehnung aufsteigender Luft, tatsächlicher Schichtung und Inversion präzisiert. Die unzutreffende Erklärung „dünnere Luft kann weniger Wärme speichern, deshalb kälter“ wurde aus der bewerteten Frage entfernt. Ebenso entfallen die pauschale 150-Jahre-Grenze für Thermometeraufzeichnungen und die direkte Temperaturablesung aus Luftblasen oder einzelnen Baumringen. Die Archive unterscheiden Messgröße und Rekonstruktion. Alle zwölf Fragen haben drei fachlich begründete Optionen; zwei Fragen zu Modellgrenzen und Quellenbelegen sind neu. Alle bisherigen Frage-IDs bleiben erhalten.

Gelesene Primärquellen vom 23.09.2026:

- [NASA: The Earth's Radiation Budget](https://science.nasa.gov/ems/13_radiationbudget/) für Strahlungsbilanz und atmosphärische Abstrahlung.
- [NOAA: What Are Proxy Data?](https://www.ncei.noaa.gov/news/what-are-proxy-data) für verschiedene natürliche Archive.
- [NOAA: Climate Change in the Context of Paleoclimate](https://www.ncei.noaa.gov/news/climate-change-context-paleoclimate) für Rekonstruktion, Modellvergleich und menschliche Einflüsse.
- [National Weather Service: Temperaturinversion](https://forecast.weather.gov/glossary.php?word=temperature+inversion) und dessen Wettertheorie-Material zum Abkühlen aufsteigender Luft.

Die neue Quellenaufgabe verlangt konkrete Belege und Zeitbezüge; eine Übersetzungshilfe kann für die englischen Fachseiten genutzt werden. Die Übersetzungen der Website selbst wurden nicht weiterbearbeitet. Ein fehlgeschlagener Direktabruf einer IPCC-Seite wurde nicht als neu geprüfter Quellenbeleg verwendet.

## Prüfung und verbleibende Arbeit

`test_clima_concepts.js`: 36 anhand unabhängiger Lösungen geprüfte Antwortwege, fünf Reglerwahlen einschließlich Rückkehr zu früheren Zuständen, unveränderte einfallende Strahlung, fortdauernde Abgabe, Archivgrenzen, Revision 2, Papierabbildung und getrennte Lösung. Die unabhängig gesetzten Schlüssel stehen in `scripts/fixtures/clima_concepts_keys.json`.

Native Prüfung `browser_clima_concepts.js`, 23.09.2026 um 17:29:54 UTC: 18 Modellzustände in sechs Ansichten (320/390/1280, hell/dunkel), 24 freie und 36 bewertete Antwortwege, Tastatursteuerung, Rücksprung/Fokus und keine Browserfehler. Handyansicht und Desktopgrafik wurden visuell gelesen. In der 15-seitigen Lösungsfassung wurden die geänderten Seiten 3, 4, 6 und 15 visuell geprüft: statisches Strahlungsbild, Rechercheaufträge, Klimafaktoren, Archive und Vergleichslösung. Keine neue Vollsichtung aller älteren Papierseiten behauptet.

Elf gezielte Regressionen bestanden um 17:31:49 UTC, einschließlich neuem Klimatest, bisherigem Klimadiagramm, anderem Treibhausmodell, allen Physik-Arbeitsblättern, Kapitelchecks, Revisionen und Sprachfallback. Insgesamt gibt es jetzt 278 Testsuiten; ein neuer vollständiger Gesamtlauf ist nicht erfolgt. Der aktuelle strukturelle Audit zählt 2018 gespeicherte Fragen in den priorisierten Fächern, davon 470 Physikfragen, und meldet keine strukturellen Fragefehler. Das beweist keine fachliche Vollständigkeit.

Als Nächstes folgen K2, K5, K7 und K8 sowie ein abschließender Abgleich von Reihenfolge, Grundstoff/Vertiefung und Querverweisen. Auch die verbleibenden Anforderungen des Gesamtplans und die vollständige Prüfung der elf Fächer bleiben offen. Alle Änderungen nach `d13b006` sind lokal und noch nicht erneut gepusht.
