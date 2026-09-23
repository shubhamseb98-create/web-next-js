const fs = require('fs');

// If live_webtycoons.html was deleted, re-fetch it
async function getHtml() {
  if (fs.existsSync('live_webtycoons.html')) {
    return fs.readFileSync('live_webtycoons.html', 'utf8');
  }
  const res = await fetch('https://www.thewebtycoons.com/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
  });
  const text = await res.text();
  fs.writeFileSync('live_webtycoons.html', text);
  return text;
}

async function run() {
  const html = await getHtml();
  
  // Search for counter, fun-fact, achievement, numbers, stats
  const keywords = ['counter', 'funfact', 'fun-fact', 'stat', 'number', 'project', 'client', 'experience', 'year'];
  
  console.log('Searching for counter sections...');
  
  // Look for elements with class containing 'counter' or 'number'
  const classMatches = html.match(/class=[\"'][^\"']*(?:counter|fact|stat|number|count)[^\"']*[\"']/gi);
  console.log('Class matches:', [...new Set(classMatches || [])]);
  
  // Search for numbers like 1000+, 500+, 15+, 10+, 100%
  const numberMatches = html.match(/>\s*([0-9]+(?:\+)?)\s*</g);
  console.log('Number matches:', [...new Set(numberMatches || [])].slice(0, 30));
  
  // Find where counter classes appear and extract snippet
  let pos = 0;
  while ((pos = html.indexOf('counter', pos)) !== -1) {
    console.log('--- FOUND "counter" AT', pos, '---');
    console.log(html.slice(Math.max(0, pos - 100), Math.min(html.length, pos + 300)).replace(/\s+/g, ' '));
    pos += 7;
  }
}

run();
