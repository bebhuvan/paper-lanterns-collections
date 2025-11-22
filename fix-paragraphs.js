import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lettersDir = path.join(__dirname, 'src/content/letters');

// Get all letter files
const files = fs.readdirSync(lettersDir).filter(f => f.startsWith('tagore-') && f.endsWith('.md'));

console.log(`Processing ${files.length} letter files...`);

files.forEach(filename => {
  const filepath = path.join(lettersDir, filename);
  const content = fs.readFileSync(filepath, 'utf-8');

  // Split into frontmatter and body
  const parts = content.split('---\n');
  if (parts.length < 3) {
    console.log(`Skipping ${filename} - invalid format`);
    return;
  }

  const frontmatter = parts[1];
  const body = parts.slice(2).join('---\n').trim();

  // Add blank line between each paragraph
  // Each line that's not empty becomes a paragraph with a blank line after
  const lines = body.split('\n');
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip if empty
    if (!line) continue;

    // Add the line
    processedLines.push(line);

    // Add blank line after (unless it's the last line)
    if (i < lines.length - 1 && lines[i + 1].trim()) {
      processedLines.push('');
    }
  }

  // Reconstruct the file
  const newContent = `---\n${frontmatter}---\n\n${processedLines.join('\n')}\n`;

  fs.writeFileSync(filepath, newContent, 'utf-8');
  console.log(`✓ Fixed ${filename}`);
});

console.log('\nDone! All letters have been formatted with proper paragraph spacing.');
