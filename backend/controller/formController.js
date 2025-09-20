const { db } = require('../config/connectDB');

const formData = (req, res) => {
    const { name, age, mobileNumber, companyName, jobTitle, address } = req.body;

    // ✅ Validation
    if (!name || !mobileNumber) {
        return res.status(400).json({ message: "Name and Mobile Number required" });
    }

    const sql = `
        INSERT INTO users (name, age, mobileNumber, companyName, jobTitle, address) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [name, age, mobileNumber, companyName, jobTitle, address];

    db.query(sql, values, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                // ✅ Duplicate mobile number
                return res.status(400).json({
                    message: "User with this Mobile Number already exists"
                });
            }
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.status(200).json({
            message: "Form data inserted successfully",
            insertedId: result.insertId
        });
    });
};

module.exports = { formData };
