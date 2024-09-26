// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');

// Importing controllers
const locationCtrl = require('../controllers/location.js');

// Article routes declaration
router.post('/', locationCtrl.getAll);
router.post('/visible', locationCtrl.getVisible);
router.post('/add', multer.single('photo'), locationCtrl.addLocation);
router.post('/delete', locationCtrl.deleteLocation);
router.post('/modify', locationCtrl.modifyLocation);
router.post('/modify-photo', multer.single('photo'), locationCtrl.modifyPhoto);

// router.post('/visible', articleCtrl.getVisible);
// router.post('/add', multer.single('photo'), articleCtrl.addArticle);
// router.post('/delete', articleCtrl.deleteArticle);
// router.post('/modify', articleCtrl.modifyArticle);

// Router export
module.exports = router;
