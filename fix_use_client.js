const fs = require('fs');
const path = require('path');

const dir = 'd:/santosh/try react/webtycoons-react/next-dash/src/components/features/webtycoons/sections';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.jsx') || file.endsWith('.js')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.substring(1);
    }
    
    // Check if it uses framer-motion and doesn't have use client
    if (content.includes('framer-motion') && !content.includes("'use client'") && !content.includes('"use client"')) {
      content = "'use client';\n" + content;
    }
    
    fs.writeFileSync(filePath, content);
  }
});

console.log('Fixed use client in components');