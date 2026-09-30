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
assert.equal(htmlFiles.length, 19, 'Expected 19 generated HTML pages');
const pages = await Promise.all(htmlFiles.map(async (path) => [path, await readFile(path, 'utf8')]));
for (const [path, html] of pages) {
  assert.match(html, /<html lang="(?:en|fr)">/, `${path} must declare a supported language`);
  assert.match(html, /<link rel="canonical"/, `${path} must have a canonical URL`);
  assert.match(html, /application\/ld\+json/, `${path} must contain structured data`);
  assert.match(html, /https:\/\/mungeebalaw\.cm/, `${path} must use the preferred .cm origin`);
  assert.doesNotMatch(html, /mungeebalaw\.com/i, `${path} still contains the former .com origin`);
  assert.doesNotMatch(html, /Trinity Law Firm/i, `${path} still contains the former brand`);
  assert.doesNotMatch(html, /\+237 677 275 129/, `${path} still contains the former telephone number`);
  assert.doesNotMatch(html, /data-(?:portal-canvas|cinematic|intro(?:-[a-z-]+)?|skip|scene-count|motion-cursor|custom-cursor|cursor-(?:dot|ring))/i, `${path} still contains the rejected walkthrough or custom-cursor hooks`);
  assert.doesNotMatch(html, /class="[^"]*(?:cinematic__|motion-cursor|custom-cursor|cursor-(?:dot|ring))[^"]*"/i, `${path} still renders the rejected walkthrough or custom cursor`);
  assert.doesNotMatch(html, /(?:business-commercial|dispute-resolution|property-land|private-client)/i, `${path} still contains a retired service route`);
  assert.doesNotMatch(html, /(?:Business &amp; commercial|Dispute resolution|Property &amp; land|Private client|Contentieux et résolution des différends|Droit foncier et immobilier|Particuliers et famille)/i, `${path} still contains a retired service title`);
  assert.doesNotMatch(html, /(?:Client perspectives|Paroles de clients|data-testimonial)/i, `${path} must not publish unauthorised testimonials`);
  assert.doesNotMatch(html, /google\.com\/maps\/search/i, `${path} must not link the office to an unverified map result`);
}
const home = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const homeFr = await readFile(new URL('../dist/fr/index.html', import.meta.url), 'utf8');
assert.match(home, /mungeebalaw@gmail\.com/);
assert.match(home, /\+237 658 789 253/);
assert.match(home, /Munge Eba &amp; Co\. Law Firm/);
assert.match(home, /In practice since/);
assert.match(homeFr, /En exercice depuis/);
assert.doesNotMatch(home, /Established/);
assert.doesNotMatch(homeFr, /Cabinet fondé en/);
assert.match(homeFr, /Aller au contenu/);
assert.match(homeFr, /Navigation principale/);

const contact = await readFile(new URL('../dist/contact/index.html', import.meta.url), 'utf8');
const contactFr = await readFile(new URL('../dist/fr/contact/index.html', import.meta.url), 'utf8');
assert.match(contact, /data-contact-form/, 'English contact page must render the full intake form');
assert.match(contactFr, /data-contact-form/, 'French contact page must render the full intake form');
assert.doesNotMatch(contact, /Fees and duration depend on the matter/);
assert.doesNotMatch(contactFr, /Les honoraires et la durée dépendent du dossier/);

const notFound = await readFile(new URL('../dist/404.html', import.meta.url), 'utf8');
assert.doesNotMatch(notFound, /hreflang=/, 'The English-only 404 must not advertise a nonexistent French equivalent');
assert.doesNotMatch(notFound, /class="locale-link"/, 'The English-only 404 must not render a misleading language switch');

const sitemap = await readFile(new URL('../dist/sitemap-index.xml', import.meta.url), 'utf8');
assert.match(sitemap, /https:\/\/mungeebalaw\.cm/);
assert.doesNotMatch(sitemap, /mungeebalaw\.com/i);
console.log(`Public shell checks passed for ${htmlFiles.length} pages.`);
