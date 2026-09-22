import fs from 'fs';

async function checkOccurrences() {
  const res = await fetch('http://localhost:3000/services/website-designing');
  const text = await res.text();
  
  const matches = [...text.matchAll(/tech\s*stack/gi)];
  console.log('Occurrences of Tech Stack:', matches.length);
  matches.forEach(m => {
    const idx = m.index;
    console.log('Context:', text.slice(Math.max(0, idx - 80), Math.min(text.length, idx + 80)).replace(/\n/g, ' '));
  });
}

checkOccurrences();
