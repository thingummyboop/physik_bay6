const fs = require('fs');
let html = fs.readFileSync('topics/worksheet.html', 'utf8');

// Replace \` with `
html = html.replace(/\\\`/g, '`');
// Replace \${ with ${
html = html.replace(/\\\$\{/g, '${');

fs.writeFileSync('topics/worksheet.html', html, 'utf8');
console.log('Fixed worksheet.html escapes');