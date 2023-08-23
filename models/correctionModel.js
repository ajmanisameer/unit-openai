const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/sqlite.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS corrections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original TEXT NOT NULL,
      corrected TEXT NOT NULL
    );`);
  }
});

module.exports = db;