const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/sqlite.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the SQLite database.');
      db.run(`CREATE TABLE IF NOT EXISTS corrections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original TEXT NOT NULL,
        corrected TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );`, (err) => {
        if (err) {
          console.error("Table Creation Error:", err.message);
        } else {
          console.log("Table 'corrections' created successfully.");
        }
      });
    }
  });

db.close();