const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir) {
    let filesToUpdate = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            filesToUpdate = filesToUpdate.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            filesToUpdate.push(fullPath);
        }
    }
    return filesToUpdate;
}

const allFiles = walkDir(srcDir);
let changedCount = 0;

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    content = content.replace(/jindalmetal\.com/g, "thewebtycoons.com");
    content = content.replace(/Jindal Metals & Alloys Ltd/g, "The WebTycoons");
    content = content.replace(/Jindal Metals/g, "The WebTycoons");
    content = content.replace(/Jindal Metal/g, "The WebTycoons");
    content = content.replace(/jindalmetal/g, "webtycoons");
    content = content.replace(/info@jindalmetals\.com/g, "info@thewebtycoons.com");
    content = content.replace(/jindal_backup/g, "webtycoons_backup");
    content = content.replace(/jindal\//g, "webtycoons/");
    content = content.replace(/\/jindal-logo\.jpg/g, "/logo.png");
    content = content.replace(/admin@jindal\.com/g, "admin@thewebtycoons.com");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log("Updated: " + file);
    }
}

console.log("Total files updated: " + changedCount);