// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');

// Importing controllers
const productCtrl = require('../controllers/product.js');

// Product routes declaration
router.post('/', productCtrl.getAll);
router.post('/active', productCtrl.getActives);
router.post('/details', productCtrl.getProductDetails);
router.post('/add', multer.array('photos'), productCtrl.addProduct);
router.post('/delete', productCtrl.deleteProduct);
router.post('/delete-photo', productCtrl.deleteProductPhoto);
router.post('/add-photo', multer.single('photo'), productCtrl.addProductPhoto);
router.post('/modify-product', productCtrl.modifyProduct);

// Router export
module.exports = router;
