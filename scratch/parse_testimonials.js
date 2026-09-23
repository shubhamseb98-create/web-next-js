const fs = require('fs');

const html = fs.readFileSync('live_webtycoons.html', 'utf8');

const startTag = '<section class="testimonials-clean"';
const endTag = '</section>';

const startIdx = html.indexOf(startTag);
if (startIdx === -1) {
  console.log('Not found');
  process.exit(1);
}

const endIdx = html.indexOf(endTag, startIdx);
const sectionHtml = html.slice(startIdx, endIdx + endTag.length);

console.log('Section HTML length:', sectionHtml.length);
fs.writeFileSync('scratch/testimonials_section.html', sectionHtml);

// Parse all items in the section
// Looking for <div class="item">
const items = sectionHtml.split('<div class="item">');
console.log('Found', items.length - 1, 'items');

const results = [];

for (let i = 1; i < items.length; i++) {
  const itemHtml = items[i];
  
  // Extract description
  let desc = '';
  const descMatch = itemHtml.match(/<p class="description">([\s\S]*?)<\/p>\s*<\/div>/i);
  if (descMatch) {
    desc = descMatch[1]
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Extract author img
  let img = '';
  const imgMatch = itemHtml.match(/<img[^>]*src="([^"]+)"/i);
  if (imgMatch) {
    img = imgMatch[1];
  }

  // Extract name & designation
  let name = '';
  let designation = '';
  const nameMatch = itemHtml.match(/<h5 class="name">([\s\S]*?)<\/h5>/i);
  if (nameMatch) {
    const rawName = nameMatch[1].replace(/<[^>]+>/g, '').trim();
    if (rawName.includes(',')) {
      const parts = rawName.split(',');
      name = parts[0].trim();
      designation = parts.slice(1).join(',').trim();
    } else {
      name = rawName;
    }
  }

  // Extract company/title/website
  let company = '';
  const titleMatch = itemHtml.match(/<p class="title">([\s\S]*?)<\/p>/i);
  if (titleMatch) {
    company = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  results.push({
    index: i,
    name,
    designation,
    company,
    img,
    desc
  });
}

console.log(JSON.stringify(results, null, 2));
fs.writeFileSync('scratch/testimonials.json', JSON.stringify(results, null, 2));
