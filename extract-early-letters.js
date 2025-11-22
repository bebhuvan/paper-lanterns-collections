import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the combined letters file
const inputFile = '/home/bhuvanesh.r/Tagore ingest old.md';
const outputDir = path.join(__dirname, 'src/content/letters');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the file
const content = fs.readFileSync(inputFile, 'utf-8');

// Split by letter markers - looking for **NUMBER. TITLE**
const letterPattern = /\*\*(\d+)\.\s+(.+?)\*\*/g;
const letters = [];
let match;

// Find all letter headers
const letterHeaders = [];
while ((match = letterPattern.exec(content)) !== null) {
  letterHeaders.push({
    number: parseInt(match[1]),
    title: match[2],
    index: match.index,
    fullMatch: match[0]
  });
}

console.log(`Found ${letterHeaders.length} letters`);

// Extract each letter's content
for (let i = 0; i < letterHeaders.length; i++) {
  const currentLetter = letterHeaders[i];
  const nextLetter = letterHeaders[i + 1];

  const startIndex = currentLetter.index + currentLetter.fullMatch.length;
  const endIndex = nextLetter ? nextLetter.index - 5 : content.length; // -5 to remove the *** separator

  let letterContent = content.substring(startIndex, endIndex).trim();

  // Extract location and date
  let location = '';
  let date = '';

  // Look for **Location:** pattern
  const locationMatch = letterContent.match(/\*\*Location:\*\*\s*(.+)/);
  if (locationMatch) {
    location = locationMatch[1].trim();
    letterContent = letterContent.replace(locationMatch[0], '').trim();
  }

  // Look for **Date:** pattern
  const dateMatch = letterContent.match(/\*\*Date:\*\*\s*(.+)/);
  if (dateMatch) {
    date = dateMatch[1].trim();
    letterContent = letterContent.replace(dateMatch[0], '').trim();
  }

  // Clean up the content
  letterContent = letterContent.replace(/^\s*\n+/, '').trim();

  letters.push({
    number: currentLetter.number,
    title: currentLetter.title,
    location,
    date,
    content: letterContent
  });
}

console.log(`Extracted ${letters.length} letters`);

// Create markdown files
letters.forEach((letter) => {
  const slug = letter.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);

  const filename = `tagore-${String(letter.number).padStart(3, '0')}-${slug}.md`;

  const frontmatter = `---
title: "${letter.title}"
author: "Rabindranath Tagore"
recipient: "Charles Freer Andrews"
date: "${letter.date}"
number: ${letter.number}
collection: "tagore-letters-from-abroad"
collectionTitle: "Letters from Abroad"
period: "1920-1921"
---

${letter.content}
`;

  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, frontmatter, 'utf-8');

  console.log(`Created: ${filename}`);
});

console.log(`\n✅ Successfully created ${letters.length} letter files in ${outputDir}`);
