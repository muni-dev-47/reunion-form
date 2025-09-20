const express = require('express');
const { formData } = require('../controller/formController');
const router = express.Router();

router.post("/formdata", formData);

module.exports = router;
