// Router creation
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const { body } = require("express-validator");

// Importing controllers
const suggestionCtrl = require("../controllers/suggestion.js");

// Validation rules
const validateCreationSuggestion = [
  body("productId")
    .notEmpty()
    .withMessage("Un produit est requis")
    .matches(/^\d+$/)
    .withMessage("Le produit n'a pas été correctement transmis"),
  body("title")
    .notEmpty()
    .withMessage("Un titre est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le titre ne doit pas contenir de caractères spéciaux"),
  body("description")
    .notEmpty()
    .withMessage("Une description est requise")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("La description ne doit pas contenir de caractères spéciaux"),
  body("isActive").isBoolean().withMessage("La valeur de 'Actif' est invalide"),
];
const validateModificationSuggestion = [  
  body("title")
    .notEmpty()
    .withMessage("Un titre est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Le titre ne doit pas contenir de caractères spéciaux"),
  body("description")
    .notEmpty()
    .withMessage("Une description est requise")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("La description ne doit pas contenir de caractères spéciaux"),
  body("isActive").isBoolean().withMessage("La valeur de 'Actif' est invalide"),
];

// Suggestion routes declaration
router.post("/", auth, suggestionCtrl.getAll);
router.post("/product", suggestionCtrl.getAllByProduct);
router.post("/active", auth, suggestionCtrl.getActives);
router.post("/product-active", auth, suggestionCtrl.getActivesByProduct);
router.post("/details", auth, suggestionCtrl.getSuggestionDetails);
router.post("/add", auth, validateCreationSuggestion, suggestionCtrl.addSuggestion);
router.post("/delete", auth, suggestionCtrl.deleteSuggestion);
router.post("/modify", auth, validateModificationSuggestion, suggestionCtrl.modifySuggestion);

// Router export
module.exports = router;
