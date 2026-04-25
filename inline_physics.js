const fs = require('fs');

const dePath = 'lang/de.json';
let deStr = fs.readFileSync(dePath, 'utf8');

// 1. SI Einheiten
deStr = deStr.replace(
    '1. Länge (Meter) | 2. Masse (Kilogramm) | 3. Zeit (Sekunde) <br>\n            4. Stromstärke (Ampere) | 5. Temperatur (Kelvin) <br>\n            6. Stoffmenge (Mol) | 7. Lichtstärke (Candela)',
    '1. Länge (Meter, z.B. Maßband) | 2. Masse (Kilogramm, z.B. Waage) | 3. Zeit (Sekunde, z.B. Stoppuhr) <br>\\n            4. Stromstärke (Ampere, z.B. Amperemeter) | 5. Temperatur (Kelvin, z.B. Thermometer) <br>\\n            6. Stoffmenge (Mol) | 7. Lichtstärke (Candela, z.B. Luxmeter)'
);

// 2. Elektrizität
deStr = deStr.replace(
    '<li><strong>Spannung (U) in Volt:</strong> Der Druck, der die Elektronen schiebt.</li>\\n            <li><strong>Stromstärke (I) in Ampere:</strong> Wie viele Elektronen pro Sekunde durchfließen.</li>\\n            <li><strong>Widerstand (R) in Ohm:</strong> Wie stark der Draht die Elektronen ausbremst.</li>',
    '<li><strong>Spannung (U) in Volt (Messgerät: Voltmeter):</strong> Der Druck, der die Elektronen schiebt.</li>\\n            <li><strong>Stromstärke (I) in Ampere (Messgerät: Amperemeter):</strong> Wie viele Elektronen pro Sekunde durchfließen.</li>\\n            <li><strong>Widerstand (R) in Ohm (Messgerät: Ohmmeter):</strong> Wie stark der Draht die Elektronen ausbremst.</li>'
);

// 3. Kraft und Bewegung
deStr = deStr.replace(
    '<p>Newton hat noch ein zweites wichtiges Gesetz gefunden. Es erklärt, wie Kraft, Masse und Beschleunigung zusammenhängen: <strong>Kraft = Masse mal Beschleunigung</strong> (F = m · a). Das bedeutet: Wenn du etwas sehr Schweres (viel Masse) schnell beschleunigen willst, brauchst du eine riesige Kraft!</p>',
    '<p>Newton hat noch ein zweites wichtiges Gesetz gefunden. Es erklärt, wie Kraft, Masse und Beschleunigung zusammenhängen: <strong>Kraft (Messgerät: Kraftmesser) = Masse (Waage) mal Beschleunigung</strong> (F = m · a). Das bedeutet: Wenn du etwas sehr Schweres (viel Masse) schnell beschleunigen willst, brauchst du eine riesige Kraft!</p>'
);

// 4. Akustik
deStr = deStr.replace(
    '- <strong>Frequenz (Tonhöhe):</strong> Wie oft schwingt die Welle pro Sekunde? Wenn sie ganz schnell schwingt (viele enge Wellen), ist der Ton <strong>hoch</strong> wie das Piepsen einer Maus. Schwingt sie langsam, ist der Ton <strong>tief</strong> wie das Brummen eines Bären. Gemessen wird das in <strong>Hertz (Hz)</strong>.<br>\\n            - <strong>Amplitude (Lautstärke):</strong> Wie stark schwingt die Welle aus? Sind die Wellenberge riesig hoch, ist der Ton <strong>laut</strong>. Sind sie winzig flach, ist der Ton <strong>leise</strong> flüsternd.',
    '- <strong>Frequenz (Tonhöhe):</strong> Wie oft schwingt die Welle pro Sekunde? Wenn sie ganz schnell schwingt (viele enge Wellen), ist der Ton <strong>hoch</strong> wie das Piepsen einer Maus. Schwingt sie langsam, ist der Ton <strong>tief</strong> wie das Brummen eines Bären. Gemessen wird das in <strong>Hertz (Hz)</strong> (mit einem Frequenzmesser).<br>\\n            - <strong>Amplitude (Lautstärke):</strong> Wie stark schwingt die Welle aus? Sind die Wellenberge riesig hoch, ist der Ton <strong>laut</strong>. Sind sie winzig flach, ist der Ton <strong>leise</strong> flüsternd. Gemessen wird das in <strong>Dezibel (dB)</strong> (mit einem Schallpegelmesser).'
);

// 5. Wärmelehre
deStr = deStr.replace(
    '<p>Egal ob Wasser, Holz oder Luft – alles um uns herum besteht aus winzig kleinen Bausteinen, den <strong>Teilchen</strong>. Und diese Teilchen sitzen niemals still! Sie wackeln und zittern die ganze Zeit. <strong>Wärme ist eigentlich nichts anderes als Bewegung!</strong> Je heißer etwas ist, desto wilder und schneller rasen die Teilchen umher. Wenn es kalt wird, bewegen sie sich ganz langsam.</p>',
    '<p>Egal ob Wasser, Holz oder Luft – alles um uns herum besteht aus winzig kleinen Bausteinen, den <strong>Teilchen</strong>. Und diese Teilchen sitzen niemals still! Sie wackeln und zittern die ganze Zeit. <strong>Wärme ist eigentlich nichts anderes als Bewegung!</strong> Je heißer etwas ist, desto wilder und schneller rasen die Teilchen umher (gemessen wird das mit einem <strong>Thermometer</strong> in °C). Wenn es kalt wird, bewegen sie sich ganz langsam.</p>'
);

fs.writeFileSync(dePath, deStr, 'utf8');
console.log('Inline replacements done.');