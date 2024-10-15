// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');
const auth = require("../middleware/auth.js");

// Importing controllers
const productCtrl = require('../controllers/product.js');

// Product routes declaration
router.post('/',auth, productCtrl.getAll);
router.post('/active', productCtrl.getActives);
router.post('/details',auth, productCtrl.getProductDetails);
router.post('/add',auth, multer.array('photos'), productCtrl.addProduct);
router.post('/delete',auth, productCtrl.deleteProduct);
router.post('/delete-photo',auth, productCtrl.deleteProductPhoto);
router.post('/add-photo',auth, multer.single('photo'), productCtrl.addProductPhoto);
router.post('/modify-product',auth, productCtrl.modifyProduct);

// Router export
module.exports = router;
