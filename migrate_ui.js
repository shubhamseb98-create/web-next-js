const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const destDir = path.join(__dirname, 'src');

// 1. Merge CSS
const globalCss = fs.readFileSync(path.join(srcDir, 'styles', 'globals.css'), 'utf8');
const indexCss = fs.readFileSync(path.join(srcDir, 'index.css'), 'utf8');
const appCss = fs.readFileSync(path.join(srcDir, 'App.css'), 'utf8');

// The original next-dash globals.css has some utility classes we might want, but the user specifically said "don't use any jindal related theme or design or layout".
// So we completely overwrite next-dash globals.css with the original React ones, PLUS we keep the Next.js tailwind base if needed (but they didn't use tailwind).
const mergedCss = globalCss + '\n' + indexCss + '\n' + appCss;
fs.writeFileSync(path.join(destDir, 'app', 'globals.css'), mergedCss, 'utf8');
console.log('Merged CSS');

// 2. Copy and transform Header
const headerSrc = path.join(srcDir, 'components', 'Header');
const headerDest = path.join(destDir, 'components', 'layout', 'WebTycoonsHeader');
if (!fs.existsSync(headerDest)) fs.mkdirSync(headerDest, { recursive: true });

fs.readdirSync(headerSrc).forEach(file => {
    let content = fs.readFileSync(path.join(headerSrc, file), 'utf8');
    
    // Transform React Router to Next.js
    content = content.replace(/import\s+\{\s*Link(.*?)\}\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link';\nimport {  } from 'react-router-dom'");
    content = content.replace(/import\s+\{\s*(.*?)\s*Link(.*?)\}\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link';\nimport {   } from 'react-router-dom'");
    content = content.replace(/import\s+Link\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link'");
    
    content = content.replace(/useLocation/g, "usePathname");
    content = content.replace(/react-router-dom/g, "next/navigation");
    content = content.replace(/to=/g, "href=");
    
    // Add "use client" if there are hooks
    if (content.includes('useState') || content.includes('useEffect') || content.includes('usePathname')) {
        content = '"use client";\n' + content;
    }
    
    fs.writeFileSync(path.join(headerDest, file), content, 'utf8');
});
console.log('Copied Header');

// 3. Copy and transform Footer
const footerSrc = path.join(srcDir, 'components', 'Footer');
const footerDest = path.join(destDir, 'components', 'layout', 'WebTycoonsFooter');
if (!fs.existsSync(footerDest)) fs.mkdirSync(footerDest, { recursive: true });

if (fs.existsSync(footerSrc)) {
    fs.readdirSync(footerSrc).forEach(file => {
        let content = fs.readFileSync(path.join(footerSrc, file), 'utf8');
        content = content.replace(/import\s+\{\s*Link(.*?)\}\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link';\nimport {  } from 'react-router-dom'");
        content = content.replace(/import\s+\{\s*(.*?)\s*Link(.*?)\}\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link';\nimport {   } from 'react-router-dom'");
        content = content.replace(/import\s+Link\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link'");
        content = content.replace(/useLocation/g, "usePathname");
        content = content.replace(/react-router-dom/g, "next/navigation");
        content = content.replace(/to=/g, "href=");
        
        if (content.includes('useState') || content.includes('useEffect') || content.includes('usePathname')) {
            content = '"use client";\n' + content;
        }
        
        fs.writeFileSync(path.join(footerDest, file), content, 'utf8');
    });
    console.log('Copied Footer');
} else {
    console.log('Footer dir not found in src');
}