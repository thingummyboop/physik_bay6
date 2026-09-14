# Astronomie-Abbildungen: Darstellung und Lesbarkeit

Stand: 14.09.2026. Deutsches Astronomie-Kapitel, 22 vorhandene externe Bilder. Keine Übersetzungsarbeit und keine Veränderung der Rasterdateien.

## Befund und Änderung

Die tatsächliche Browseransicht zeigte bei 1280 px Breite abgeschnittene Abbildungen. Ursache: inline `width:100%; max-height:420px; object-fit:cover`. Ein Merkur-Bild mit 1020 × 1024 Pixeln wurde beispielsweise in ein Feld von 1056 × 420 Pixeln gezwängt. Die kosmische Zeitleiste verlor oben und unten Beschriftungen. Das kann bei Lernbildern relevante Informationen ausblenden.

Alle 22 deutschen Abbildungen verwenden jetzt ein proportional begrenztes Format mit automatischer Breite/Höhe, maximal verfügbarer Breite und maximal 420 px Höhe. Die Browsermessung lieferte die natürlichen Abmessungen; entsprechende HTML-Breiten und -Höhen sind hinterlegt. Die Darstellung schneidet keine weiteren Bildbereiche ab. Ein im Quelldokument schon vorhandener Ausschnitt wird dadurch natürlich nicht zu einer vollständigen Aufnahme.

Alle Bildunterschriften verwenden die Textfarbe des gewählten Designs. Der eigene Link „Bild in voller Größe öffnen (neuer Tab)“ erlaubt das Lesen feiner Beschriftungen in der externen Quelldatei und nennt das jeweilige Motiv im zugänglichen Linknamen. Er funktioniert als normaler Tastaturlink ohne zusätzliche Bildbetrachtungssoftware oder Dialoglogik.

Präzisierte Beschriftungen: Webb als künstlerische Darstellung; kosmische Zeitleiste als Schema mit deutscher Lesehilfe zur Reihenfolge; Sonnensystem-Illustration mit Hinweis auf unterschiedliche Größen-/Entfernungsmaßstäbe. Die Hubble-Abbildung ist keine unmittelbar sichtbare Karte Dunkler Materie: Bild und Alternativtext benennen jetzt Galaxien und Lichtbögen sowie die Grenze direkter Sichtbarkeit.

Zur Deutung der Lichtbögen wurden die [NASA-Erklärung vom 10.09.2020](https://science.nasa.gov/missions/hubble/hubble-observations-suggest-a-missing-ingredient-in-dark-matter-theories/) und die [zugehörige MACS-J1206-Bildbeschreibung](https://science.nasa.gov/asset/hubble/macs-j1206/) am 14.09.2026 gelesen. Der Link im Kapitel ist als Erklärung der Gravitationslinsenwirkung bezeichnet. Die im Kapitel vorhandene breite Bilddatei wurde nicht mit der annotierten Downloadfassung gleichgesetzt; es wurden keine unbelegten Objekt-, Instrumenten- oder Aufnahmedatumsangaben ergänzt.

## Prüfung

`browser_astronomy_images.js`, tatsächlicher Chromium 151.0.7922.34. Bericht `../browser-qa/astronomy-images-report.json`, erstellt 2026-09-14T01:48:23.494Z:

- Alle 22 externen Bilder erfolgreich dekodiert. Keine defekten Bilder im geprüften Abruf.
- Drei Ansichtsbreiten (320, 390, 1280 px), jeweils helles und dunkles Design: 132 Bildzustände. Natürliche Seitenverhältnisse und hinterlegte Abmessungen stimmen überein; keine Überschreitung des Bildcontainers oder der Seite.
- 264 Kontrastpaare aus Bildunterschrift und Vergrößerungslink, mit tatsächlichem undurchsichtigem Hintergrund: Minimum 6,06:1. Messung nach Abschluss des bestehenden Design-Farbwechsels.
- Ein Vergrößerungslink über Tastatur geöffnet, Zieladresse mit Bildadresse verglichen und Fokus nach Schließen des neuen Tabs geprüft. Keine Browserfehler.
- Tatsächliche Vorher-/Nachher-Screenshots der Zeitleiste, des Merkur-Bildes und der Hubble-Abbildung gelesen; zusätzlich mobile dunkle Zeitleistenansicht. Kleine Rasterbeschriftungen bleiben auf schmalen Bildschirmen klein; deutsche Erläuterung und Vollbildlink ergänzen sie.
- Bestehender `test_physics_worksheets.js` für alle 20 Physikkapitel bestanden. Bildänderungen verändern nicht die vorhandene Arbeitsblatt-Auswertung oder Lösungstrennung. Kein neuer vollständiger Drucklayoutlauf, da die betreffenden Rasterbilder im aktuellen Arbeitsblatt als Onlineverweise behandelt beziehungsweise ausdrücklich ausgelassen werden.

Keine neue Fragenrevision: Fragen, richtige Antworten, Bewertungslogik und Lernziele bleiben unverändert. Kapitelrevision weiterhin 4 aus der vorangegangenen Maßstabsarbeit. Anzahl Funktionstests weiterhin 182; dieser Schritt ergänzt einen Browsernachweis, keinen künstlichen Quelltext-Test für CSS-Werte.

## Grenzen und weitere Arbeit

Der technische Bildabruf und proportionale Darstellung belegen keine vollständige inhaltliche, urheberrechtliche oder barrierefreie Abnahme aller Abbildungen. Weitere Bildtypen, genaue Einzelnachweise, Forschungsangaben, Textverständlichkeit und die Gesamtstruktur des großen Vertiefungskapitels bleiben zu prüfen. Die alten Timer-, Schwerkraft- und Supernova-Funktionen werden im deutschen Kapitel nicht verwendet; daraus wurde kein sichtbarer Fehler abgeleitet. Bestehende übersetzte Strukturen bleiben zurückgestellt. Der Gesamtauftrag für die Mittelschule Wien ist weiterhin offen.
