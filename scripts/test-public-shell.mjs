import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const htmlFiles = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}
await walk(dist);
assert.equal(htmlFiles.length, 21, 'Expected 21 generated HTML pages');
const pages = await Promise.all(htmlFiles.map(async (path) => [path, await readFile(path, 'utf8')]));
for (const [path, html] of pages) {
  assert.match(html, /<html lang="(?:en|fr)">/, `${path} must declare a supported language`);
  assert.match(html, /<link rel="canonical"/, `${path} must have a canonical URL`);
  assert.match(html, /application\/ld\+json/, `${path} must contain structured data`);
  assert.doesNotMatch(html, /Trinity Law Firm/i, `${path} still contains the former brand`);
}
const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
assert.match(home, /mungeebalaw@gmail\.com/);
assert.match(home, /\+237 677 275 129/);
assert.match(home, /data-portal-canvas/);
await readFile(new URL('../dist/sitemap-index.xml', import.meta.url), 'utf8');
console.log(`Public shell checks passed for ${htmlFiles.length} pages.`);
