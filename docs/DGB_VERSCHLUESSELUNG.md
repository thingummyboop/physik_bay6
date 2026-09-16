# Systeme, Verschlüsselung und Verbraucherfallen

Stand: 16.09.2026. `dgb8_handeln`, 4. Klasse / 8. Schulstufe, Revision 1. Lokale Weiterarbeit nach dem ausdrücklich gewünschten Push 81016aa.

## Inhalt und Lehrplanbezug

Die vier bisherigen Abschnitte einschließlich sämtlicher Fragen wurden gelesen. Allgemeine Aufforderungen ohne Ausgangsmaterial wurden ersetzt:

1. Zusammenarbeit von Hardware, Betriebssystem und Anwendung: Eingabe, Speichern, Online-Abgleich; definierter Zugfall und verweigerter Ordnerzugriff. Ein Online-Dienst wird nicht als zwingende vierte Geräteschicht dargestellt. Vier Aufgaben einschließlich tatsächlichem Speichern/Öffnen in einem freigegebenen Texteditor.
2. Echte Verschlüsselungssoftware: neue lokale [Werkstatt](../examples/verschluesselungswerkstatt.html), sechs Arbeitsschritte mit Datei speichern, Seite neu laden, Datei importieren, richtigem/falschem Passwort und Datenveränderung. Gleicher Text und gleiches Passwort werden zweimal verschlüsselt. Protokoll mit Vorhersage, Beobachtung und Erklärung. Papierarbeit wird ausdrücklich als Vorbereitung ausgewiesen, nicht als ausgeführter Softwareeinsatz.
3. Zwei erfundene Angebote mit vollständigen Modellbedingungen: drei Monate kosten 19/23/24 Euro; ein Monat 1/5/8 Euro. Vier Aufgaben zu Rechenweg, Verlängerung, Vorauswahl, fairer Gestaltung und Umgang mit einer Forderung. Österreichische Geschäftsfähigkeit wird altersabhängig erklärt; keine pauschale Wirksamkeitsentscheidung über einen realen Vertrag.
4. Ein erfundenes Wiener Schulhofanliegen: 60–90-Wörter-Entwurf, unterschiedliche Interessen, Zielgruppe, Standort, Benachrichtigungen, tatsächliche Einstellungsprüfung soweit schulisch freigegeben und alternative Zugänge zur Beteiligung. Vier Aufgaben. Keine echten Beiträge wurden versendet.

18 Aufgaben, acht bewertete Fragen mit jeweils drei Antworten, drei getrennte Übungen ohne Punkte. Vier ursprüngliche bewertete Frage-IDs und Abschnitts-IDs bleiben erhalten. Revision 1 kennzeichnet alte Ergebnisse als veraltet. Zusammenfassung und Lernziele aktualisiert; vier getrennte Vergleichslösungen für Bildschirm und Arbeitsblatt. Freie Arbeitsprodukte werden nicht automatisch bewertet.

## Technische Umsetzung und Grenzen

`js/encryption-workshop.js` verwendet native Web Crypto: AES-GCM mit 256-Bit-Schlüssel und 128-Bit-Tag. Je Verschlüsselung werden zufälliger 16-Byte-Salt und 12-Byte-IV neu erzeugt. PBKDF2/SHA-256 mit fest 600.000 Durchläufen; Schlüssel nicht exportierbar. Die Datei enthält nur Formatangaben, Zufallswerte und verschlüsselte Daten einschließlich Tag. Keine eigenen Kryptografieprimitive.

Eingabegrenzen: 1.000 UTF-16-Codeeinheiten, Passwort 8–128, Import höchstens 16 KiB. Festes Format mit geprüften Feldern, Algorithmuskennung, Durchlaufzahl und Byte-Längen; aus importierten Daten kann keine beliebige Rechenlast festgelegt werden. UTF-8 wird streng gelesen; ein führendes Unicode-BOM bleibt als Text erhalten. Inhalte werden nur als Feldwerte ausgegeben, nicht als HTML. Neue Eingaben entfernen alte Ergebnisse; Reset verwirft auch verspätete Ergebnisse bereits laufender Operationen. Ein ungeeigneter Browser erhält einen Hinweis und deaktivierte Kryptografieaktionen.

Kein Konto, Upload, automatisches Speichern oder Eintrag in lokalen Sitzungsspeichern. Download nur durch die Speicherschaltfläche. Das ist eine Lernwerkstatt mit echter Verschlüsselung, kein unabhängig geprüftes Produkt für private Dateien. Passwortqualität, Geräteschutz, Originaldateien und Grenzen des Leerens der Felder werden erklärt. Das öffentliche Beispielpasswort schützt kein Geheimnis.

## Prüfung

- `test_dgb_action.js`: alle 24 unabhängig festgelegten Antwortwege, passende Wiederholungsabschnitte, alte Revision, drei Übungsschlüssel ohne Punkte, 18 Aufgaben, drei Systemkarten, vier Fälle, tatsächliche Arbeitsblattgenerierung und vier getrennte Lösungen bestanden. Der erste Lauf erkannte einen fehlenden inneren Prüfmarker bei den exportierten Lösungen; Kennzeichnung korrigiert und erneut bestanden.
- `browser_encryption_workshop.js`, Bericht 2026-09-16T15:55:18.834Z, Chromium 151.0.7922.34: reale Verschlüsselung im Browser und unabhängiges Öffnen mit Node-Kryptografie; umgekehrt Node-Dateien im Browser geöffnet. Unicode, Emoji, HTML-artiger Klartext, führendes BOM und maximaler 3.000-Byte-Text geprüft. Download, Neuladen und Dateiimport, falsches Passwort, manipulierte Daten, frische Zufallswerte, fünf ungültige Datenobjekte und zwei ungültige Dateien bestanden. Leeren während angehaltener Schlüsselableitung gibt später kein Ergebnis frei. Leere Texte/kurze Passwörter abgewiesen. Keine zusätzlichen Netzwerkanfragen beim geprüften Ver-/Entschlüsseln, lokaler Speicher und Sitzungsspeicher unverändert. Fehlende Browserunterstützung simuliert und geprüft.
- Zwölf Layoutfälle: Kapitel und Werkstatt jeweils in 320/390/1280 Pixeln und hellem/dunklem Design. Kein äußerer Überlauf; Werkstatt-Eingaben und Schaltflächen mindestens 44 Pixel hoch. Native Tastaturaktivierung, Fokus nach Übernahme/Reset, Linköffnung zur Werkstatt und alle 24 bewerteten Kapitelantwortwege bestanden. Keine Seitenfehler. Ein anfänglich falscher Screenshotselektor wurde vor dem erfolgreichen Lauf korrigiert.
- Mobile Ansichten der Werkstatt und Angebotskarten hell/dunkel visuell gelesen. Finale Druckfassung vom 2026-09-16T15:55:58.918Z: 14 Seiten. Protokoll und Vergleichslösungen nach erster Sichtprüfung zusammengehalten. Seiten 3–14 final gelesen; Seiten 1–2 per SHA-256 bildidentisch mit den zuvor gelesenen Seiten. Keine abgeschnittenen oder überlappenden Inhalte festgestellt. Nach letzter Verbesserung einer falschen Antwortalternative erneut alle DOM-Antwortwege und Druckfassung geprüft; Browser-Quizschlüssel unverändert.
- Bestehende Prüfungen für alle 21 DGB-Arbeitsblätter, Kapitelrevisionen und vollständige Quizpools bestanden. Syntax der neuen Skripte sowie Audit der 87 bestehenden Themenskripte bestanden. Inventar: 197 Kapitel; Prioritätsaudit: 1.634 Frageninstanzen ohne Strukturfehler. Kein neuer vollständiger Gesamtsuitenlauf.

Berichte und Bilder liegen außerhalb des Repositorys unter `../browser-qa/encryption-workshop`. `final-01.png` bis `final-14.png` entsprechen der letzten Druckfassung. Die PDF-Testlinks verwenden die lokale Vorschauadresse.

## Quellen, am 16.09.2026 unmittelbar gelesen

- [RIS: aktueller Mittelschullehrplan](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007850), DGB 4. Klasse, Handeln: Zusammenarbeit der Systemebenen, Verschlüsselungssoftware einsetzen, zivilgesellschaftliche Beteiligung, Konfiguration/Selbstbestimmung sowie Verbraucherrechte und Schutz vor Missbrauch.
- [MDN: deriveKey](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey) und [AES-GCM](https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams): Schlüsselableitung, IV und Authentifizierung. [OWASP: Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), PBKDF2-Abschnitt: Orientierung für den Arbeitsfaktor. Die Seite betrifft Passwortspeicherung; daraus wird keine umfassende Sicherheitszertifizierung der Dateiverschlüsselung abgeleitet.
- [Arbeiterkammer: Dark Patterns](https://www.arbeiterkammer.at/beratung/konsument/HandyundInternet/Internet/Dark_Patterns.html) und [Geschäftsfähigkeit](https://www.arbeiterkammer.at/beratung/konsument/konsumundeinkauf/kaufundrechte/Wer_Vertraege_abschliessen_kann.html): manipulative Gestaltung, Beratung und altersabhängiger Vertragsrahmen. Angebote, Zahlen und Schulhofmaterial sind selbst verfasste Unterrichtsfälle.

Die Werkstatt liefert konkrete Lerngelegenheiten und Funktionsnachweise. Unterrichtserprobung, Prüfung echter Schulplattformen, umfassende fachliche Abnahme sämtlicher DGB-Kapitel und das gesamte Produktziel bleiben offen. Keine Übersetzungen geändert; dieser neue Stand wurde noch nicht gepusht.
