# Elektronische Hörbeispiele: Freude-Melodie

Diese drei Dateien sind eigene, monophone Sinuston-Lernbearbeitungen des bekannten Beginns der Freude-Melodie aus dem Finale von Ludwig van Beethovens 9. Sinfonie. Die historische Melodie wurde nach C-Dur übertragen und auf vier Takte reduziert. Keine fremde Aufführung, Instrumentenaufnahme, moderne Einspielung oder Sample-Bibliothek wurde kopiert. Keine Liedtextaufnahme. Die Dateien beanspruchen keine kritische Edition oder Rekonstruktion einer historischen Aufführung.

- A: 90 Viertelschläge/min, im vierten Takt Dauern 1½, ½, 2 Viertelschläge.
- B: eigene didaktische Änderung, im vierten Takt 1, 1, 2; sonst wie A.
- C: wie A, mit 120 Viertelschlägen/min.

Tonfolge als MIDI-Nummern: 64, 64, 65, 67 / 67, 65, 64, 62 / 60, 60, 62, 64 / 64, 62, 62. Vier Takte ergeben 16 Viertelschläge. A/B dauern 10⅔ Sekunden, C 8 Sekunden. Kein Einzählen. Kurze Amplitudenrampen verhindern harte Tonsprünge; dies ist keine Instrumentensimulation.

Erzeugung: `node scripts/build_music_listening.js`. Format: PCM-WAV, mono, 22050 Hz, 16 Bit. Der JSON-Manifest enthält Ereignisse, Zeiten und SHA-256. Prüfung: `node scripts/test_music_audio_files.js`; zusätzlich prüfen die Kapiteltests HTML-Einbindung, Wiedergabeverhalten und Aufgaben. Tatsächliches Abhören und Browserdarstellung sind damit nicht ersetzt.

Werkhistorischer Bezug: [Beethoven-Haus Bonn, Werkverzeichnis op. 125](https://www.beethoven.de/de/work/view/5556714292117504/Sinfonie%2BNr.%2B9%2B(d-Moll)%2Bop.%2B125), gelesen am 08.09.2026: Wiener Uraufführung am 7. Mai 1824 und Schiller als Textdichter. Diese Quelle stützt den historischen Kontext; die WAVs wurden im Projekt neu synthetisiert.
