# Mikroorganismen: Beziehungen und Übertragungswege untersuchen

Stand: 16.09.2026. `bio_2_mikroorganismen`, 2. Klasse / 6. Schulstufe, Revision 2. Lokale Weiterarbeit nach `dc9c169`; die ebenfalls lokalen Pilzänderungen bleiben erhalten.

## Inhalte und Lehrplanbezug

Alle fünf Abschnitte, 16 Glossareinträge und elf bisherigen Fragen einschließlich einer unbewerteten Übung wurden gelesen. Vier allgemeine Trainingsblöcke ersetzt, der bisher auf Erklärung und Quiz beschränkte Hygieneabschnitt erweitert. Jetzt fünf direkte Blöcke mit 15 konkreten Arbeitsaufträgen und fünf getrennten Vergleichslösungen.

1. Bakterium, Hefe und Virus anhand dreier Beschreibungen vergleichen. Die vorhandene Vergleichstabelle erhält einen echten Tabellenkopf und wird auf schmalen Bildschirmen als Karten dargestellt. Zellkern und Erbinformation sowie sichtbarer Verband und einzelne Zelle werden unterschieden. Das externe Bild mit pauschaler Lizenzangabe entfällt.
2. Drei Beziehungen: gegenseitiger Nutzen, bloßer Nachweis ohne bekannte Wirkung und parasitische Nutzung lebenden menschlichen Gewebes mit Schädigung. Die Symbiont-Definition berücksichtigt beide Partner. Zwei erfundene Proben aus je 100 Zellen (P/Q/R: 60/30/10 bzw. 20/20/60) dienen zum Mengenvergleich; sie sind ausdrücklich keine vollständigen Mikrobiome oder Gesundheitsmesswerte.
3. Drei gesetzte Fälle zu Kontakt, Infektion ohne Beschwerden und Infektion mit Erkrankung. Jausen- und Raumluftweg zeichnen, Ansatzpunkte von Maßnahmen zuordnen, unbelegte Krankheitsbehauptung korrigieren.
4. Neue interaktive Küchenwerkstatt: Handlungsvorhersagen, drei Reihenfolgen A/B/C, nachträgliche Reinigung und Modellgrenzen. Hygieneerklärungen mit bestehenden österreichischen Quellen abgeglichen. Papierfassung enthält sämtliche Regeln, ein Protokoll für fünf Schritte und die drei Arbeitsfolgen.
5. Erfundene Fermentationsdaten: A mit Joghurtkultur pH 6,6/6,0/4,6; B mit gleich viel keimfreiem Trägermaterial ohne Kultur 6,6/6,5/6,4. Gleiche Milch, Startmenge, Temperatur und Zeiten. Kontrollvergleich, Wiederholungen und ergänzende Beobachtung planen. pH-Unterschied 1,8 nach sechs Stunden ist keine einfache Vielfachheit der Säuremenge und keine Essbarkeitsprüfung. Fermentation, Kühlung und Pasteurisierung unterscheiden.

Die fünf bisherigen Abschlussfragen stehen nun bei ihren Abschnitten. IDs erhalten, richtige Positionen verteilt, zwei unpassende Antwortalternativen ersetzt. Zwei neue Fragen zu Mikrobiomdaten und verspäteter Reinigung: zwölf bewertete Fragen, eine Übung mit durchgehend null Punkten. Revision 2 kennzeichnet alte Ergebnisse als veraltet. Lernziele und Zusammenfassung erneuert. Freie Arbeitsprodukte werden nicht automatisch bewertet.

Bezug zur am selben Tag gelesenen [aktuellen RIS-Fassung des Mittelschullehrplans](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007850): 2. Klasse, Mikroorganismen als Symbionten und Parasiten des Menschen, Erreger/Hygiene, Lebensmittelproduktion und Konservierung. W: Begriffe und Beziehungen; E: Vergleiche, Modellhandlungen und Untersuchungsplanung; S: begründete Alltagshandlungen und Grenzen von Aussagen. Planung und erfundene Daten sind keine tatsächlich durchgeführte biologische Untersuchung.

## Modell

`js/topics/bio_2_mikroorganismen.js` lädt über die bestehende optionale Kapitelanbindung (`script: true`). Drei veränderliche Zustände: Hände, Geräte (Brett/Messer zusammen) und Salat. Rohware ist eine konstante Quelle. Kontakt mit Rohware setzt Handspur bzw. beim Schneiden Hand- und Gerätespur. Salatschneiden verbindet alle drei Stationen; eine vorhandene Spur wird auf alle verteilt. Die beiden Reinigungsaktionen löschen jeweils nur die betreffende Spur. Es gibt acht erreichbare Zustände und fünf Aktionen, also 40 Übergänge.

Anzeige mit Symbol, Text und Randfarbe; Statusmeldung nennt Schritt und Zustand. Letzte vier Schritte aufklappbar, Reset stellt den Anfang her und fokussiert die erste Aktion. Keine Speicherung, Punkte oder Sperren; erneute Initialisierung geschützt. Modellregeln nachlesbar, die fehlende Sterilitätsgarantie ist immer sichtbar. Reale Keimmengen, Wahrscheinlichkeiten, Wachstum, Erkrankungen und andere Übertragungswege werden nicht berechnet. Kein Versuch mit rohem Fleisch oder unbekannten Keimen angeleitet.

## Quellen

Am 16.09.2026 direkt geöffnet und in den relevanten Abschnitten gelesen:

- [Gesundheitsportal: Hygienetipps](https://www.gesundheit.gv.at/krankheiten/immunsystem/haendewaschen.html) und [Hygiene in der Küche](https://www.gesundheit.gv.at/leben/ernaehrung/lebensmittel/verarbeitung-von-lebensmitteln.html): Händewaschen, unterschiedliche Wege, Trennung von Rohware und verzehrfertigen Speisen, Reinigung. Keine Zahlen zur Risikoreduktion erfunden.
- [Gesundheitsportal: Bakterium](https://www.gesundheit.gv.at/lexikon/B/bakterium-hk.html) und [Parasit](https://www.gesundheit.gv.at/lexikon/P/lexikon-parasit.html): Zellaufbau, unterschiedliche Wirkungen und Wirtsbeziehung. Nicht jeder Nachweis wird als Krankheit ausgegeben.
- [Agroscope: Joghurt und Sauermilchprodukte](https://www.agroscope.admin.ch/de/joghurt-und-sauermilchprodukte): kontrollierte Kulturen und Säuerung. Die Messreihe ist selbst erfunden und wird nicht Agroscope zugeschrieben.

## Nachweise und Grenzen

- `test_microbe_kitchen.js`: alle 40 Übergänge anhand unabhängig festgelegter Zustandstabellen; Fokus, Reset, begrenzte Historie, doppelte Initialisierung und unveränderter Speicher. Alle 36 unabhängig festgelegten Quizantwortwege mit Rückmeldung, Prozentwert und korrektem Wiederholungsabschnitt. 15 unverändert gerenderte Aufgaben; tatsächlicher Papierexport mit 18 Tabellen-Datenzeilen einschließlich sechs Protokollzeilen und fünf getrennten Lösungen. Nach letzten Inhaltsänderungen bestanden. Die erste Tabellenzählung zeigte einen alten Kopf im Tabellenkörper; dieser wurde semantisch korrekt in `thead` verschoben.
- `browser_microbe_kitchen.js`, Bericht `2026-09-16T16:43:53.869Z`, Chromium 151.0.7922.34: 40 native Übergänge, 48 Kombinationen aus acht Zuständen/320–390–1280 Pixeln/hellem und dunklem Design; mindestens 44 Pixel hohe Schaltflächen, kein äußerer Seitenüberlauf, Enter/Leertaste/Tab und Reset-Fokus, unveränderter Werkstattspeicher. Alle 36 nativen Quizantwortwege bestanden, keine Seitenfehler.
- Nach visueller Prüfung mobile Vergleichstabelle zu Karten verbessert. Ergänzende Browserprüfung `final-layout.json`, `2026-09-16T16:45:24.344Z`: sechs Bildschirm-/Designkombinationen, korrekte Karten-/Tabellendarstellung und kein Überlauf bei geöffneten Modellregeln. Mobile Werkstatt sowie finale Vergleichskarten in beiden Designs tatsächlich gelesen.
- Finale Druckfassung vom selben Zeitpunkt: 22 Seiten mit aktuellen Beziehungen/Lernzielen und Quellen vollständig angesehen. Seiten 18 und 21 zusätzlich mit höherer Auflösung geprüft. Keine abgeschnittenen oder überlappenden Inhalte festgestellt. Berichte und Bilder außerhalb des Repositorys: `../browser-qa/microbe-kitchen`; `page-01.png` bis `page-22.png` entsprechen diesem Export. Links im Test-PDF verwenden die lokale Vorschauadresse.
- Gemeinsame Prüfungen bestanden: 95 STEM-Arbeitsblätter, Kapitelrevisionen, vollständige Quizpools und Syntax aller 88 Themenskripte. Titelindex erneuert. Inventar 197 Kapitel; Prioritätsaudit 1.640 Frageninstanzen ohne Strukturfehler. Kein neuer vollständiger Gesamtsuitenlauf und keine vollständige Fach-/Produktabnahme.

Aktuelle Strukturzählung Biologie: 72 direkte, 83 automatisch verarbeitete Trainingsblöcke; 57 automatische Blöcke enthalten die allgemeine Situationsformulierung. 23 Kapitel besitzen mindestens einen automatischen Block. Diese Zahlen lenken weitere Einzelprüfung und beweisen keine inhaltliche Qualität. Weitere Kapitel und vollständige Produktabnahme bleiben offen. Übersetzungen zurückgestellt; neue Änderungen nicht gepusht.
