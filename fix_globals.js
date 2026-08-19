const fs = require('fs');
const file = 'd:/santosh/try react/webtycoons-react/next-dash/src/app/globals.css';
let content = fs.readFileSync(file, 'utf8');

// Find the start of the Vite CSS
const viteStart = content.indexOf(':root {\n  --text: #6b6375;');
if (viteStart !== -1) {
    content = content.substring(0, viteStart);
}

// Add Tailwind directives to the top
const tailwind = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n';
if (!content.includes('@tailwind')) {
    content = tailwind + content;
}

fs.writeFileSync(file, content);
console.log('Fixed globals.css');