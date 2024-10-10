// Création du router
const express = require('express');
const router = express.Router();

// Importation des controllers
const adminCtrl = require('../controllers/admin.js');

// Déclaration des routes Admin
router.post('/login', adminCtrl.login)
router.post('/checking', adminCtrl.checkToken)

// Exportation du router
module.exports = router;