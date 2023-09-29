// Connect.js file

// Require SQLite3 verbose module
const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database, and if it doesn't exist, create it
const db = new sqlite3.Database(
  "./products.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    // Error handling for connection
    if (err) {
      return console.error(err.message);
    } else {
      // Success message for successful connection
      console.log("Connected to the SQLite database.");
    }
  }
);

// Serialize runs to ensure sequential execution
db.serialize(() => {
  // Run SQL command to create the "products" table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT,
            price REAL,
            description TEXT
        )`,
    (err) => {
      // Error handling for table creation
      if (err) {
        return console.error(err.message);
      }
      console.log("Created products table");

      // Sample values for insertion
      const product1 = ["Product 1", 19.99, "Description for Product 1"];
      const product2 = ["Product 2", 29.99, "Description for Product 2"];
      const product3 = ["Product 3", 39.99, "Description for Product 3"];

      // SQL command for insertion
      const insertSql = `INSERT INTO products (name, price, description) VALUES (?, ?, ?)`;

      // Execute insert commands for each product
      db.run(insertSql, product1, (err) => {
        if (err) {
          return console.error(err.message);
        }
        const id = this.lastID;
        console.log(`Added product with id ${id}`);
      });

      db.run(insertSql, product2, (err) => {
        if (err) {
          return console.error(err.message);
        }
        const id = this.lastID;
        console.log(`Added product with id ${id}`);
      });

      db.run(insertSql, product3, (err) => {
        if (err) {
          return console.error(err.message);
        }
        const id = this.lastID;
        console.log(`Added product with id ${id}`);
      });

      // Close the database connection
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Closed the database connection.");
      });
    }
  );
});
