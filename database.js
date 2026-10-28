const Database = require("better-sqlite3");

const db = new Database("products.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    );
`);

const count = db.prepare(
    "SELECT COUNT(*) AS total FROM products"
).get();

if (count.total === 0) {

    const insert = db.prepare(`
        INSERT INTO products (name, description, price)
        VALUES (?, ?, ?)
    `);

    insert.run(
        "Laptop",
        "Portátil profesional",
        999
    );

    insert.run(
        "Mouse",
        "Ratón inalámbrico",
        29
    );

    insert.run(
        "Keyboard",
        "Teclado mecánico",
        89
    );

    insert.run(
        "Monitor",
        "Monitor 27 pulgadas",
        249
    );
}

const usersCount = db.prepare(
    "SELECT COUNT(*) AS total FROM users"
).get();

if (usersCount.total === 0) {

    db.prepare(`
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `).run(
        "admin",
        "SuperSecret123"
    );
}

module.exports = db;
