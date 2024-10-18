// Router creation
const express = require('express');
const router = express.Router();

// Importing controllers
const emailCtrl = require('../controllers/email.js');

// Product routes declaration
router.post('/', emailCtrl.sendEmail);

// Router export
module.exports = router;
