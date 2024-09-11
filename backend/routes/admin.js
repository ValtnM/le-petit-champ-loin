// Création du router
const express = require('express');
const router = express.Router();

// Importation des controllers
const adminCtrl = require('../controllers/admin.js');

// Déclaration des routes Admin
router.post('/connexion', adminCtrl.login)
router.post('/checking', adminCtrl.checkToken)
// router.get('/:token', adminCtrl.checkToken)

// Exportation du router
module.exports = router;