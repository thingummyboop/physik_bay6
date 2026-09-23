# Wetter: Fragen, Luftfeuchte und Hochdruck

Stand: 23.09.2026, lokale Weiterarbeit nach `5a9c125`. Der vorherige Zielturn war Fortschritt: Physikübersicht ergänzt, 13 Wärmelehre-Fragen überarbeitet und gezielt einschließlich Browser und Druck geprüft. Der Gesamtauftrag für alle elf Fächer bleibt offen; Übersetzungen bleiben ausgesetzt.

## Befunde und Änderungen

Alle sechs erklärenden Wetterabschnitte, die einschlägigen Geräte-/Strömungstexte im Themenskript und alle 18 Fragen mit sämtlichen Antworten und Rückmeldungen wurden gelesen. Zehn ältere Fragen wurden überarbeitet: `wetter_s1_q1`, `wetter_s2_q1`, `wetter_s3_q1`, `wetter_s5_q1`, `wetter_s5_q2` und `w_d1` bis `w_d5`. Alle Fragen besitzen jetzt drei begründete Antwortmöglichkeiten. Die unpassenden Ablenker zur blauen Wasserfarbe und zum angeblich einzigen Golfstrom entfallen. Gerätewahl, Grenzen eines Windmodells, Ladungstrennung, Licht-/Schallausbreitung, Dichte, Wärmetransport und mehrere Strömungsantriebe werden an konkreten Situationen geprüft.

Der Text bereitete relative Luftfeuchtigkeit bisher hauptsächlich über einen Geräteknopf vor; Hochdruck mit Nebel wurde im Kapitelcheck gefragt, aber kaum erklärt. Zwei Ergänzungen schließen diese Lücke:

- `sec1`: Begriff Wasserdampfdruck und Bezug auf Sättigung, zwei ausdrücklich erfundene Vergleichsfälle mit gerundeten Sättigungswerten, drei Aufgaben und eine getrennte Papierlösung. 11,7 hPa bei 20 °C beziehungsweise 10 °C ergeben 50 % beziehungsweise gerundet 95 %. Dies ist kein gemessener Temperaturverlauf und kein vollständiges Abkühlungsmodell. Ein eigener Protokollauftrag unterscheidet reale Messungen von Beispieldaten und benennt eine Alternative ohne Gerät.
- `sec2`: Absinken/Erwärmung und mögliche Wolkenauflösung sowie die davon zu unterscheidende kühle, feuchte bodennahe Schicht. Eine Wiener Schulhofaufgabe fordert Erklärung und zusätzliche Beobachtungen; aus einem Luftdruckwert folgt keine sichere Wettervorhersage.

Der Titel der Golfstromdarstellung lautet nun „Wärmetransport im Nordatlantik“. Die bestehenden Küsten-, Gewitter-, Niederschlags-, Regenmengen- und Warnübungen bleiben erhalten. Wetter hat weiterhin sechs Abschnitte und 18 bewertete Fragen; Revision 4 kennzeichnet Ergebnisse von Revision 3 als überholt. Ein Lernziel und ein Zusammenfassungspunkt verbinden die neuen Erklärungen mit dem Kapitelumfang.

## Quellen und Abrufgrenzen

Am 23.09.2026 geprüft:

- [Universität Hamburg: Wetterlexikon, Abschnitt Feuchte](https://wettermast.uni-hamburg.de/frame.php?doc=Wetterlexikon.htm), Absätze zu Teildruck, Verhältnis zum Sättigungswert, Temperaturabhängigkeit und Einheiten. Direkt lesbarer Webtext; keine Behauptung, dass Wasserdampf in Luft wie Salz gelöst sei.
- [DWD: Leitfaden 6, Tabelle 9.2](https://www.dwd.de/DE/leistungen/pbfb_verlag_leitfaeden/pdf_einzelbaende/leitfaden6_pdf.pdf?__blob=publicationFile&v=3): In der vom Suchdienst wiedergegebenen Tabelle standen 23,392 hPa bei 20 °C und 12,281 hPa bei 10 °C. Verwendet werden gerundet 23,4 und 12,3 hPa. Der direkte PDF-Abruf lieferte HTTP 403; eine vollständige neue Lektüre des PDF wird nicht behauptet.
- [MeteoSchweiz: Hochdrucklage](https://www.meteoschweiz.admin.ch/wetter/wetter-und-klima-von-a-bis-z/hochdrucklage.html): Der Suchdienst lieferte die relevanten vollständigen Absätze zu Absinken/Erwärmung und bodennahem Winternebel. Direkte Abrufe lieferten nur Navigation beziehungsweise keine auslesbare Hauptpassage. Keine Übernahme schweizerischer Ortsangaben, Nebeldicken oder Datumsbeispiele als Wiener Messdaten.
- [NOAA: What is a current?](https://oceanservice.noaa.gov/facts/current.html), direkt gelesen: Wind, Gezeiten und dichtebedingte Strömungen. [NOAA Ocean Exploration](https://oceanexplorer.noaa.gov/ocean-fact/climate/) zum Wärmetransport ergänzend gelesen; keine festen regionalen Temperaturdifferenzen oder Vorhersagen übernommen.

## Gezielte Funktionsprüfung

`scripts/fixtures/weather_assessment_keys.json` enthält die nach inhaltlicher Lektüre festgehaltenen Lösungen aller 18 Fragen. `test_weather_assessment.js` verwendet diese unabhängig von den gespeicherten Antwortmarkierungen: 54 bewertete und 39 freie Antwortwege, jede Rückmeldung, Ergebnisrevision und Wiederholungs-ID; freie Übungen verändern den Speicher nicht. Die beiden Tabellenrechnungen, drei Aufträge, zugängliche Scrollregion, Hochdruckerklärung sowie getrennte Papiermaterialien und Lösungen werden ebenfalls geprüft.

Sieben Suiten bestanden: `test_weather_assessment`, `test_weather_concepts`, `test_physics_worksheets`, `test_complete_chapter_quizzes`, `test_chapter_revisions`, `test_physics_learning_guide`, `test_translation_revisions`. Im bestehenden Wettertest wurde die Antwortzahl von 51 auf 54 aktualisiert; dessen Prüfungen der drei Küstenzustände, des Zurücksetzens/Fokus, der Regenmengen, Warnungen, Geräte und Niederschlagsbeschreibungen bleiben erhalten.

Aktuell 284 Suiten vorhanden, kein neuer vollständiger Gesamtlauf. Inventar und struktureller Fragenaudit wurden aktualisiert: weiterhin 198 Kapitel und 2033 Fragen in den fünf priorisierten Fächern, davon 485 in Physik; keine strukturellen Befunde. Dies belegt keine vollständige fachliche Abnahme der übrigen Kapitel. Die älteren Fragen der vier weiteren Viertklasskapitel und die vollständige Modell-/Bildprüfung bleiben offen.

## Browser und Druck

`browser_weather_assessment.js` bestand in der endgültigen Fassung am 23.09.2026 um 18:51:35 UTC mit Chromium 151.0.7922.34. Geprüft wurden sechs Ansichten (320, 390, 1280 px, jeweils hell/dunkel), alle 39 freien Antwortmöglichkeiten per Tastatur und alle 54 bewerteten Antwortmöglichkeiten mit unabhängigen Lösungen. Ergebnisrevision, Wiederholungs-ID und unveränderter Speicher beim freien Üben stimmen; keine Browserfehler. Die Feuchtetabelle ist bei schmaler Ansicht mit Pfeiltasten erreichbar und horizontal verschiebbar. Desktop- und mobile Feuchteerklärung sowie mobile Hochdruckerklärung wurden visuell gelesen.

Die 23-seitige Lösungsdruckfassung wurde auf allen 14 von neuen Erklärungen, Fragen und Lösungen betroffenen Seiten visuell gelesen: 2, 3, 5, 10, 11, 13, 14, 17–23. Die abschließende sprachliche Verbesserung zweier Ablenker betraf nur Seiten 13 und 17; beide wurden nach dem letzten Browserlauf neu gerendert und gelesen. Alle übrigen Seiten blieben textlich identisch. Die 19 Seiten der Schülerfassung stimmen mit den ersten 19 Seiten der Lösungsfassung überein; die Lösungen beginnen erst auf Seite 20. Diese Sichtung ersetzt keine neue Abnahme jeder unveränderten Modell-/Versuchsseite. Artefakte: `../browser-qa/weather-assessment/`.
