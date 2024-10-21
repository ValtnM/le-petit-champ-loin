// Router creation
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Importing controllers
const emailCtrl = require("../controllers/email.js");

// Validation rules
const validateEmail = [
  body("firstname")
    .notEmpty()
    .withMessage("Un prénom est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le prénom ne doit pas contenir de caractères spéciaux"),
  body("lastname")
    .notEmpty()
    .withMessage("Un nom est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le nom ne doit pas contenir de caractères spéciaux"),
  body("email")
    .notEmpty()
    .withMessage("Une adresse email est requise")
    .isEmail()
    .withMessage("Email invalide"),
  body("phone")
    .optional({ checkFalsy: true })
    .matches(/^(\+33|0)[1-9](\d{2}){4}$/)
    .withMessage("Le numéro de téléphone n'est pas valide"),
  body("subject")
    .notEmpty()
    .withMessage("Un objet est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("L'objet ne doit pas contenir de caractères spéciaux"),
  body("message")
    .notEmpty()
    .withMessage("Un message est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le message ne doit pas contenir de caractères spéciaux"),  
];

// Product routes declaration
router.post("/",validateEmail, emailCtrl.sendEmail);

// Router export
module.exports = router;
