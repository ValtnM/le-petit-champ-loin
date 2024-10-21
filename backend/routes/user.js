// Router creation
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.js");
const auth = require("../middleware/auth.js");
const { body } = require("express-validator");

// Importing controllers
const userCtrl = require("../controllers/user.js");

// Validation rules
const validateCreationUser = [
  body("name")
    .notEmpty()
    .withMessage("Un prénom est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le prénom ne doit pas contenir de caractères spéciaux"),
  body("email")
    .notEmpty()
    .withMessage("Une adresse email est requise")
    .isEmail()
    .withMessage("Email invalide"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|;:'",.\/?\\`~\-]).{6,12}$/
    )
    .withMessage(
      "Le mot de passe doit contenir entre 6 et 12 caractères, incluant au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),

  body("presentation")
    .notEmpty()
    .withMessage("La présentation est requise")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le message contient des caractères non autorisés"),
  body("isAdmin").isBoolean().withMessage("La valeur de 'Admin' est invalide"),
  body("isActive").isBoolean().withMessage("La valeur de 'Actif' est invalide"),
];

const validateModificationUser = [
  body("name")
    .notEmpty()
    .withMessage("Un prénom est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le prénom ne doit pas contenir de caractères spéciaux"),
  body("email")
    .notEmpty()
    .withMessage("Une adresse email est requise")
    .isEmail()
    .withMessage("Email invalide"),
  body("password")
    .optional({ checkFalsy: true })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|;:'",.\/?\\`~\-]).{6,12}$/
    )
    .withMessage(
      "Le mot de passe doit contenir entre 6 et 12 caractères, incluant au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),

  body("presentation")
    .notEmpty()
    .withMessage("La présentation est requise")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le message contient des caractères non autorisés"),
  body("isAdmin").isBoolean().withMessage("La valeur de 'Admin' est invalide"),
  body("isActive").isBoolean().withMessage("La valeur de 'Actif' est invalide"),
];

// Product routes declaration
router.post("/", auth, userCtrl.getAll);
router.post("/active", userCtrl.getActives);
router.post("/details", auth, userCtrl.getUserDetails);
router.post(
  "/add",
  auth,
  multer.single("photo"),
  validateCreationUser,
  userCtrl.addUser
);
router.post("/delete", auth, userCtrl.deleteUser);
router.post("/modify", auth, validateModificationUser, userCtrl.modifyUser);
router.post(
  "/modify-photo",
  auth,
  multer.single("photo"),
  userCtrl.modifyPhoto
);

// Router export
module.exports = router;
