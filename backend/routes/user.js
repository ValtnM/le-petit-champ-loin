// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');

// Importing controllers
const userCtrl = require('../controllers/user.js');

// Product routes declaration
router.post('/', userCtrl.getAll);
router.post('/add', multer.single('photo'), userCtrl.addUser);
router.post('/delete', userCtrl.deleteUser);
router.post('/modify', multer.single('photo'), userCtrl.modifyUser);
// router.post('/add', multer.array('photos'), productCtrl.addProduct);
// router.post('/delete', productCtrl.deleteProduct);
// router.post('/delete-photo', productCtrl.deleteProductPhoto);
// router.post('/add-photo', multer.single('photo'), productCtrl.addProductPhoto);
// router.post('/modify-product', productCtrl.modifyProduct);

// Router export
module.exports = router;
