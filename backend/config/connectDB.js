const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Muni@2004',
    database: 'employees'
});

const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            age INT,
            mobileNumber VARCHAR(15) UNIQUE,
            companyName VARCHAR(100),
            jobTitle VARCHAR(100),
            address TEXT
        )
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error("❌ Table creation failed:", err);
        } else {
            console.log("✅ Users table ready!");
        }
    });
};

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Database connected successfully!");
    createTable(); // call here directly
});

// Export both
module.exports = { db, createTable };
