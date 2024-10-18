// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');
const auth = require("../middleware/auth.js");

// Importing controllers
const locationCtrl = require('../controllers/location.js');

// Article routes declaration
router.post('/',auth, locationCtrl.getAll);
router.post('/active', locationCtrl.getActives);
router.post('/details',auth, locationCtrl.getLocationDetails);
router.post('/add',auth, multer.single('photo'), locationCtrl.addLocation);
router.post('/delete',auth, locationCtrl.deleteLocation);
router.post('/modify',auth, locationCtrl.modifyLocation);
router.post('/modify-photo',auth, multer.single('photo'), locationCtrl.modifyPhoto);


// Router export
module.exports = router;
