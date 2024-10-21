// Router creation
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const { body } = require("express-validator");

// Importing controllers
const eventCtrl = require("../controllers/event.js");

// Validation rules
const validateEvent = [
    body("title")
      .notEmpty()
      .withMessage("Un titre est requis")
      .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
      .withMessage("Titre invalide. Contient des caractères non autorisés"),
    body("date")
      .notEmpty()
      .withMessage("Une date est requise")
      .isDate()
      .withMessage("Date invalide. Le champ doit être au format JJ/MM/AAAA"),    
    body("schedule")
      .notEmpty()
      .withMessage("Un horaire est requis")
      .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
      .withMessage("Horaire invalide. Contient des caractères non autorisés"),    
    body("location")
      .notEmpty()
      .withMessage("Un lieu est requis")
      .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
      .withMessage("Lieu invalide. Contient des caractères non autorisés"),    
    
    body("isActive").isBoolean().withMessage("La valeur de 'Actif' est invalide"),
  ];

// Product routes declaration
router.post("/", auth, eventCtrl.getAll);
router.post("/active", eventCtrl.getActives);
router.post("/details", eventCtrl.getEventDetails);
router.post("/add", auth, validateEvent, eventCtrl.addEvent);
router.post("/delete", auth, eventCtrl.deleteEvent);
router.post("/add-user", auth, eventCtrl.addUser);
router.post("/delete-user", auth, eventCtrl.deleteUser);
router.post("/modify", auth, validateEvent, eventCtrl.modifyEvent);

// Router export
module.exports = router;
