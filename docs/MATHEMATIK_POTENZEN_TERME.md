# Potenzen, Terme und binomische Formeln – 3. Klasse

Ergänzung 21.09.2026: Revision 4 erweitert den Lernweg auf acht Abschnitte um Zehnerpotenzen und wissenschaftliche Schreibweise. 26 bewertete Fragen, 104 interaktive Umwandlungen sowie erweiterte Papieraufgaben und Lösungen. Die bisherigen Formel-/Flächenübungen bleiben erhalten. [Aktuelle Inhalte, Browser- und vollständige Druckprüfung](MATHEMATIK_ZEHNERPOTENZEN.md). Der nachfolgende Bericht beschreibt den früheren Stand von Revision 3.

Stand 16.09.2026, Kapitel `math3_2_potenzen_terme`, 7. Schulstufe, Revision 3. Lokale Weiterarbeit nach bed9a78; die vorausgehende Gleichungsprüfung bleibt ebenfalls lokal.

## Geschlossene Inhaltslücke

Das bisherige Kapitel enthielt drei kurze Abschnitte, fünf bewertete Fragen und eine Eingabe zum Zählen von Faktoren. Es erklärte Grundbegriffe und die Produktregel, behandelte aber Herausheben, Kürzen und die drei binomischen Formeln noch nicht ausreichend. Der am selben Tag aus der gespeicherten aktuellen RIS-Fassung erneut gelesene Bereich „Variablen und Funktionen“, 3. Klasse, verlangt ausdrücklich Potenzregeln, Ausmultiplizieren, Zusammenfassen, Herausheben, Kürzen sowie Herleiten, grafisches Veranschaulichen und Anwenden aller drei binomischen Formeln.

Quelle: [RIS-Mittelschullehrplan](https://www.ris.bka.gv.at/Dokumente/Bundesnormen/NOR40271471/NOR40271471.html); Abrufvergleich und Grenzen in [LEHRPLAN_QUELLENSTAND.md](LEHRPLAN_QUELLENSTAND.md). Die Erweiterung deckt diesen konkreten Teilbereich ab; sie ist keine vollständige Abnahme der Jahresplanung oder sämtlicher Mathematikkapitel.

Der Lernweg umfasst jetzt sechs Abschnitte mit jeweils drei konkreten Arbeitsaufträgen und getrennten Vergleichslösungen:

1. Basis und Exponent, Potenzen als Produkte, Klammern bei negativen Basen und Bruchbasen.
2. Produkt, Quotient und Potenz einer Potenz sowie Potenz eines Produkts; Voraussetzungen einschließlich der nicht erlaubten Division durch null. Der Exponent null wird für eine Basis ungleich null erklärt, negative Exponenten bleiben außerhalb dieses Einstiegs.
3. Gleichartige Terme und Koeffizienten; Addition und Multiplikation unterscheiden; ausdrücklich erfundener Einkauf für ein Wiener Schulprojekt.
4. Ausmultiplizieren einer und zweier Klammern, Herausheben, Kürzen gemeinsamer Faktoren und die bleibende Einschränkung bei einem variablen Nenner. Ein Gegenbeispiel zeigt, warum einzelne Summanden nicht gestrichen werden dürfen.
5. Alle drei binomischen Formeln algebraisch herleiten, durch eigene Flächenbilder veranschaulichen und auf konkrete Terme anwenden.
6. Richtige und falsche Regeln durch Einsetzen vergleichen; Sonderfall und Gegenbeispiel unterscheiden; Randfläche einer quadratischen Zeichnung als Sachaufgabe modellieren.

18 bewertete Fragen mit jeweils drei begründeten Antworten, insgesamt 54 Antwortwege. Die fünf bisherigen IDs bleiben erhalten; 13 Fragen ergänzt. Alte Ergebnisse aus Revision 2 gelten nicht als aktueller Nachweis. Der Kapitelname im gemeinsamen Katalog nennt nun auch die binomischen Formeln, damit Lehrkräfte diesen Stoff bei der Kapitelauswahl erkennen.

## Flächenbilder und Werkstatt

Drei eigene SVG zeigen für a = 6 und b = 2 die Zerlegung von (a + b)², das Abziehen zweier überlappender Streifen bei (a − b)² und das Umlegen der Restfläche bei a² − b². Zahlen in den Feldern sind Flächeninhalte, Randzahlen sind Seitenlängen. Farbe, Lage, Zahlen und erklärende Bildunterschrift werden gemeinsam verwendet. Keine externen Bilder benötigt.

Die Werkstatt lässt alle drei Formeln mit a von 2 bis 8 und b von 0 bis 8 untersuchen: 189 Zustände. Ursprünglicher Term und richtige ausmultiplizierte Form werden einer typischen falschen Regel gegenübergestellt. Ein übereinstimmender Sonderfall wird ausdrücklich nicht als Beweis ausgegeben. Für a < b wird bei den beiden Modellen mit a − b kein unmögliches Flächenbild gezeichnet, während die algebraischen Werte weiter berechnet und erklärt werden. Bei einer Seitenlänge null entfällt die entsprechende Teilfläche. Die Größe der Darstellung wird für die Lesbarkeit angepasst; innerhalb jedes Bildes bleiben Seiten und Flächen proportional.

Alle Änderungen sind per Tastatur möglich, Neustart stellt die Ausgangswerte her und fokussiert die Formelauswahl. Die Werkstatt speichert nichts und vergibt keine Punkte. Der alte Eingabeaufruf bleibt für noch nicht überarbeitete Sprachfassungen verfügbar. Die Übersetzungen wurden nicht erweitert.

Die Papierfassung enthält alle sechs Abschnitte, 18 Arbeitsaufträge, die drei Flächenbilder, eine Tabelle mit neun Formel-/Wertekombinationen und sechs getrennte Vergleichslösungen. Acht zusätzliche Zufallspotenzaufgaben wechseln zwischen positiven und negativen Basen. Die Lösungen mit ausgeschriebenen Faktoren entstehen aus derselben Ziehung; der Lösungsschalter ändert die Zahlen nicht.

## Nachweise

- `test_powers_year3.js`: 54 Antwortwege mit unabhängig vorgegebenem Lösungsschlüssel, sechs Abschnittszuordnungen, Revision und Wiederholungsbedarf bestanden. Alle 189 Modellzustände gegen unabhängig berechnete Produkte sowie die tatsächlich ausgeschriebenen Rechenausdrücke geprüft. Bei 147 zulässigen Flächenbildern stimmen Rechteckgrößen, Teilflächen und Zerlegungen; 42 Zustände erhalten stattdessen die passende Modellgrenze. Neustart, Fokus, Wiederinitialisierung, unveränderter Speicher, alter Eingabeaufruf, Papierstruktur und 32 erzeugte Aufgaben-/Lösungspaare bestanden.
- `test_math_feedback_reasoning.js` bestanden: jetzt 40 Antwortwege über sieben Mathematikkapitel. Der Erwartungswert wurde von 38 auf 40 angepasst, weil die zwei dort geprüften Potenzfragen jeweils eine dritte Antwortoption erhalten haben; Auswertung und Feedback werden weiterhin tatsächlich geprüft. Beide Gleichungskapitel, 95 STEM-Arbeitsblätter und die allgemeine Arbeitsblattprüfung bestanden. Diese Regressionen liefen vor der abschließenden Vergrößerung der Flächenbilder; Kapiteltest und native Prüfung danach erneut bestanden.
- Native Prüfung `browser_powers_year3.js`, abschließend 2026-09-16T11:41:42.196Z, Chromium 151.0.7922.34: 54 Antwortentscheidungen, Tastaturbedienung und Neustart, 189 Berechnungen, Grenzen aller Textbeschriftungen in 147 SVG, 54 Zustände bei 320/390/1280 Pixel in beiden Designs, zwei 94-Prozent-Kapitelchecks mit passender Wiederholung und Papierausgabe bestanden. Keine Seitenfehler.
- Nach der ersten Sichtprüfung wurden zu kleine Flächenbilder und Beschriftungen vergrößert und ihre Erklärungen ergänzt. Finale mobile Summe, Differenz und Produkt sowie der Fall außerhalb der Flächenmodellgrenze tatsächlich gelesen. Finale A4-Ausgabe mit Lösungen: 22 Seiten. Seiten 5, 6, 7, 8, 9, 10, 20, 21 und 22 gerendert und tatsächlich gelesen: Flächenbilder, Papierprotokoll, Aufgaben und zugehörige Lösungen lesbar. Nicht sämtliche Druckseiten visuell geprüft. Bericht und Artefakte außerhalb des Repositorys unter `../browser-qa/powers-year3/`.

Inventar 197 Kapitel; Prioritätsaudit 1586 Frageninstanzen ohne strukturellen Befund. Kein neuer vollständiger Suitenlauf; der letzte 191/191-Nachweis liegt vor den beiden Gleichungs- und diesen Potenzänderungen. Unterrichtserprobung, echte Screenreader-/Geräteprüfung sowie die vollständige fachliche, visuelle und praktische Produktabnahme bleiben offen. Änderungen lokal, nicht erneut gepusht.
