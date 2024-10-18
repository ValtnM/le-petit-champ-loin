// Création du router
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const { body } = require("express-validator");

// Importation des controllers
const adminCtrl = require("../controllers/admin.js");

// Validation rules
const validateConnexion = [
  body("email")
    .notEmpty()
    .withMessage("Une adresse email est requise")
    .isEmail()
    .withMessage("Email invalide"),
  body("password").notEmpty().withMessage("Un mot de passe est requis"),
];

// Déclaration des routes Admin
router.post("/login", validateConnexion, adminCtrl.login);
router.post("/checking", adminCtrl.checkToken);
router.post("/dashboard", auth, adminCtrl.getAllElements);

// Exportation du router
module.exports = router;
