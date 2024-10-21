// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');
const auth = require("../middleware/auth.js");
const { body } = require("express-validator");

// Importing controllers
const productCtrl = require('../controllers/product.js');

// Validation rules
const validateProduct = [
    body("type")
      .notEmpty()
      .withMessage("Un type est requis")
      .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
      .withMessage("Type invalide. Contient des caractères non autorisés"),
    body("name")
      .notEmpty()
      .withMessage("Un nom est requis")
      .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
      .withMessage("Nom invalide. Contient des caractères non autorisés"),    
    body("description")
      .notEmpty()
      .withMessage("Une description est requise")
      .matches(/^[a-zA-Z0-9À-ÿœ\s.,!?'"()\-_:;@\n\r]+$/)
      .withMessage("Le message contient des caractères non autorisés"),
    body("isActive").isBoolean().withMessage("La valeur de 'Actif' est invalide"),
  ];


// Product routes declaration
router.post('/',auth, productCtrl.getAll);
router.post('/active', productCtrl.getActives);
router.post('/details', productCtrl.getProductDetails);
router.post('/add',auth, multer.array('photos'), validateProduct, productCtrl.addProduct);
router.post('/delete',auth, productCtrl.deleteProduct);
router.post('/delete-photo',auth, productCtrl.deleteProductPhoto);
router.post('/add-photo',auth, multer.single('photo'), productCtrl.addProductPhoto);
router.post('/modify-product',auth, validateProduct,  productCtrl.modifyProduct);

// Router export
module.exports = router;
