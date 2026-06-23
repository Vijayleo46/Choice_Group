const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\vijay\\.gemini\\antigravity-ide\\brain\\b67c3028-80da-40db-84d9-ca9c49a1e9b7\\.system_generated\\steps\\219\\content.md', 'utf8');

// Find all d="..."
const regex = /d="([^"]+)"/g;
let match;
const paths = [];

while ((match = regex.exec(content)) !== null) {
    paths.push(match[1]);
}

// Write to a JS file
const out = `export const WORLD_PATHS = ${JSON.stringify(paths)};\n`;
fs.writeFileSync('src/components/WorldPaths.js', out);
console.log('Extracted ' + paths.length + ' paths to src/components/WorldPaths.js');
