const express = require('express');
const app = express();
const cors = require('cors');
const { createTable } = require('./config/connectDB')
app.use(cors());
app.use(express.json());

createTable();

app.use("/api", require('./routes/formRoutes'));
app.use("/api", require('./routes/tableRoutes'));

const admin = {
    name: "Admin",
    mobileNumber: "9876543210"
};

app.get("/api/login", (req, res) => {
    const { name, mobileNumber } = req.query;

    if (!name || !mobileNumber) {
        return res.status(400).json({ message: "Name and Mobile Number required" });
    }

    if (name === admin.name && mobileNumber === admin.mobileNumber) {
        return res.status(200).json({ message: "Welcome Admin!" });
    } else {
        return res.status(200).json({ message: "Access Denied!" });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
