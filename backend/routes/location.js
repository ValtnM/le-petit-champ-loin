// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');
const auth = require("../middleware/auth.js");
const { body } = require("express-validator");

// Importing controllers
const locationCtrl = require('../controllers/location.js');

// Validation rules
const validateLocation = [
    body("name")
    .notEmpty()
    .withMessage("Un nom est requis")
    .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
    .withMessage("Nom invalide. Contient des caractères non autorisés"),    
    body("frequency")
      .notEmpty()
      .withMessage("Une fréquence est requise")
      .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
      .withMessage("Fréquence invalide. Contient des caractères non autorisés"),
    body("schedule")
      .notEmpty()
      .withMessage("Un horaire est requis")
      .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
      .withMessage("L'horaire contient des caractères non autorisés"),
    body("isActive").isBoolean().withMessage("La valeur de 'Actif' est invalide"),
  ];

// Article routes declaration
router.post('/',auth, locationCtrl.getAll);
router.post('/active', locationCtrl.getActives);
router.post('/details',auth, locationCtrl.getLocationDetails);
router.post('/add',auth, multer.single('photo'), validateLocation, locationCtrl.addLocation);
router.post('/delete',auth, locationCtrl.deleteLocation);
router.post('/modify',auth, validateLocation, locationCtrl.modifyLocation);
router.post('/modify-photo',auth, multer.single('photo'), locationCtrl.modifyPhoto);


// Router export
module.exports = router;
