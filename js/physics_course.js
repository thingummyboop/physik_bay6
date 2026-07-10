// Shared learning support and the curriculum additions for physics.
(function () {
    "use strict";

    function mc(id, question, correct, wrongA, wrongB, explanation) {
        return {
            id,
            question,
            answers: [
                { text: correct, correct: true, pts: 10, feedback: `Genau. ${explanation}` },
                { text: wrongA, correct: false, pts: 0, feedback: `Noch nicht. ${explanation}` },
                { text: wrongB, correct: false, pts: 0, feedback: `Noch nicht. ${explanation}` }
            ]
        };
    }

    const support = {
        sieinheiten: {
            grade: 1,
            prerequisite: "Du brauchst nur Zahlen, ein Lineal und Neugier beim Messen.",
            terms: [
                ["Messgröße", "Eine Eigenschaft, die gemessen werden kann, zum Beispiel Länge oder Zeit."],
                ["Einheit", "Der vereinbarte Vergleichsmaßstab einer Messung, zum Beispiel Meter oder Sekunde."],
                ["Messwert", "Die Zahl zusammen mit ihrer Einheit, zum Beispiel 1,6 m."],
                ["Messunsicherheit", "Der kleine Bereich, in dem der wirkliche Wert wahrscheinlich liegt."]
            ]
        },
        rechenbeispiele: {
            grade: 1,
            prerequisite: "Du solltest die vier Grundrechnungsarten und einfache Einheiten kennen.",
            terms: [
                ["Formel", "Eine kurze mathematische Beschreibung eines Zusammenhangs."],
                ["Variable", "Ein Buchstabe, der für eine Messgröße steht, zum Beispiel s für den Weg."],
                ["Einsetzen", "Bekannte Werte mit ihren Einheiten an die richtige Stelle einer Formel schreiben."],
                ["Ergebnischeck", "Prüfen, ob Zahl, Einheit und Größenordnung sinnvoll sind."]
            ]
        },
        optik1: {
            grade: 2,
            prerequisite: "Beobachte Licht und Schatten in deiner Umgebung.",
            terms: [
                ["Lichtquelle", "Ein Körper, der selbst Licht aussendet."],
                ["Lichtstrahl", "Eine gedachte Linie, mit der man den Weg des Lichts darstellt."],
                ["Kernschatten", "Der ganz dunkle Bereich, den kein Licht der Quelle erreicht."],
                ["Reflexion", "Das Zurückwerfen von Licht an einer Oberfläche."],
                ["Beugung", "Das Ausbreiten einer Welle hinter einer engen Öffnung oder Kante."]
            ]
        },
        farben: {
            grade: 2,
            prerequisite: "Du solltest wissen, dass weißes Licht aus vielen Farben besteht.",
            terms: [
                ["Spektrum", "Die geordnete Folge der Farben beziehungsweise Wellenlängen."],
                ["Wellenlänge", "Der Abstand zwischen zwei gleichen Stellen einer Welle."],
                ["Absorption", "Ein Stoff nimmt Lichtenergie auf, statt das Licht zurückzuwerfen."],
                ["Farbmischung", "Mehrere Lichtfarben oder Farbstoffe ergeben gemeinsam einen neuen Farbeindruck."]
            ]
        },
        linsen_spiegel: {
            grade: 2,
            prerequisite: "Hilfreich sind die Kapitel über Lichtstrahlen und Reflexion.",
            terms: [
                ["Brechung", "Licht ändert beim Übergang zwischen zwei Stoffen seine Richtung."],
                ["Brennpunkt", "Punkt, in dem parallele Lichtstrahlen nach einer Sammellinse zusammentreffen."],
                ["Sammellinse", "In der Mitte dicke Linse, die paralleles Licht bündelt."],
                ["Zerstreuungslinse", "In der Mitte dünne Linse, die paralleles Licht auseinanderlaufen lässt."],
                ["virtuelles Bild", "Ein Bild, von dem Licht nur scheinbar ausgeht und das nicht auf einem Schirm entsteht."]
            ]
        },
        akustik: {
            grade: 2,
            prerequisite: "Achte darauf, was an einem klingenden Gegenstand schwingt.",
            terms: [
                ["Schallquelle", "Ein schwingender Körper, von dem Schall ausgeht."],
                ["Frequenz", "Anzahl der Schwingungen pro Sekunde; Einheit Hertz."],
                ["Amplitude", "Größte Auslenkung einer Schwingung; sie beeinflusst die Lautstärke."],
                ["Resonanz", "Starkes Mitschwingen, wenn eine passende Frequenz angeregt wird."],
                ["Dezibel", "Einheit für den Schallpegel, abgekürzt dB."]
            ]
        },
        kraft_und_bewegung: {
            grade: 3,
            prerequisite: "Du solltest Weg, Zeit und Masse messen können.",
            terms: [
                ["Geschwindigkeit", "Zurückgelegter Weg pro benötigter Zeit."],
                ["Beschleunigung", "Änderung der Geschwindigkeit pro Zeit."],
                ["Kraft", "Eine Einwirkung, die Bewegung oder Form eines Körpers ändern kann."],
                ["Trägheit", "Körper behalten ohne resultierende Kraft ihren Bewegungszustand bei."],
                ["resultierende Kraft", "Die gemeinsame Wirkung aller Kräfte auf einen Körper."]
            ]
        },
        drehundstatik: {
            grade: 3,
            prerequisite: "Du solltest Kräfte als Pfeile darstellen können.",
            terms: [
                ["Drehmoment", "Drehwirkung einer Kraft; sie hängt von Kraft und Hebelarm ab."],
                ["Hebelarm", "Kürzester Abstand zwischen Drehpunkt und Wirkungslinie der Kraft."],
                ["Schwerpunkt", "Gedachter Punkt, in dem man die Gewichtskraft zusammenfassen kann."],
                ["Gleichgewicht", "Zustand ohne Änderung der Bewegung oder Drehbewegung."]
            ]
        },
        arbeit: {
            grade: 3,
            prerequisite: "Du brauchst Kraft, Weg und die passenden SI-Einheiten.",
            terms: [
                ["mechanische Arbeit", "Energieübertragung, wenn eine Kraft einen Körper entlang eines Weges bewegt."],
                ["Joule", "Einheit von Arbeit und Energie; ein Joule ist ein Newtonmeter."],
                ["Leistung", "Arbeit beziehungsweise umgewandelte Energie pro Zeit."],
                ["Wirkungsgrad", "Anteil der zugeführten Energie, der als gewünschte Nutzenergie ankommt."]
            ]
        },
        energie: {
            grade: 3,
            prerequisite: "Du solltest mechanische Arbeit und einfache Bewegungen verstehen.",
            terms: [
                ["Energie", "Fähigkeit eines Systems, Veränderungen zu bewirken oder Arbeit zu verrichten."],
                ["Energieform", "Art, in der Energie gespeichert oder übertragen wird."],
                ["Energieumwandlung", "Energie wechselt ihre Form, ihre Gesamtmenge bleibt erhalten."],
                ["Energieentwertung", "Energie verteilt sich als Wärme und ist danach schwerer nutzbar."]
            ]
        },
        elektrizitaet: {
            grade: 3,
            prerequisite: "Du solltest Energieformen und einfache Teilchenvorstellungen kennen.",
            terms: [
                ["elektrische Ladung", "Eigenschaft von Teilchen und Körpern; es gibt positive und negative Ladung."],
                ["Stromstärke", "Ladungsmenge, die pro Zeit durch einen Leiterquerschnitt fließt; Einheit Ampere."],
                ["Spannung", "Antrieb für einen elektrischen Strom; Einheit Volt."],
                ["Widerstand", "Gibt an, wie stark ein Bauteil den Strom hemmt; Einheit Ohm."],
                ["Stromkreis", "Geschlossener Weg aus Quelle, Leitungen und Verbraucher."]
            ]
        },
        elektromagnetismus: {
            grade: 3,
            prerequisite: "Du solltest Stromkreis, Spannung und Stromstärke erklären können.",
            terms: [
                ["Magnetfeld", "Raum, in dem magnetische Kräfte wirken."],
                ["Elektromagnet", "Stromdurchflossene Spule, oft mit Eisenkern, die ein Magnetfeld erzeugt."],
                ["Induktion", "Eine Spannungsentstehung durch die Änderung eines Magnetfelds."],
                ["Generator", "Gerät, das Bewegungsenergie mithilfe von Induktion in elektrische Energie umwandelt."],
                ["Transformator", "Gerät, das Wechselspannungen mithilfe zweier Spulen verändert."]
            ]
        },
        waermelehre: {
            grade: 4,
            prerequisite: "Hilfreich sind das Teilchenmodell und der Begriff Energie.",
            terms: [
                ["Temperatur", "Maß dafür, wie stark sich die Teilchen eines Stoffes ungeordnet bewegen."],
                ["Wärme", "Energie, die wegen eines Temperaturunterschieds übertragen wird."],
                ["Wärmeleitung", "Wärmeübertragung durch Stöße und Schwingungen benachbarter Teilchen."],
                ["Konvektion", "Wärmetransport durch strömende Flüssigkeiten oder Gase."],
                ["Wärmestrahlung", "Energieübertragung durch elektromagnetische Strahlung."]
            ]
        },
        wetter: {
            grade: 4,
            prerequisite: "Du brauchst die Wärmelehre und solltest Messwerte lesen können.",
            terms: [
                ["Luftdruck", "Kraft der Luftteilchen auf eine Fläche; beim Wetter oft in Hektopascal angegeben."],
                ["Luftfeuchtigkeit", "Anteil des Wasserdampfs in der Luft."],
                ["Front", "Grenzbereich zwischen Luftmassen mit unterschiedlichen Eigenschaften."],
                ["Konvektion", "Aufsteigen warmer und Absinken kühler Luft."],
                ["Niederschlag", "Wasser, das flüssig oder fest aus Wolken zur Erde fällt."]
            ]
        },
        klima: {
            grade: 4,
            prerequisite: "Du solltest Wetterelemente messen und Diagramme lesen können.",
            terms: [
                ["Klima", "Typischer Verlauf des Wetters in einer Region über mindestens etwa 30 Jahre."],
                ["Klimafaktor", "Einfluss wie Höhenlage, Breitenlage, Meer oder Gebirge, der das Klima mitbestimmt."],
                ["Klimanormalwert", "Mittelwert einer Wettergröße über einen festgelegten Zeitraum von 30 Jahren."],
                ["Klimadiagramm", "Darstellung von Temperatur und Niederschlag eines Ortes im Jahresverlauf."]
            ]
        },
        klimawandel: {
            grade: 4,
            prerequisite: "Du solltest Wetter von Klima unterscheiden und Diagramme auswerten können.",
            terms: [
                ["Treibhauseffekt", "Erwärmung der Erdoberfläche, weil bestimmte Gase Wärmestrahlung aufnehmen und wieder abgeben."],
                ["Treibhausgas", "Gas wie Kohlendioxid oder Methan, das Wärmestrahlung in der Atmosphäre beeinflusst."],
                ["Klimaschutz", "Maßnahmen, die Treibhausgas-Ausstoß senken oder Treibhausgase binden."],
                ["Anpassung", "Maßnahmen, die Schäden durch bereits eintretende Klimafolgen verringern."],
                ["Kipppunkt", "Schwelle, nach deren Überschreiten sich ein Teil des Klimasystems stark und schwer umkehrbar verändert."]
            ]
        },
        strahlung_radioaktivitaet: {
            grade: 4,
            prerequisite: "Du brauchst das Teilchenmodell, Energie und ein Grundwissen über Atome.",
            terms: [
                ["Ionisation", "Ein Atom oder Molekül verliert oder erhält Elektronen und wird dadurch elektrisch geladen."],
                ["Isotop", "Atome desselben Elements mit gleicher Protonenzahl, aber unterschiedlicher Neutronenzahl."],
                ["radioaktiver Zerfall", "Ein instabiler Atomkern wandelt sich von selbst um und sendet Strahlung aus."],
                ["Halbwertszeit", "Zeit, nach der im Mittel die Hälfte der anfangs vorhandenen instabilen Kerne noch nicht zerfallen ist."],
                ["Aktivität", "Anzahl der Kernzerfälle pro Sekunde; Einheit Becquerel."],
                ["Dosis", "Maß für die Wirkung auf Materie oder Körper; für das Strahlenrisiko wird oft Sievert verwendet."]
            ]
        },
        kraftwerke_energieversorgung: {
            grade: 4,
            prerequisite: "Du solltest Energieumwandlung, Induktion und Wirkungsgrad kennen.",
            terms: [
                ["Primärenergie", "Energie, die in einer natürlichen Quelle steckt, bevor sie technisch umgewandelt wird."],
                ["Generator", "Wandelt Bewegungsenergie durch elektromagnetische Induktion in elektrische Energie um."],
                ["Wirkungsgrad", "Anteil der zugeführten Energie, der als gewünschte Nutzenergie ankommt."],
                ["Stromnetz", "Leitungen und Anlagen, die elektrische Energie zwischen Erzeugung und Verbrauch verteilen."],
                ["Speicher", "Nimmt Energie auf und gibt sie später wieder ab."],
                ["Versorgungssicherheit", "Elektrische Energie ist zuverlässig dann verfügbar, wenn sie gebraucht wird."]
            ]
        },
        astronomie: {
            grade: 4,
            prerequisite: "Hilfreich sind Licht, Kräfte, Bewegung und das Lesen von Modellen.",
            terms: [
                ["Lichtjahr", "Strecke, die Licht in einem Jahr zurücklegt, keine Zeitangabe."],
                ["Gravitation", "Anziehung zwischen Körpern mit Masse."],
                ["Umlaufbahn", "Weg eines Himmelskörpers um einen anderen Körper."],
                ["Spektrum", "Zerlegtes Licht, aus dem man Eigenschaften eines Himmelskörpers bestimmen kann."],
                ["Galaxie", "Großes System aus Sternen, Gas, Staub und dunkler Materie."]
            ]
        }
    };

    const sectionGuides = {
        "optik1:2": ["Warum gibt es Sonnen- und Mondfinsternisse?", "Sonne, Erde und Mond müssen fast genau auf einer Linie stehen. Dann fällt der Schatten eines Körpers auf einen anderen.", "Eine Finsternis entsteht nicht jeden Monat, weil die Mondbahn gegenüber der Erdbahn geneigt ist.", "Stelle Sonne, Erde und Mond mit Lampe und zwei Kugeln nach. Verändere die Stellung, bis ein Schatten auf die kleine oder große Kugel fällt."],
        "farben:2": ["Warum ist ein Farbkreis kein Spektrum?", "Der Farbkreis ordnet Farbeindrücke und Mischungen. Ein Spektrum ordnet Licht nach Wellenlängen. Das sind zwei verschiedene Modelle.", "Violett und Rot liegen im sichtbaren Spektrum an entgegengesetzten Enden. Im Farbkreis werden sie verbunden, weil dort Mischungen dargestellt werden.", "Vergleiche einen Farbkreis mit einem gezeichneten Spektralband. Notiere zwei Unterschiede und wofür jedes Modell nützlich ist."],
        "waermelehre:1": ["Wie gelangt Wärme durch einen festen Stoff?", "In festen Stoffen geben schwingende Teilchen Energie an benachbarte Teilchen weiter. Metalle leiten Wärme meist gut.", "Bei Wärmeleitung wandern nicht alle Teilchen vom heißen zum kalten Ende. Übertragen wird vor allem Energie.", "Vergleiche einen Metall- und einen Holzlöffel in warmem Wasser. Berühre nur die trockenen Enden und beschreibe den Unterschied."],
        "waermelehre:2": ["Wie erreicht uns die Wärme der Sonne durch den leeren Weltraum?", "Wärmestrahlung braucht keinen Stoff. Jeder warme Körper sendet elektromagnetische Strahlung aus.", "Wärmestrahlung ist nicht dasselbe wie warme Luft. Zwischen Sonne und Erde befindet sich fast leerer Raum.", "Halte eine Hand mit Abstand neben eine warme, sichere Oberfläche. Erkläre, warum du Wärme spürst, obwohl du sie nicht berührst."],
        "waermelehre:3": ["Warum steigt warme Luft auf?", "Erwärmte Luft dehnt sich aus. Bei gleichem Druck hat sie eine geringere Dichte und erfährt Auftrieb.", "Wärme steigt nicht als Stoff nach oben. Strömende warme Luft transportiert Energie nach oben.", "Beobachte die Luftbewegung über einem Heizkörper mit einem sehr leichten Papierstreifen. Halte genügend Abstand und beschreibe die Strömung."],
        "waermelehre:4": ["Warum werden Brücken und Schienen mit Fugen gebaut?", "Viele Stoffe dehnen sich beim Erwärmen aus und ziehen sich beim Abkühlen zusammen.", "Die Teilchen selbst werden dabei nicht größer. Ihre mittleren Abstände ändern sich.", "Suche an einer Brücke, Schiene oder einem Heizungsrohr eine Dehnungsfuge. Zeichne, wo das Material Platz zum Ausdehnen hat."],
        "elektrizitaet:0": ["Was fließt in einem elektrischen Stromkreis?", "In Metallen bewegen sich Elektronen gerichtet. Die Stromstärke beschreibt, wie viel Ladung pro Zeit vorbeikommt.", "Elektrischer Strom wird im Verbraucher nicht aufgebraucht. Übertragen und umgewandelt wird Energie.", "Baue einen einfachen Stromkreis aus Batterie, Lampe und Schalter. Zeichne den geschlossenen Weg des Stroms."],
        "elektrizitaet:1": ["Wovon hängt die Stromstärke ab?", "Eine größere Spannung treibt stärker. Ein größerer Widerstand hemmt stärker. Für ohmsche Bauteile gilt I = U / R.", "Spannung fließt nicht durch die Leitung. Sie beschreibt den Energieunterschied pro Ladung.", "Verändere in der Simulation zuerst nur die Spannung und dann nur den Widerstand. Notiere jeweils, was mit der Stromstärke geschieht."],
        "elektrizitaet:2": ["Wie trennt eine Batterie Ladungen?", "Chemische Vorgänge in der Batterie halten zwischen ihren Polen eine Spannung aufrecht. In einem geschlossenen Kreis kann dadurch Strom fließen.", "Eine Batterie speichert keine fertigen Elektronen. Elektronen sind bereits in den Leitern vorhanden; die Batterie liefert den Antrieb.", "Ordne Batterie, Schalter und Lampe zu einer Wirkungskette. Erkläre in drei Sätzen, was beim Schließen des Schalters geschieht."],
        "elektromagnetismus:0": ["Wie kann Strom eine Kompassnadel bewegen?", "Jeder elektrische Strom erzeugt ein Magnetfeld um den Leiter. Seine Richtung hängt von der Stromrichtung ab.", "Der Draht wird nicht dauerhaft magnetisch. Das Magnetfeld besteht nur, solange Strom fließt.", "Ändere Stromstärke und Stromrichtung in der Simulation. Beschreibe getrennt, was mit Stärke und Richtung des Magnetfelds geschieht."],
        "elektromagnetismus:4": ["Wie entsteht in einem Generator elektrische Spannung?", "Eine Spannung wird induziert, wenn sich der magnetische Fluss durch eine Spule ändert, etwa durch Bewegung von Magnet oder Spule.", "Induktion ist nicht einfach das Gegenteil eines Elektromagneten. Entscheidend ist die Änderung des Magnetfelds.", "Bewege einen Magneten unterschiedlich schnell an einer Spule. Sage voraus, wann die größte Spannung entsteht, und prüfe deine Vermutung."],
        "elektromagnetismus:5": ["Warum kann ein Transformator Spannung verändern?", "Wechselstrom erzeugt in der ersten Spule ein veränderliches Magnetfeld. Dieses induziert in der zweiten Spule eine Spannung.", "Ein Transformator funktioniert mit gleichbleibendem Gleichstrom nicht dauerhaft, weil sich das Magnetfeld dann nicht mehr ändert.", "Verändere die Windungszahl der zweiten Spule. Formuliere eine Regel für die Veränderung der Spannung."],
        "arbeit:1": ["Was geschieht mit Energie bei Reibung?", "Reibung kann mechanische Energie in innere Energie umwandeln. Oberflächen und Umgebung werden dabei wärmer.", "Energie verschwindet durch Reibung nicht. Sie ist danach nur stärker verteilt und schwerer nutzbar.", "Reibe deine Hände zehn Sekunden aneinander. Beschreibe die Energieumwandlung vom Bewegen bis zum Wärmegefühl."],
        "arbeit:3": ["Wie hängen Arbeit und Energie zusammen?", "Verrichtete Arbeit überträgt Energie. Beim Beschleunigen steigt Bewegungsenergie, beim Verformen kann Spannenergie gespeichert werden.", "Arbeit ist keine zusätzliche Energieform. Sie beschreibt einen Weg der Energieübertragung.", "Spanne vorsichtig ein Gummiband und beschleunige anschließend einen leichten Papierball. Beschreibe, wo Energie gespeichert und wohin sie übertragen wird."],
        "linsen_spiegel:1": ["Warum wirkt ein Strohhalm im Wasser geknickt?", "Licht ändert an der Grenze zwischen zwei Stoffen seine Geschwindigkeit und meist auch seine Richtung. Das nennt man Brechung.", "Der Gegenstand ist nicht wirklich geknickt. Nur die Lichtstrahlen erreichen dein Auge aus einer anderen Richtung.", "Stelle einen Stift in ein Wasserglas. Zeichne den scheinbaren und den wirklichen Verlauf und erkläre die Beobachtung mit Lichtstrahlen."],
        "linsen_spiegel:6": ["Wie unterscheiden sich Hohl- und Wölbspiegel?", "Ein Hohlspiegel kann paralleles Licht sammeln. Ein Wölbspiegel zerstreut es und zeigt einen größeren Blickbereich.", "Ein gekrümmter Spiegel erzeugt nicht immer ein vergrößertes Bild. Das hängt von Form und Abstand ab.", "Vergleiche Innen- und Außenseite eines glänzenden Löffels in verschiedenen Abständen. Beschreibe Bildgröße und Bildrichtung."],
        "klima:3": ["Warum haben Orte auf gleicher Breite nicht immer dasselbe Klima?", "Meer, Höhe, Gebirge, Boden und Strömungen verändern, wie viel Wärme und Feuchtigkeit einen Ort erreichen.", "Die Entfernung zum Äquator allein bestimmt das Klima nicht.", "Vergleiche zwei Orte auf ähnlicher Breite, aber mit unterschiedlicher Höhenlage oder Meeresnähe. Begründe den Klimaunterschied."],
        "klima:4": ["Wie liest man ein Klimadiagramm?", "Temperaturkurve und Niederschlagsbalken zeigen den typischen Jahresverlauf eines Ortes. Einzelne Wettertage sind darin nicht sichtbar.", "Ein Klimadiagramm ist keine Wettervorhersage. Es fasst viele Jahre zusammen.", "Bestimme wärmsten und kältesten Monat, den Jahresgang der Temperatur sowie feuchte und trockene Monate."],
        "klimawandel:3": ["Was ist der Unterschied zwischen Klimaschutz und Anpassung?", "Klimaschutz verringert Ursachen. Anpassung verringert Schäden durch Folgen, die bereits auftreten oder erwartet werden.", "Anpassung ersetzt Klimaschutz nicht. Ohne weniger Treibhausgase werden die nötigen Anpassungen immer schwieriger.", "Ordne vier Maßnahmen den Kategorien Klimaschutz, Anpassung oder beides zu und begründe jede Zuordnung."],
        "strahlung_radioaktivitaet:0": ["Welche Strahlung kann Atome verändern?", "Strahlung überträgt Energie. Ist die Energie einzelner Teilchen oder Lichtquanten groß genug, kann sie Elektronen aus Atomen lösen und ionisieren.", "Nicht jede Strahlung ist radioaktiv. Radiowellen, sichtbares Licht und Röntgenstrahlung sind elektromagnetische Strahlung, haben aber sehr unterschiedliche Energien.", "Sortiere die Beispiele im Strahlungslabor und erkläre danach, woran du ionisierende Strahlung erkennst."],
        "strahlung_radioaktivitaet:1": ["Warum sind manche Atomkerne instabil?", "Im Kern wirken anziehende Kernkräfte und die elektrische Abstoßung der Protonen. Manche Kombinationen aus Protonen und Neutronen sind nicht dauerhaft stabil.", "Radioaktivität entsteht im Atomkern, nicht in der Elektronenhülle. Erhitzen oder Abkühlen ändert die Zerfallswahrscheinlichkeit fast nie merkbar.", "Zeichne zwei Isotope desselben Elements. Lass die Protonenzahl gleich und verändere nur die Neutronenzahl."],
        "strahlung_radioaktivitaet:2": ["Worin unterscheiden sich Alpha-, Beta- und Gammastrahlung?", "Sie bestehen aus unterschiedlichen Teilchen beziehungsweise Lichtquanten und dringen deshalb unterschiedlich weit in Materie ein.", "Starke Durchdringung bedeutet nicht automatisch in jeder Situation das größte Risiko. Entscheidend sind Art, Energie, Dosis und ob die Quelle im oder außerhalb des Körpers ist.", "Ordne jeder Strahlungsart ihre Zusammensetzung, Reichweite und eine passende Abschirmung zu."],
        "strahlung_radioaktivitaet:3": ["Kann man vorhersagen, wann ein einzelner Kern zerfällt?", "Nein. Für einen einzelnen Kern ist der Zeitpunkt zufällig. Bei sehr vielen Kernen lässt sich aber zuverlässig angeben, welcher Anteil nach einer bestimmten Zeit übrig ist.", "Nach einer Halbwertszeit sind nicht alle Kerne zerfallen. Im Mittel ist noch die Hälfte der instabilen Kerne vorhanden.", "Verändere die Zahl der Halbwertszeiten. Erkläre die Folge 100 %, 50 %, 25 %, 12,5 % mit eigenen Worten."],
        "strahlung_radioaktivitaet:4": ["Wie misst man Radioaktivität und Strahlenwirkung?", "Becquerel zählt Zerfälle pro Sekunde. Gray beschreibt aufgenommene Energie pro Masse. Sievert berücksichtigt zusätzlich die biologische Wirkung.", "Aktivität und Dosis sind nicht dasselbe. Eine hohe Aktivität weit entfernt kann eine kleinere Dosis verursachen als eine schwächere Quelle direkt am Körper.", "Ordne Bq, Gy und Sv den Fragen 'Wie viele Zerfälle?', 'Wie viel Energie?' und 'Welches biologische Risiko?' zu."],
        "strahlung_radioaktivitaet:5": ["Wie schützt man sich vor ionisierender Strahlung?", "Die Grundregeln sind kurze Zeit, großer Abstand und passende Abschirmung. In der Medizin wird nur so viel Strahlung eingesetzt, wie für den Nutzen nötig ist.", "Eine Bleischürze schützt nicht gegen jede Strahlungsart und nicht in jeder Richtung. Schutz muss zur Quelle und zur Untersuchung passen.", "Löse die Schutzfälle. Begründe jedes Mal, welche der drei Grundregeln du benutzt."],
        "strahlung_radioaktivitaet:6": ["Wann ist ionisierende Strahlung nützlich?", "Sie kann Bilder aus dem Körper liefern, Tumorgewebe behandeln, Material prüfen, Spuren verfolgen und das Alter früher lebender Stoffe bestimmen.", "Nützlich bedeutet nicht harmlos. Nutzen, Dosis, Alternativen und Entsorgung müssen gemeinsam beurteilt werden.", "Wähle eine Anwendung. Beschreibe Nutzen, mögliches Risiko und eine Schutzmaßnahme in einer Tabelle."],
        "kraftwerke_energieversorgung:0": ["Woher kommt die elektrische Energie aus der Steckdose?", "Kraftwerke wandeln Primärenergie schrittweise um. Das Stromnetz transportiert die elektrische Energie zu den Verbrauchern.", "Elektrische Energie wird nicht aus dem Nichts erzeugt. Ein Kraftwerk ist ein Energieumwandler.", "Ordne für ein Beispiel Quelle, Umwandler, elektrische Energie und Verbraucher zu einer vollständigen Energiekette."],
        "kraftwerke_energieversorgung:1": ["Was haben Kohle-, Gas-, Biomasse- und Kernkraftwerke gemeinsam?", "Sie erzeugen Wärme. Häufig treibt Dampf oder heißes Gas eine Turbine an, die mit einem Generator gekoppelt ist.", "Im Kernkraftwerk wird keine Kohle verbrannt. Die Wärme entsteht durch Kernspaltung.", "Baue die gemeinsame Umwandlungskette Wärme, Strömung, Drehbewegung und elektrische Energie in der richtigen Reihenfolge auf."],
        "kraftwerke_energieversorgung:2": ["Wie erzeugen Wasser, Wind und Sonne elektrische Energie?", "Wasser und Wind drehen Turbinen beziehungsweise Rotoren mit Generatoren. Photovoltaik wandelt Licht direkt in elektrische Energie um.", "Eine Photovoltaikanlage besitzt keine Dampfturbine. Ihr physikalischer Umwandlungsweg ist anders.", "Wähle Wasserkraft, Windkraft und Photovoltaik nacheinander aus. Vergleiche ihre Energieketten."],
        "kraftwerke_energieversorgung:3": ["Warum kommt nie die ganze zugeführte Energie als Strom an?", "Bei jeder realen Umwandlung wird ein Teil der Energie als Wärme an die Umgebung übertragen. Der Wirkungsgrad beschreibt den nutzbaren Anteil.", "Verlustenergie ist nicht verschwunden. Sie ist nur meist nicht die gewünschte Nutzenergie.", "Stelle den Wirkungsgrad ein und berechne, wie viel von 1000 kWh Primärenergie als elektrische Energie ankommt."],
        "kraftwerke_energieversorgung:4": ["Wie bleibt das Stromnetz im Gleichgewicht?", "Erzeugung und Verbrauch müssen zu jedem Zeitpunkt zusammenpassen. Netze, regelbare Anlagen, Speicher und flexible Nutzung helfen dabei.", "Ein Speicher erzeugt keine zusätzliche Energie. Beim Laden und Entladen treten ebenfalls Verluste auf.", "Plane einen windarmen Abend: Wähle sinnvolle Beiträge von Netz, Speicher, regelbaren Kraftwerken und verschiebbaren Verbrauchern."],
        "kraftwerke_energieversorgung:5": ["Gibt es das eine perfekte Kraftwerk?", "Nein. Man muss Klima, Umwelt, Kosten, Sicherheit, Flächenbedarf, Rohstoffe, Abfälle und Verfügbarkeit gemeinsam vergleichen.", "'Erneuerbar' bedeutet nicht ohne jede Umweltwirkung. Es bedeutet, dass sich die Energiequelle auf menschlichen Zeitskalen erneuert.", "Vergleiche drei Technologien mit denselben Kriterien. Formuliere danach eine begründete Empfehlung statt nur eine Rangliste."],
        "wetter:4": ["Wie bewegen Meere Wärme um die Erde?", "Meeresströmungen werden durch Wind sowie Unterschiede in Temperatur und Salzgehalt angetrieben. Sie transportieren sehr viel Energie.", "Das Meer ist nicht nur ein Wärmespeicher. Bewegtes Wasser verteilt Wärme zwischen Regionen.", "Verfolge auf einer Karte eine warme und eine kalte Meeresströmung. Erkläre ihren Einfluss auf zwei Küstenregionen."]
    };

    const radiationSections = [
        {
            title: "1. Strahlung und Energie",
            content: `
                <p>Strahlung transportiert <strong>Energie</strong> von einem Ort zu einem anderen. Manche Strahlung besteht aus elektromagnetischen Wellen, zum Beispiel Radiowellen, sichtbares Licht, ultraviolettes Licht, Röntgen- und Gammastrahlung. Alpha- und Betastrahlung bestehen dagegen aus Teilchen.</p>
                <p><strong>Ionisierende Strahlung</strong> besitzt genug Energie, um Elektronen aus Atomen oder Molekülen zu lösen. Dadurch entstehen geladene Teilchen, sogenannte Ionen. Röntgen- und Gammastrahlung sind ionisierend. Radiowellen, Mikrowellen und sichtbares Licht sind es nicht. UV-Strahlung liegt am Übergang; besonders energiereiche UV-Strahlung kann ionisieren.</p>
                <div class="interactive-zone physics-lab">
                    <h3>Strahlungslabor: ionisierend oder nicht?</h3>
                    <p>Überlege vor jedem Klick. Prüfe dann deine Vermutung.</p>
                    <div class="physics-choice-row">
                        <button type="button" data-ionizing="false" onclick="checkIonizing(this)">Radiowellen</button>
                        <button type="button" data-ionizing="false" onclick="checkIonizing(this)">sichtbares Licht</button>
                        <button type="button" data-ionizing="true" onclick="checkIonizing(this)">Röntgenstrahlung</button>
                        <button type="button" data-ionizing="true" onclick="checkIonizing(this)">Gammastrahlung</button>
                    </div>
                    <p id="ionizing-feedback" class="physics-live-result" role="status" aria-live="polite" aria-atomic="true">Wähle ein Beispiel.</p>
                </div>
                {{QUIZ_rad_1a}}{{QUIZ_rad_1b}}{{QUIZ_rad_1c}}{{QUIZ_rad_1d}}`,
            quizzes: [
                mc("rad_1a", "Was bedeutet ionisieren?", "Einem Atom oder Molekül werden Elektronen genommen oder hinzugefügt.", "Ein Stoff wird nur wärmer.", "Ein Lichtstrahl wird gespiegelt.", "Bei einer Ionisation entsteht ein elektrisch geladenes Teilchen."),
                mc("rad_1b", "Welche Strahlung ist sicher ionisierend?", "Röntgenstrahlung", "Radiowellen", "sichtbares rotes Licht", "Röntgenstrahlung kann Elektronen aus Atomen lösen."),
                mc("rad_1c", "Welche Aussage ist richtig?", "Strahlung kann Energie übertragen.", "Jede Strahlung ist radioaktiv.", "Strahlung besteht immer aus Teilchen mit Masse.", "Zur Strahlung gehören elektromagnetische Wellen und Teilchenstrahlung."),
                mc("rad_1d", "Was unterscheidet Radiowellen und Gammastrahlung?", "Gammastrahlung hat pro Lichtquant viel mehr Energie.", "Radiowellen bewegen sich im Vakuum schneller.", "Gammastrahlung kann sich nur in Luft ausbreiten.", "Beide sind elektromagnetisch und im Vakuum gleich schnell, aber ihre Frequenzen und Energien unterscheiden sich stark.")
            ]
        },
        {
            title: "2. Atomkerne und Isotope",
            content: `
                <p>Ein Atomkern besteht aus positiv geladenen <strong>Protonen</strong> und ungeladenen <strong>Neutronen</strong>. Die Zahl der Protonen bestimmt das Element. Kohlenstoff hat zum Beispiel immer sechs Protonen.</p>
                <p>Atome desselben Elements können unterschiedlich viele Neutronen besitzen. Solche Varianten heißen <strong>Isotope</strong>. Kohlenstoff-12 und Kohlenstoff-14 sind beide Kohlenstoff, aber Kohlenstoff-14 hat zwei Neutronen mehr. Manche Isotope sind stabil. Andere Kerne sind instabil und wandeln sich von selbst um. Dieser Vorgang heißt radioaktiver Zerfall.</p>
                <div class="remember-box"><strong>Merke:</strong> Radioaktiv ist nicht ein einzelnes Elektron, sondern ein instabiler Atomkern. Der Zerfall lässt sich durch gewöhnliches Erwärmen, Kühlen oder Zerkleinern praktisch nicht stoppen.</div>
                {{QUIZ_rad_2a}}{{QUIZ_rad_2b}}{{QUIZ_rad_2c}}{{QUIZ_rad_2d}}`,
            quizzes: [
                mc("rad_2a", "Was bestimmt, zu welchem Element ein Atom gehört?", "Die Zahl seiner Protonen", "Die Zahl seiner Elektronen allein", "Seine Temperatur", "Die Protonenzahl ist die Ordnungszahl des Elements."),
                mc("rad_2b", "Was unterscheidet zwei Isotope desselben Elements?", "Die Zahl der Neutronen", "Die Zahl der Protonen", "Die elektrische Ladung jedes Protons", "Isotope haben dieselbe Protonenzahl, aber verschiedene Neutronenzahlen."),
                mc("rad_2c", "Wo entsteht radioaktiver Zerfall?", "Im Atomkern", "Nur an der Oberfläche eines Stoffes", "In einer Batterie", "Ein instabiler Atomkern wandelt sich um."),
                mc("rad_2d", "Welche Aussage zu Kohlenstoff-12 und Kohlenstoff-14 stimmt?", "Beide sind Kohlenstoffisotope.", "Kohlenstoff-14 ist ein anderes Element.", "Kohlenstoff-12 hat keine Protonen.", "Beide besitzen sechs Protonen und unterscheiden sich in der Neutronenzahl.")
            ]
        },
        {
            title: "3. Alpha-, Beta- und Gammastrahlung",
            content: `
                <p>Beim Zerfall können verschiedene Arten ionisierender Strahlung entstehen. <strong>Alphastrahlung</strong> besteht aus Heliumkernen. Sie ionisiert stark, reicht in Luft aber nur wenige Zentimeter weit und wird schon von Papier oder der äußeren Hautschicht gestoppt. Gelangt ein Alphastrahler in den Körper, kann er dort besonders schädlich sein.</p>
                <p><strong>Betastrahlung</strong> besteht meist aus schnellen Elektronen. Sie dringt weiter als Alphastrahlung und kann etwa durch Kunststoff oder dünnes Metall abgeschirmt werden. <strong>Gammastrahlung</strong> ist sehr energiereiche elektromagnetische Strahlung. Sie dringt weit durch Materie; dicke Schichten aus Beton oder Blei schwächen sie.</p>
                <div class="physics-data-table-wrap">
                    <table class="physics-data-table">
                        <thead><tr><th>Art</th><th>besteht aus</th><th>Reichweite</th><th>Abschirmung</th></tr></thead>
                        <tbody>
                            <tr><td>Alpha</td><td>Heliumkernen</td><td>kurz</td><td>Papier, äußere Haut</td></tr>
                            <tr><td>Beta</td><td>schnellen Elektronen</td><td>mittel</td><td>Kunststoff, dünnes Metall</td></tr>
                            <tr><td>Gamma</td><td>Lichtquanten</td><td>groß</td><td>dicker Beton oder Blei schwächt</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="interactive-zone physics-lab">
                    <h3>Abschirmung prüfen</h3>
                    <p>Wähle für Alphastrahlung die einfachste ausreichende Abschirmung.</p>
                    <div class="physics-choice-row">
                        <button type="button" data-shield="correct" onclick="checkShield(this)">Papier</button>
                        <button type="button" data-shield="possible" onclick="checkShield(this)">dicker Beton</button>
                        <button type="button" data-shield="wrong" onclick="checkShield(this)">keine Abschirmung</button>
                    </div>
                    <p id="shield-feedback" class="physics-live-result" role="status" aria-live="polite" aria-atomic="true">Wähle ein Material.</p>
                </div>
                {{QUIZ_rad_3a}}{{QUIZ_rad_3b}}{{QUIZ_rad_3c}}{{QUIZ_rad_3d}}`,
            quizzes: [
                mc("rad_3a", "Woraus besteht Alphastrahlung?", "Aus Heliumkernen", "Aus Schallwellen", "Aus sichtbarem Licht", "Ein Alphateilchen enthält zwei Protonen und zwei Neutronen."),
                mc("rad_3b", "Welche Strahlungsart dringt am stärksten durch Materie?", "Gammastrahlung", "Alphastrahlung", "hörbarer Schall", "Gammastrahlung wird erst durch dicke Schichten deutlich geschwächt."),
                mc("rad_3c", "Warum kann ein Alphastrahler im Körper gefährlich sein?", "Er gibt seine Energie auf kurzer Strecke dicht an Gewebe ab.", "Alpha strahlt nur außerhalb des Körpers.", "Alphateilchen sind völlig wirkungslos.", "Außerhalb schützt die Haut, im Körper fehlt diese schützende Barriere."),
                mc("rad_3d", "Welche Abschirmung passt typischerweise zu Betastrahlung?", "Kunststoff oder dünnes Metall", "Nur ein Blatt Luft", "Ein Gehörschutz", "Material und Dicke der Abschirmung müssen zur Strahlungsart passen.")
            ]
        },
        {
            title: "4. Zerfall und Halbwertszeit",
            content: `
                <p>Der Zerfall eines einzelnen instabilen Kerns ist <strong>zufällig</strong>. Man kann nicht vorhersagen, welcher Kern als Nächstes zerfällt. Bei sehr vielen Kernen ist das Verhalten trotzdem regelmäßig: Nach einer Halbwertszeit ist im Mittel die Hälfte der anfangs vorhandenen instabilen Kerne noch nicht zerfallen.</p>
                <p>Nach zwei Halbwertszeiten bleibt die Hälfte der Hälfte, also ein Viertel. Nach drei Halbwertszeiten bleibt ein Achtel. Der Stoff ist dann nicht plötzlich verschwunden. Die Menge nähert sich schrittweise null an.</p>
                <div class="interactive-zone physics-lab">
                    <h3>Halbwertszeit-Modell</h3>
                    <label for="half-life-range">Vergangene Halbwertszeiten: <strong id="half-life-count">0</strong></label>
                    <input id="half-life-range" type="range" min="0" max="6" value="0" step="1" aria-describedby="half-life-result" oninput="updateHalfLife(this.value)">
                    <div class="decay-track" aria-hidden="true"><span id="decay-bar" style="width:100%"></span></div>
                    <p id="half-life-result" class="physics-live-result" role="status" aria-live="polite" aria-atomic="true">Von 1000 Kernen sind im Mittel noch 1000 nicht zerfallen: 100 %.</p>
                </div>
                {{QUIZ_rad_4a}}{{QUIZ_rad_4b}}{{QUIZ_rad_4c}}{{QUIZ_rad_4d}}`,
            quizzes: [
                mc("rad_4a", "Was bleibt nach einer Halbwertszeit im Mittel übrig?", "Die Hälfte der instabilen Kerne", "Gar kein instabiler Kern", "Immer genau ein Kern", "Die Halbwertszeit halbiert die noch vorhandene Anzahl im statistischen Mittel."),
                mc("rad_4b", "Wie viel bleibt nach drei Halbwertszeiten?", "Ein Achtel", "Drei Viertel", "Ein Drittel", "Die Folge lautet 1, 1/2, 1/4, 1/8."),
                mc("rad_4c", "Kann man den Zerfallszeitpunkt eines einzelnen Kerns genau vorhersagen?", "Nein, er ist zufällig.", "Ja, immer auf die Sekunde.", "Nur durch starkes Kühlen.", "Vorhersagbar ist der Anteil einer großen Menge, nicht der Zeitpunkt eines einzelnen Kerns."),
                mc("rad_4d", "Was bedeutet eine kurze Halbwertszeit bei gleicher Anfangsmenge?", "Die Aktivität nimmt schneller ab.", "Der Stoff ist nicht radioaktiv.", "Jeder Kern lebt genau gleich lang.", "In derselben Zeit zerfällt bei kurzer Halbwertszeit ein größerer Anteil.")
            ]
        },
        {
            title: "5. Aktivität, Dosis und natürliche Strahlung",
            content: `
                <p>Die <strong>Aktivität</strong> gibt an, wie viele Kerne pro Sekunde zerfallen. Ihre Einheit ist Becquerel (Bq): 1 Bq bedeutet ein Zerfall pro Sekunde. Sie sagt allein noch nicht, welche Dosis ein Mensch erhält.</p>
                <p>Die absorbierte Dosis in Gray (Gy) beschreibt die aufgenommene Energie pro Kilogramm. Für das gesundheitliche Risiko wird häufig die Dosis in Sievert (Sv) verwendet; sie berücksichtigt, dass Strahlungsarten und Organe unterschiedlich empfindlich sind.</p>
                <p>Ionisierende Strahlung ist ein natürlicher Teil unserer Umwelt. Sie kommt aus dem Boden und aus dem Weltall; auch in Nahrung und Körper befinden sich winzige Mengen radioaktiver Isotope. Messgeräte können diese <strong>Hintergrundstrahlung</strong> nachweisen.</p>
                <div class="remember-box"><strong>Wichtig:</strong> Eine Messzahl braucht immer Einheit und Zusammenhang. Bq beschreibt eine Quelle. Sv beschreibt eine auf den Körper bezogene Wirkung.</div>
                {{QUIZ_rad_5a}}{{QUIZ_rad_5b}}{{QUIZ_rad_5c}}{{QUIZ_rad_5d}}`,
            quizzes: [
                mc("rad_5a", "Was bedeutet 1 Becquerel?", "Ein Kernzerfall pro Sekunde", "Ein Joule pro Sekunde", "Ein Meter Abschirmung", "Becquerel ist die Einheit der Aktivität."),
                mc("rad_5b", "Welche Einheit wird häufig für das Strahlenrisiko des Körpers verwendet?", "Sievert", "Meter", "Ampere", "Sievert berücksichtigt die biologische Wirkung einer Dosis."),
                mc("rad_5c", "Warum reicht die Aktivität einer Quelle für eine Risikobewertung nicht aus?", "Auch Abstand, Zeit, Strahlungsart und Aufnahmeweg bestimmen die Dosis.", "Weil Aktivität nur bei Licht gilt.", "Weil Becquerel eine Längeneinheit ist.", "Quelle und Wirkung auf einen Menschen sind verschiedene Größen."),
                mc("rad_5d", "Welche Aussage zur Hintergrundstrahlung stimmt?", "Sie stammt unter anderem aus Boden und Weltall.", "Sie existiert nur neben Kernkraftwerken.", "Sie besteht nur aus sichtbarem Licht.", "Natürliche ionisierende Strahlung ist überall in unterschiedlicher Stärke vorhanden.")
            ]
        },
        {
            title: "6. Wirkung und Strahlenschutz",
            content: `
                <p>Ionisierende Strahlung kann Moleküle in Zellen verändern. Meist repariert der Körper Schäden. Bei höherer Dosis steigt aber das Risiko, dass Zellen sterben oder später Krebs entsteht. Das Risiko hängt unter anderem von Dosis, Strahlungsart, betroffenem Gewebe und Alter ab.</p>
                <p>Strahlenschutz folgt drei einfachen Grundideen: <strong>Aufenthaltszeit kurz halten</strong>, <strong>Abstand vergrößern</strong> und <strong>passend abschirmen</strong>. Fachleute planen Untersuchungen so, dass die nötige Information mit möglichst kleiner Dosis gewonnen wird.</p>
                <div class="interactive-zone physics-lab">
                    <h3>Schutzfall lösen</h3>
                    <p>Eine geschlossene Gammaquelle liegt in einem Labor. Welche Handlung senkt deine Dosis sofort?</p>
                    <div class="physics-choice-row">
                        <button type="button" data-protection="distance" onclick="checkProtection(this)">Abstand vergrößern</button>
                        <button type="button" data-protection="wrong" onclick="checkProtection(this)">direkt daneben warten</button>
                        <button type="button" data-protection="wrong" onclick="checkProtection(this)">Quelle mit der Hand halten</button>
                    </div>
                    <p id="protection-feedback" class="physics-live-result" role="status" aria-live="polite" aria-atomic="true">Wähle eine Handlung.</p>
                </div>
                {{QUIZ_rad_6a}}{{QUIZ_rad_6b}}{{QUIZ_rad_6c}}{{QUIZ_rad_6d}}`,
            quizzes: [
                mc("rad_6a", "Welche drei Grundideen gehören zum Strahlenschutz?", "Zeit verkürzen, Abstand vergrößern, abschirmen", "Erwärmen, beleuchten, schütteln", "Lautstärke, Tonhöhe, Frequenz", "Diese drei Maßnahmen verringern je nach Situation die erhaltene Dosis."),
                mc("rad_6b", "Was kann ionisierende Strahlung in Zellen bewirken?", "Sie kann Moleküle und Erbgut verändern.", "Sie macht jedes Gewebe sofort magnetisch.", "Sie hat grundsätzlich keine Wirkung.", "Ionisationen können chemische Bindungen in wichtigen Zellmolekülen verändern."),
                mc("rad_6c", "Warum wird bei einer Röntgenaufnahme die Dosis begrenzt?", "Die nötige Information soll mit möglichst kleiner Belastung gewonnen werden.", "Weil Röntgenstrahlung nicht durch den Körper geht.", "Weil eine größere Dosis immer ein schärferes Bild ohne Nachteil ergibt.", "Medizinischer Nutzen und mögliches Strahlenrisiko werden abgewogen."),
                mc("rad_6d", "Welche Maßnahme hilft bei einer entfernten Gammaquelle?", "Abstand vergrößern", "Die Quelle in die Tasche stecken", "Länger neben der Quelle bleiben", "Mit wachsendem Abstand verteilt sich die Strahlung auf eine größere Fläche.")
            ]
        },
        {
            title: "7. Anwendungen und verantwortliche Entscheidungen",
            content: `
                <p>In der Medizin erzeugen Röntgenstrahlen Bilder, radioaktive Markierungsstoffe zeigen Stoffwechselvorgänge und energiereiche Strahlung kann Tumorzellen schädigen. In Technik und Forschung werden Schweißnähte geprüft, Materialdicken gemessen oder Stoffwege verfolgt.</p>
                <p>Die Altersbestimmung mit Kohlenstoff-14 funktioniert bei früher lebendem Material. Nach dem Tod wird kein neuer Kohlenstoff aufgenommen. Aus dem noch vorhandenen Anteil von Kohlenstoff-14 lässt sich das Alter abschätzen.</p>
                <p>Radioaktive Stoffe stellen auch Aufgaben: Sie müssen sicher verwendet, transportiert und gelagert werden. Besonders langlebige Abfälle brauchen über sehr lange Zeiträume verlässliche Barrieren. Gute Entscheidungen nennen deshalb <strong>Nutzen, Risiko, Alternativen, Schutz und Verantwortung</strong>.</p>
                <div class="mini-task"><strong>Arbeitsauftrag:</strong> Wähle Röntgendiagnostik, Krebstherapie oder Altersbestimmung. Erstelle eine Tabelle mit den Zeilen Nutzen, mögliches Risiko und Schutz. Schreibe anschließend ein begründetes Urteil in drei Sätzen.</div>
                {{QUIZ_rad_7a}}{{QUIZ_rad_7b}}{{QUIZ_rad_7c}}{{QUIZ_rad_7d}}`,
            quizzes: [
                mc("rad_7a", "Wofür eignet sich Kohlenstoff-14?", "Zur Altersbestimmung früher lebender Stoffe", "Zum Messen der Lautstärke", "Zum Laden eines Akkus", "Der verbleibende C-14-Anteil dient als Zeitmaß für organisches Material."),
                mc("rad_7b", "Was ist bei einer medizinischen Strahlenanwendung wichtig?", "Der erwartete Nutzen muss das mögliche Risiko rechtfertigen.", "Die Dosis soll immer möglichst groß sein.", "Alternativen dürfen nie geprüft werden.", "Eine Anwendung wird begründet und die Dosis so klein wie sinnvoll gehalten."),
                mc("rad_7c", "Warum brauchen langlebige radioaktive Abfälle besondere Lagerung?", "Sie können über sehr lange Zeit ionisierende Strahlung abgeben.", "Sie werden nach einer Stunde zu Trinkwasser.", "Sie sind nur wegen ihrer Farbe gefährlich.", "Barrieren sollen verhindern, dass radioaktive Stoffe Menschen und Umwelt erreichen."),
                mc("rad_7d", "Was gehört zu einem begründeten Urteil?", "Nutzen, Risiken, Alternativen und Schutzmaßnahmen", "Nur ein spontanes Gefühl", "Nur der Preis ohne weitere Folgen", "Ein gutes Urteil nennt Kriterien und belegt die Entscheidung.")
            ]
        }
    ];

    const powerSections = [
        {
            title: "1. Von der Energiequelle zur Steckdose",
            content: `
                <p>Elektrische Energie ist ein <strong>Energieträger</strong>. Sie muss aus einer anderen Energieform gewonnen und über das Stromnetz verteilt werden. Am Anfang einer Energiekette steht Primärenergie, zum Beispiel Wasser in einem Stausee, Wind, Sonnenlicht, Erdgas, Kohle, Biomasse oder Kernenergie.</p>
                <p>In einem Kraftwerk folgen mehrere Umwandlungen. Am Ende liefert ein Generator oder eine Solarzelle elektrische Energie. Leitungen und Transformatoren bringen sie mit geeigneten Spannungen zu Haushalten, Schulen und Betrieben. Im Gerät wird sie erneut umgewandelt, etwa in Licht, Bewegung oder Wärme.</p>
                <div class="interactive-zone physics-lab">
                    <h3>Energiekette erkunden</h3>
                    <div class="physics-choice-row">
                        <button type="button" onclick="showPowerChain('wind')">Windkraft</button>
                        <button type="button" onclick="showPowerChain('gas')">Gaskraftwerk</button>
                        <button type="button" onclick="showPowerChain('solar')">Photovoltaik</button>
                    </div>
                    <p id="power-chain-result" class="physics-live-result" role="status" aria-live="polite" aria-atomic="true">Wähle eine Anlage und lies ihre Energiekette.</p>
                </div>
                {{QUIZ_pow_1a}}{{QUIZ_pow_1b}}{{QUIZ_pow_1c}}{{QUIZ_pow_1d}}`,
            quizzes: [
                mc("pow_1a", "Was macht ein Kraftwerk?", "Es wandelt Energieformen um.", "Es erzeugt Energie aus dem Nichts.", "Es vernichtet Verlustenergie.", "Auch im Kraftwerk gilt die Energieerhaltung."),
                mc("pow_1b", "Was ist Primärenergie?", "Energie in einer natürlichen Quelle vor der technischen Umwandlung", "Nur die Energie in einer Steckdose", "Ausschließlich Wärme in einem Heizkörper", "Wind, Sonnenlicht und chemische Energie von Brennstoffen sind Beispiele."),
                mc("pow_1c", "Wozu dienen Transformatoren im Stromnetz?", "Sie verändern Wechselspannungen für Transport und Nutzung.", "Sie speichern Kohle.", "Sie erzeugen Wind.", "Hohe Spannung ermöglicht verlustärmeren Transport, niedrigere Spannung die sichere Verteilung."),
                mc("pow_1d", "Welche Umwandlung geschieht in einer Lampe?", "Elektrische Energie wird vor allem in Licht und Wärme umgewandelt.", "Licht wird vollständig zu Masse.", "Energie verschwindet.", "Ein Verbraucher wandelt die gelieferte elektrische Energie weiter um.")
            ]
        },
        {
            title: "2. Wärmekraftwerke und Kernkraftwerke",
            content: `
                <p>Viele Kraftwerke beginnen unterschiedlich, besitzen aber eine ähnliche Mitte: Wärme bringt Wasser zum Sieden oder erhitzt ein Gas. Die Strömung treibt eine <strong>Turbine</strong>. Die Turbine dreht einen <strong>Generator</strong>, der elektrische Spannung induziert.</p>
                <p>In Kohle-, Gas- oder Biomassekraftwerken entsteht Wärme durch Verbrennung. Dabei entstehen je nach Brennstoff Abgase, darunter Kohlendioxid. In einem Kernkraftwerk entsteht Wärme durch kontrollierte Kernspaltung. Im Betrieb entsteht dabei kaum Kohlendioxid, aber radioaktiver Abfall muss sicher gelagert werden. Auch Bau, Brennstoffgewinnung und Rückbau gehören zur Umweltbilanz.</p>
                <div class="physics-chain" aria-label="Energiekette eines Wärmekraftwerks">
                    <span>Primärenergie</span><b>→</b><span>Wärme</span><b>→</b><span>Strömung</span><b>→</b><span>Drehung</span><b>→</b><span>elektrische Energie</span>
                </div>
                {{QUIZ_pow_2a}}{{QUIZ_pow_2b}}{{QUIZ_pow_2c}}{{QUIZ_pow_2d}}`,
            quizzes: [
                mc("pow_2a", "Was treibt in vielen Wärmekraftwerken den Generator an?", "Eine Turbine", "Eine Batterie", "Ein Spiegel", "Dampf oder heißes Gas setzt die Turbine in Drehung."),
                mc("pow_2b", "Woher kommt die Wärme in einem Kernkraftwerk?", "Aus kontrollierter Kernspaltung", "Aus einer Kohleverbrennung im Reaktor", "Nur aus Sonnenlicht", "Bei der Spaltung schwerer Atomkerne wird Energie frei."),
                mc("pow_2c", "Welche gemeinsame Stufe besitzen Kohle- und Kernkraftwerke?", "Eine Turbine treibt einen Generator.", "Beide verwenden Photovoltaikzellen.", "Beide kommen ohne Kühlung aus.", "Die Wärmequellen sind verschieden, die Umwandlung über Turbine und Generator ist ähnlich."),
                mc("pow_2d", "Was gehört zu einer vollständigen Umweltbewertung?", "Bau, Betrieb, Brennstoff, Abfälle und Rückbau", "Nur die Farbe des Gebäudes", "Nur die Leistung an einem einzigen Tag", "Folgen entstehen in mehreren Phasen des Lebenswegs einer Anlage.")
            ]
        },
        {
            title: "3. Wasser, Wind und Sonnenlicht",
            content: `
                <p>Im Wasserkraftwerk strömt Wasser durch eine Turbine. Seine Lage- und Bewegungsenergie wird über den Generator in elektrische Energie umgewandelt. Stauseen können Energie speichern, verändern aber Flüsse und Lebensräume.</p>
                <p>Bei Windkraft dreht bewegte Luft die Rotorblätter. Ein Generator wandelt die Drehbewegung in elektrische Energie um. Die Leistung schwankt mit dem Wind. Photovoltaik funktioniert anders: Solarzellen wandeln Licht <strong>direkt</strong> in elektrische Energie um, ohne Turbine und Generator.</p>
                <div class="physics-data-table-wrap">
                    <table class="physics-data-table">
                        <thead><tr><th>Anlage</th><th>direkte Quelle</th><th>Generator?</th><th>typische Herausforderung</th></tr></thead>
                        <tbody>
                            <tr><td>Wasserkraft</td><td>strömendes Wasser</td><td>ja</td><td>Eingriff in Gewässer</td></tr>
                            <tr><td>Windkraft</td><td>bewegte Luft</td><td>ja</td><td>schwankender Wind</td></tr>
                            <tr><td>Photovoltaik</td><td>Licht</td><td>nein</td><td>Nacht und Bewölkung</td></tr>
                        </tbody>
                    </table>
                </div>
                {{QUIZ_pow_3a}}{{QUIZ_pow_3b}}{{QUIZ_pow_3c}}{{QUIZ_pow_3d}}`,
            quizzes: [
                mc("pow_3a", "Welche Anlage wandelt Licht direkt in elektrische Energie um?", "Photovoltaikanlage", "Dampfturbine", "Kohlekessel", "Solarzellen benötigen für diese Umwandlung keine Turbine."),
                mc("pow_3b", "Welche Energie treibt ein Windrad unmittelbar an?", "Bewegungsenergie der Luft", "Kernenergie", "Schallenergie", "Der Rotor übernimmt Bewegungsenergie aus dem Wind."),
                mc("pow_3c", "Welcher Vorteil ist bei einem Speicherkraftwerk möglich?", "Wasser kann gespeichert und bei Bedarf genutzt werden.", "Es braucht niemals ein Gewässer.", "Es hat keine Wirkung auf die Umwelt.", "Die Lageenergie des gespeicherten Wassers steht später zur Verfügung."),
                mc("pow_3d", "Warum schwankt die Leistung von Wind- und Solaranlagen?", "Wind und Sonneneinstrahlung ändern sich.", "Generatoren dürfen nur montags laufen.", "Elektrische Energie kann nicht übertragen werden.", "Wetter und Tageszeit beeinflussen das Energieangebot.")
            ]
        },
        {
            title: "4. Wirkungsgrad und Abwärme",
            content: `
                <p>Kein reales Kraftwerk wandelt die gesamte zugeführte Energie in gewünschte elektrische Energie um. Ein Teil wird als Wärme an die Umgebung übertragen. Der <strong>Wirkungsgrad</strong> ist der Anteil der Nutzenergie an der zugeführten Energie.</p>
                <p>Ein Wirkungsgrad von 40 % bedeutet: Von 1000 kWh zugeführter Energie werden 400 kWh als gewünschte elektrische Energie abgegeben. Die übrigen 600 kWh sind nicht verschwunden. Sie werden vor allem als Wärme an Kühlwasser oder Luft abgegeben. Kraft-Wärme-Kopplung nutzt einen Teil dieser Wärme zum Heizen.</p>
                <div class="interactive-zone physics-lab">
                    <h3>Wirkungsgrad-Rechner</h3>
                    <label for="efficiency-range">Wirkungsgrad: <strong id="efficiency-value">40 %</strong></label>
                    <input id="efficiency-range" type="range" min="10" max="95" value="40" step="5" aria-describedby="efficiency-result" oninput="updateEfficiency(this.value)">
                    <p id="efficiency-result" class="physics-live-result" role="status" aria-live="polite" aria-atomic="true">Aus 1000 kWh werden 400 kWh Nutzenergie. 600 kWh werden anders, meist als Wärme, abgegeben.</p>
                </div>
                {{QUIZ_pow_4a}}{{QUIZ_pow_4b}}{{QUIZ_pow_4c}}{{QUIZ_pow_4d}}`,
            quizzes: [
                mc("pow_4a", "Wie berechnet man den Wirkungsgrad?", "Nutzenergie geteilt durch zugeführte Energie", "Nutzenergie plus zugeführte Energie", "Zeit geteilt durch Masse", "Der Quotient wird meist als Prozentzahl angegeben."),
                mc("pow_4b", "Was bedeutet ein Wirkungsgrad von 30 %?", "30 % der zugeführten Energie kommen als gewünschte Nutzenergie an.", "70 % der Energie verschwinden.", "Die Anlage arbeitet nur 30 Minuten.", "Die übrige Energie wird in andere, meist weniger erwünschte Formen umgewandelt."),
                mc("pow_4c", "Was ist Abwärme?", "Wärme, die bei der Umwandlung entsteht und oft an die Umgebung abgegeben wird", "Eine neue Energiequelle aus dem Nichts", "Das Geräusch des Generators", "Abwärme enthält weiterhin Energie und kann teilweise genutzt werden."),
                mc("pow_4d", "Was verbessert Kraft-Wärme-Kopplung?", "Ein Teil der entstehenden Wärme wird zusätzlich genutzt.", "Der Generator erzeugt Energie ohne Quelle.", "Alle Leitungen werden entfernt.", "Durch die Wärmenutzung steigt der gesamte Nutzungsgrad der eingesetzten Energie.")
            ]
        },
        {
            title: "5. Stromnetz, Speicher und Versorgungssicherheit",
            content: `
                <p>Im Stromnetz müssen Erzeugung und Verbrauch immer fast genau zusammenpassen. Zu viel oder zu wenig Leistung verändert die Netzfrequenz. Netzbetreiber gleichen deshalb laufend aus.</p>
                <p>Ein größeres verbundenes Netz kann Strom zwischen Regionen austauschen. Regelbare Kraftwerke können ihre Leistung verändern. Speicher nehmen Energie auf und geben sie später wieder ab: Pumpspeicher pumpen Wasser nach oben, Akkus speichern chemisch. Auch Verbraucher können manche Tätigkeiten verschieben, etwa das Laden eines Fahrzeugs.</p>
                <p>Speicher sind nützlich, aber nicht verlustfrei und nicht für jede Zeitspanne gleich geeignet. Für Stunden, Tage und Jahreszeiten werden unterschiedliche Lösungen benötigt.</p>
                <div class="mini-task"><strong>Planungsauftrag:</strong> An einem kalten, windarmen Abend liefern Wind und Sonne wenig. Erstelle einen Plan mit vier Beiträgen: vorhandener Speicher, Strom aus anderen Regionen, regelbare Erzeugung und ein verschiebbarer Verbrauch. Begründe jeden Beitrag.</div>
                {{QUIZ_pow_5a}}{{QUIZ_pow_5b}}{{QUIZ_pow_5c}}{{QUIZ_pow_5d}}`,
            quizzes: [
                mc("pow_5a", "Was muss im Stromnetz laufend zusammenpassen?", "Erzeugte und verbrauchte Leistung", "Nur die Zahl der Steckdosen", "Temperatur und Lautstärke", "Das Gleichgewicht hält die Netzfrequenz stabil."),
                mc("pow_5b", "Was macht ein Pumpspeicher?", "Er speichert Energie als Lageenergie von Wasser.", "Er erzeugt Wasser aus Strom.", "Er verbrennt Wind.", "Beim Hochpumpen wird Energie gespeichert, beim Herabströmen zurückgewonnen."),
                mc("pow_5c", "Warum hilft ein großes verbundenes Stromnetz?", "Regionen können Erzeugungsunterschiede ausgleichen.", "Dann sind keine Leitungen nötig.", "Jede Anlage liefert immer gleich viel.", "Überschüsse und Engpässe treten nicht überall gleichzeitig auf."),
                mc("pow_5d", "Welche Aussage über Speicher stimmt?", "Beim Laden und Entladen treten Verluste auf.", "Speicher erzeugen zusätzliche Energie.", "Ein einziger Speichertyp passt für jede Dauer.", "Speicher verschieben Energie in der Zeit, erhalten aber nie die gesamte zugeführte Nutzenergie.")
            ]
        },
        {
            title: "6. Kraftwerke fair vergleichen",
            content: `
                <p>Eine Energieversorgung soll zuverlässig, bezahlbar und möglichst umweltverträglich sein. Dafür reicht ein einziges Kriterium nicht. Ein fairer Vergleich betrachtet Treibhausgase über den ganzen Lebensweg, Eingriffe in Natur und Landschaft, Rohstoffbedarf, Abfälle, Unfallrisiken, Kosten, Bauzeit und Verfügbarkeit.</p>
                <p>Jede Technik hat Stärken und Grenzen. Wind und Photovoltaik verursachen im Betrieb kaum Treibhausgase, ihre Leistung schwankt aber. Wasserkraft ist gut regelbar, greift jedoch in Gewässer ein. Kernenergie liefert stetig Strom mit niedrigen Treibhausgasemissionen im Betrieb, stellt aber hohe Anforderungen an Sicherheit und langfristige Abfalllagerung. Fossile Kraftwerke sind gut regelbar, setzen jedoch große Mengen Treibhausgase frei.</p>
                <div class="interactive-zone physics-lab">
                    <h3>Technikvergleich</h3>
                    <div class="physics-choice-row">
                        <button type="button" onclick="comparePower('wind')">Wind</button>
                        <button type="button" onclick="comparePower('nuclear')">Kernenergie</button>
                        <button type="button" onclick="comparePower('gas')">Erdgas</button>
                    </div>
                    <p id="power-compare-result" class="physics-live-result" role="status" aria-live="polite" aria-atomic="true">Wähle eine Technik. Du erhältst eine Stärke und eine Grenze.</p>
                </div>
                <div class="remember-box"><strong>Urteilsregel:</strong> Nenne zuerst deine Kriterien, vergleiche mit denselben Kriterien und begründe dann deine Entscheidung. Eine Behauptung ohne Beleg ist noch kein physikalisches Urteil.</div>
                {{QUIZ_pow_6a}}{{QUIZ_pow_6b}}{{QUIZ_pow_6c}}{{QUIZ_pow_6d}}`,
            quizzes: [
                mc("pow_6a", "Was macht einen Kraftwerksvergleich fair?", "Alle Technologien werden mit denselben mehreren Kriterien geprüft.", "Man betrachtet nur die Lieblingsfarbe.", "Man nennt nur einen Vorteil der bevorzugten Technik.", "Mehrere gemeinsame Kriterien machen Stärken und Grenzen sichtbar."),
                mc("pow_6b", "Welche Aussage zu erneuerbarer Energie stimmt?", "Auch erneuerbare Anlagen können Umweltwirkungen haben.", "Erneuerbar bedeutet ohne Material und Fläche.", "Erneuerbar bedeutet, dass nie gespeichert werden muss.", "Die Quelle erneuert sich, trotzdem müssen Bau, Betrieb und Naturfolgen betrachtet werden."),
                mc("pow_6c", "Welche Stärke haben fossile Kraftwerke, welche große Grenze?", "Sie sind gut regelbar, setzen aber viele Treibhausgase frei.", "Sie brauchen keinen Brennstoff und keinen Schornstein.", "Sie liefern nur bei Sonnenschein.", "Regelbarkeit und Klimawirkung müssen gemeinsam bewertet werden."),
                mc("pow_6d", "Was gehört zu einer begründeten Empfehlung?", "Kriterien, Belege und eine abgewogene Schlussfolgerung", "Nur ein kurzer Zuruf", "Nur die höchste Leistung", "Eine Empfehlung zeigt, wie die genannten Belege zur Entscheidung führen.")
            ]
        }
    ];

    const newTopics = {
        strahlung_radioaktivitaet: {
            title: "Strahlung und Radioaktivität",
            subtitle: "Vom Atomkern über die Halbwertszeit bis zu Medizin und Strahlenschutz",
            chapterCompassText: "Du unterscheidest Strahlungsarten, erklärst den zufälligen Zerfall mit der Halbwertszeit, deutest Messgrößen und triffst begründete Entscheidungen zu Nutzen und Schutz.",
            sections: radiationSections,
            script: false,
            diplom: {
                title: "Kapitelcheck: Strahlung und Radioaktivität",
                questions: [radiationSections[0].quizzes[0], radiationSections[1].quizzes[1], radiationSections[2].quizzes[2], radiationSections[3].quizzes[1], radiationSections[4].quizzes[0], radiationSections[4].quizzes[1], radiationSections[5].quizzes[0], radiationSections[6].quizzes[3]]
            }
        },
        kraftwerke_energieversorgung: {
            title: "Kraftwerke und Energieversorgung",
            subtitle: "Energieketten verstehen, Netze ausgleichen und Technologien fair vergleichen",
            chapterCompassText: "Du verfolgst Energie vom natürlichen Vorrat bis zum Gerät, vergleichst Kraftwerke, berechnest Wirkungsgrade und planst eine zuverlässige Energieversorgung.",
            sections: powerSections,
            script: false,
            diplom: {
                title: "Kapitelcheck: Kraftwerke und Energieversorgung",
                questions: [powerSections[0].quizzes[0], powerSections[0].quizzes[2], powerSections[1].quizzes[1], powerSections[2].quizzes[0], powerSections[3].quizzes[0], powerSections[4].quizzes[0], powerSections[4].quizzes[1], powerSections[5].quizzes[0]]
            }
        }
    };

    const titleCorrections = {
        elektromagnetismus: [
            "1. Strom erzeugt ein Magnetfeld",
            "2. Die Spule als Elektromagnet",
            "3. Das Relais: ein magnetischer Schalter",
            "4. Lorentzkraft und Elektromotor",
            "5. Induktion und Generator",
            "6. Der Transformator verändert Wechselspannung"
        ],
        linsen_spiegel: [
            "1. Spiegelbilder untersuchen",
            "2. Brechung: Licht ändert seine Richtung",
            "3. Sammellinsen und Brennpunkt",
            "4. Bildentstehung an Sammellinsen",
            "5. Zerstreuungslinsen",
            "6. Das Auge als optisches System",
            "7. Hohlspiegel und Wölbspiegel",
            "8. Optische Geräte",
            "9. Sehen, Messen und Erklären"
        ]
    };

    const replacements = {
        elektromagnetismus: [
            ["Induktion ist das Gegenteil vom Elektromagneten", "Bei der Induktion erzeugt ein veränderliches Magnetfeld eine elektrische Spannung"],
            ["Induktion ist das GEGENTEIL vom Elektromagneten", "Bei der Induktion erzeugt ein veränderliches Magnetfeld eine elektrische Spannung"]
        ],
        energie: [
            ["Diese Energie geht niemals aus und macht keinen Schmutz!", "Diese Energiequelle erneuert sich. Trotzdem müssen Flächenbedarf, Rohstoffe und andere Umweltwirkungen beachtet werden."],
            ["Dabei entsteht schlechte Luft (CO2)", "Dabei entsteht Kohlendioxid (CO2), das den menschengemachten Treibhauseffekt verstärkt"]
        ]
    };

    function cloneTopic(topic) {
        if (typeof structuredClone === "function") return structuredClone(topic);
        return JSON.parse(JSON.stringify(topic));
    }

    function enhanceTopic(topicId, topic) {
        const base = topic || newTopics[topicId];
        if (!base) return null;
        const copy = cloneTopic(base);

        if (titleCorrections[topicId]) {
            copy.sections = (copy.sections || []).map((section, index) => ({
                ...section,
                title: titleCorrections[topicId][index] || section.title
            }));
        }

        (replacements[topicId] || []).forEach(([before, after]) => {
            (copy.sections || []).forEach(section => {
                if (typeof section.content === "string") section.content = section.content.split(before).join(after);
            });
        });

        return copy;
    }

    function escapeText(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function supportHtml(topicId) {
        const item = support[topicId];
        if (!item) return "";
        const terms = item.terms.map(([term, definition]) => `
            <details class="physics-term">
                <summary>${escapeText(term)}</summary>
                <p>${escapeText(definition)}</p>
            </details>`).join("");

        return `
            <section class="physics-support-card" aria-labelledby="physics-support-${escapeText(topicId)}">
                <div class="physics-support-intro">
                    <div>
                        <p class="physics-support-kicker">Physik, ${item.grade}. Klasse</p>
                        <h2 id="physics-support-${escapeText(topicId)}">So lernst du in diesem Kapitel</h2>
                        <p>${escapeText(item.prerequisite)}</p>
                    </div>
                    <ol class="physics-method-steps">
                        <li><strong>Vermuten:</strong> Sage zuerst voraus, was passieren könnte.</li>
                        <li><strong>Prüfen:</strong> Beobachte, miss oder nutze das Modell.</li>
                        <li><strong>Erklären:</strong> Begründe das Ergebnis mit einem Fachausdruck.</li>
                    </ol>
                </div>
                <div class="physics-vocabulary">
                    <h3>Fachausdrücke</h3>
                    <p>Öffne einen Begriff, wenn du ihn brauchst.</p>
                    <div class="physics-term-grid">${terms}</div>
                </div>
            </section>`;
    }

    function guideHtml(topicId, sectionIndex) {
        const guide = sectionGuides[`${topicId}:${sectionIndex}`];
        if (!guide) return "";
        const [question, core, misconception, task] = guide;
        return `
            <div class="physics-remodel physics-section-guide">
                <p class="physics-leitfrage"><strong>Leitfrage:</strong> ${escapeText(question)}</p>
                <div class="remember-box"><strong>Kernidee:</strong> ${escapeText(core)}</div>
                <div class="misconception-box"><strong>Achtung, Denkfalle:</strong> ${escapeText(misconception)}</div>
                <div class="mini-task"><strong>Arbeitsauftrag:</strong> ${escapeText(task)}</div>
            </div>`;
    }

    function setResult(id, message, state) {
        const result = document.getElementById(id);
        if (!result) return;
        result.textContent = message;
        result.dataset.state = state || "info";
    }

    window.checkIonizing = function (button) {
        const ionizing = button.dataset.ionizing === "true";
        button.setAttribute("aria-pressed", "true");
        setResult(
            "ionizing-feedback",
            ionizing
                ? `${button.textContent}: ionisierend. Die Energie kann Elektronen aus Atomen lösen.`
                : `${button.textContent}: nicht ionisierend. Die Energie eines einzelnen Lichtquants reicht dafür nicht aus.`,
            "correct"
        );
    };

    window.checkShield = function (button) {
        const answer = button.dataset.shield;
        const messages = {
            correct: "Papier reicht für Alphastrahlung aus und ist hier die einfachste passende Antwort.",
            possible: "Dicker Beton würde ebenfalls stoppen, ist für Alphastrahlung aber viel mehr als nötig.",
            wrong: "Ohne Abschirmung kann die Alphastrahlung die äußere Haut meist nicht durchdringen. Sicher gearbeitet wird trotzdem mit Abstand und einer Barriere."
        };
        setResult("shield-feedback", messages[answer], answer === "wrong" ? "retry" : "correct");
    };

    window.updateHalfLife = function (value) {
        const count = Math.max(0, Math.min(6, Number(value) || 0));
        const fraction = Math.pow(0.5, count);
        const nuclei = Math.round(1000 * fraction);
        const percent = Number((100 * fraction).toFixed(3)).toLocaleString("de-AT");
        const countLabel = document.getElementById("half-life-count");
        const bar = document.getElementById("decay-bar");
        const range = document.getElementById("half-life-range");
        if (countLabel) countLabel.textContent = String(count);
        if (bar) bar.style.width = `${100 * fraction}%`;
        if (range) range.setAttribute("aria-valuetext", `${count} Halbwertszeiten, ${percent} Prozent übrig`);
        setResult("half-life-result", `Von 1000 Kernen sind im Mittel noch etwa ${nuclei} nicht zerfallen: ${percent} %.`, "info");
    };

    window.checkProtection = function (button) {
        const correct = button.dataset.protection === "distance";
        setResult(
            "protection-feedback",
            correct
                ? "Richtig: Ein größerer Abstand senkt die Dosis sofort. Zusätzlich helfen kurze Aufenthaltszeit und passende Abschirmung."
                : "Diese Handlung erhöht die Dosis. Bleibe möglichst kurz, halte Abstand und nutze eine passende Abschirmung.",
            correct ? "correct" : "retry"
        );
    };

    window.showPowerChain = function (kind) {
        const chains = {
            wind: "Wind: Bewegungsenergie der Luft → Drehbewegung des Rotors → Generator → elektrische Energie.",
            gas: "Erdgas: chemische Energie → Wärme → Strömung → Turbine → Generator → elektrische Energie.",
            solar: "Photovoltaik: Strahlungsenergie des Lichts → direkt elektrische Energie. Es gibt keine Turbine."
        };
        setResult("power-chain-result", chains[kind] || "Wähle eine Anlage.", "info");
    };

    window.updateEfficiency = function (value) {
        const efficiency = Math.max(0, Math.min(100, Number(value) || 0));
        const useful = 10 * efficiency;
        const other = 1000 - useful;
        const label = document.getElementById("efficiency-value");
        const range = document.getElementById("efficiency-range");
        if (label) label.textContent = `${efficiency} %`;
        if (range) range.setAttribute("aria-valuetext", `${efficiency} Prozent Wirkungsgrad`);
        setResult("efficiency-result", `Aus 1000 kWh werden ${useful} kWh Nutzenergie. ${other} kWh werden anders, meist als Wärme, abgegeben.`, "info");
    };

    window.comparePower = function (kind) {
        const comparisons = {
            wind: "Windkraft: Stärke: im Betrieb kaum Treibhausgase. Grenze: Die Leistung schwankt und Standorte beeinflussen Landschaft und Tiere.",
            nuclear: "Kernenergie: Stärke: stetige große Leistung mit niedrigen Treibhausgasemissionen im Betrieb. Grenze: hohe Sicherheitsanforderungen und langlebiger radioaktiver Abfall.",
            gas: "Erdgas: Stärke: Leistung lässt sich schnell regeln. Grenze: Bei der Verbrennung entsteht viel Kohlendioxid; auch Methanverluste belasten das Klima."
        };
        setResult("power-compare-result", comparisons[kind] || "Wähle eine Technik.", "info");
    };

    window.PHYSICS_COURSE = {
        isPhysicsTopic(topicId) {
            return Object.prototype.hasOwnProperty.call(support, topicId);
        },
        getTopic(topicId) {
            return enhanceTopic(topicId, newTopics[topicId] || null);
        },
        enhanceTopic,
        supportHtml,
        guideHtml
    };
}());
