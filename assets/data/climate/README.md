# Temperaturdaten für die Klimawandel-Lerneinheit

Abruf: 06.09.2026. Eingebundener Unterrichtszeitraum: vollständige Jahre 1880–2025. Die Originaldateien sind lokale Momentaufnahmen; kein automatischer Live-Datenabruf.

## Global

GISTEMP Team, 2026: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA Goddard Institute for Space Studies. https://data.giss.nasa.gov/gistemp/ . Datei: https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts%2BdSST.csv . Lokaler Name: gistemp-2026-09-06.csv.

Verwendet wird die Spalte J-D (Januar–Dezember), Abweichung in °C vom Mittel 1951–1980. Unvollständige Daten des Jahres 2026 werden nicht angezeigt. Literatur: Lenssen et al. (2024), A GISTEMPv4 observational uncertainty ensemble, J. Geophys. Res. Atmos., 129, e2023JD040179, https://doi.org/10.1029/2023JD040179 . Quellenhinweise: NASA GISS/GISTEMP.

## Österreich

GeoSphere Austria: SOCRATES basierte Flächenmittelwerte der Temperatur (Monatsdaten) für Österreich (v2), https://doi.org/10.60669/91zk-1r17 . Datensatzseite: https://data.hub.geosphere.at/en/dataset/klimastatusbericht_2025_socrates_flaechenmittel-v2-1m . Lizenz: Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/ . Originaldatei: https://public.hub.geosphere.at/datahub/resources/klimastatusbericht_2025_socrates_flaechenmittel-v2-1m/filelisting/klimastatusbericht_2025_socrates_flaechenmittel_v1_1m.csv . Lokaler Name: socrates-2025-monthly.csv.

Für diese Website bearbeitet: Auswahl Area=AT; gleich gewichtetes Mittel der zwölf monatlichen TM-Werte pro Jahr; Abzug des Mittels der so berechneten Jahreswerte 1951–1980; Rundung der Abweichung auf zwei Nachkommastellen. Keine tagegewichtete Mittelung, keine LOESS-Glättung. Die aggregierte Reihe ist eine Berechnung dieser Website und keine unverändert veröffentlichte offizielle Jahresreihe. Der Quelldatensatz selbst enthält räumlich rekonstruierte Daten.

## Reproduzieren

`node scripts/build_climate_series.js` liest die archivierten CSV-Dateien, kontrolliert vollständige Monats-/Jahresfolgen und erzeugt annual-comparison.json sowie die eingebettete Datenkonstante in js/topics/klimawandel.js. Der Browser benötigt keine externe Datenverbindung.

Gleicher Bezugszeitraum bedeutet nicht identische Messgrößen oder Methoden: GISTEMP kombiniert Landluft- und Meeresoberflächentemperatur; die Österreich-Reihe beschreibt Lufttemperatur über dem Land. Die Angaben sind Schätzungen mit Unsicherheit. Zwei Nachkommastellen in der Anzeige sind keine Genauigkeitsgarantie. Jahresabweichungen sind nicht dasselbe wie geglättete langfristige Erwärmung oder eine absolute Temperatur.
