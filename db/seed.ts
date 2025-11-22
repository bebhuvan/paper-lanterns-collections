import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Seed script to populate D1 database with letter content
 * Run this after building the site to populate the search database
 */

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<T[]>;
  exec(query: string): Promise<D1ExecResult>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Response>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Response {
  success: boolean;
  meta: unknown;
}

interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: unknown;
}

interface D1ExecResult {
  count: number;
  duration: number;
}

async function seedDatabase(db: D1Database) {
  console.log('Starting database seed...');

  // Read and execute schema
  const schemaPath = join(process.cwd(), 'db', 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf-8');

  console.log('Creating tables and indexes...');
  await db.exec(schema);

  // Get all letters from content collection
  console.log('Loading letters from content collection...');
  const letters = await getCollection('letters');

  console.log(`Found ${letters.length} letters to index`);

  // Prepare batch insert
  const statements: D1PreparedStatement[] = [];

  for (const letter of letters) {
    const { Content } = await letter.render();

    // Render content to plain text (remove HTML tags)
    // Note: In production, you'd want a better way to extract plain text
    const contentHtml = Content.toString();
    const plainText = contentHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    const stmt = db.prepare(`
      INSERT INTO letters (
        collection,
        collection_title,
        slug,
        number,
        title,
        author,
        recipient,
        date,
        period,
        translator,
        content
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      letter.data.collection,
      letter.data.collectionTitle,
      letter.slug,
      letter.data.number,
      letter.data.title,
      letter.data.author,
      letter.data.recipient || null,
      letter.data.date || null,
      letter.data.period || null,
      letter.data.translator || null,
      plainText
    );

    statements.push(stmt);
  }

  // Execute batch insert
  console.log('Inserting letters into database...');
  await db.batch(statements);

  console.log(`✅ Successfully seeded ${letters.length} letters`);

  // Verify FTS index
  const result = await db.prepare('SELECT COUNT(*) as count FROM letters_fts').all();
  console.log(`✅ FTS index contains ${result.results[0].count} entries`);
}

// This script is meant to be run with wrangler
// Example: wrangler d1 execute DB --local --file=./db/seed-data.sql
export { seedDatabase };
