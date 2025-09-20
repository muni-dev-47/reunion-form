const express = require('express');
const { fetchEmployeesData } = require('../controller/tableController');
const router = express.Router();

router.get("/users", fetchEmployeesData);

module.exports = router;
