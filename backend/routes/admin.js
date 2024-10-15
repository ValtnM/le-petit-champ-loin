// Création du router
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');


// Importation des controllers
const adminCtrl = require('../controllers/admin.js');

// Déclaration des routes Admin
router.post('/login', adminCtrl.login)
router.post('/checking', adminCtrl.checkToken)
router.post('/dashboard',auth, adminCtrl.getAllElements)

// Exportation du router
module.exports = router;