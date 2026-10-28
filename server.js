const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();

const PORT = 3000;

app.use(express.static(
    path.join(__dirname, "public")
));

app.get("/api/products", (req, res) => {

    const search = req.query.search || "";

    // VULNERABILIDAD SQL INJECTION
    const query = `
        SELECT id, name, description, price
        FROM products
        WHERE name LIKE '%${search}%'
    `;

    console.log("Executing SQL:", query);

    try {

        const products = db.prepare(query).all();

        res.json(products);

    } catch (error) {

        res.status(400).json({
            error: "Invalid search query"
        });

    }

});

app.listen(PORT, () => {

    console.log(`
    Product Manager running at:
    http://localhost:${PORT}
    `);

});
