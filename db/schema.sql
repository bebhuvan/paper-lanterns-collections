-- Letters table
CREATE TABLE IF NOT EXISTS letters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  collection TEXT NOT NULL,
  collection_title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  recipient TEXT,
  date TEXT,
  period TEXT,
  translator TEXT,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for collection queries
CREATE INDEX IF NOT EXISTS idx_letters_collection ON letters(collection);

-- Index for number within collection
CREATE INDEX IF NOT EXISTS idx_letters_collection_number ON letters(collection, number);

-- Full-text search table using FTS5
CREATE VIRTUAL TABLE IF NOT EXISTS letters_fts USING fts5(
  title,
  content,
  collection,
  collection_title,
  author,
  recipient,
  content=letters,
  content_rowid=id,
  tokenize='porter unicode61'
);

-- Triggers to keep FTS in sync with letters table

-- After insert
CREATE TRIGGER IF NOT EXISTS letters_ai AFTER INSERT ON letters BEGIN
  INSERT INTO letters_fts(rowid, title, content, collection, collection_title, author, recipient)
  VALUES (
    new.id,
    new.title,
    new.content,
    new.collection,
    new.collection_title,
    new.author,
    COALESCE(new.recipient, '')
  );
END;

-- After delete
CREATE TRIGGER IF NOT EXISTS letters_ad AFTER DELETE ON letters BEGIN
  DELETE FROM letters_fts WHERE rowid = old.id;
END;

-- After update
CREATE TRIGGER IF NOT EXISTS letters_au AFTER UPDATE ON letters BEGIN
  UPDATE letters_fts SET
    title = new.title,
    content = new.content,
    collection = new.collection,
    collection_title = new.collection_title,
    author = new.author,
    recipient = COALESCE(new.recipient, '')
  WHERE rowid = new.id;
END;

-- Update timestamp trigger
CREATE TRIGGER IF NOT EXISTS letters_update_timestamp AFTER UPDATE ON letters BEGIN
  UPDATE letters SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;
