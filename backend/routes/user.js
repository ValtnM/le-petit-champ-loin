// Router creation
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.js");

// Importing controllers
const userCtrl = require("../controllers/user.js");

// Product routes declaration
router.post("/", userCtrl.getAll);
router.post("/active", userCtrl.getActives);
router.post("/details", userCtrl.getUserDetails);
router.post("/add", multer.single("photo"), userCtrl.addUser);
router.post("/delete", userCtrl.deleteUser);
router.post("/modify", userCtrl.modifyUser);
router.post("/modify-photo", multer.single("photo"), userCtrl.modifyPhoto);

// Router export
module.exports = router;
