const html = require('fs').readFileSync('cybernauts.html', 'utf8'); const matches = html.match(/href="([^"]+)"/g) || []; console.log(matches.filter(m => m.includes('lex')));
