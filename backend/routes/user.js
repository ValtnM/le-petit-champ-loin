// Router creation
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.js");

// Importing controllers
const userCtrl = require("../controllers/user.js");

// Product routes declaration
router.post("/", userCtrl.getAll);
router.post("/add", multer.single("photo"), userCtrl.addUser);
router.post("/delete", userCtrl.deleteUser);
router.post("/modify", multer.single("photo"), userCtrl.modifyUser);

// Router export
module.exports = router;
