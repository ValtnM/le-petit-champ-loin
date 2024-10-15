// Router creation
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.js");
const auth = require("../middleware/auth.js");

// Importing controllers
const userCtrl = require("../controllers/user.js");

// Product routes declaration
router.post("/", auth, userCtrl.getAll);
router.post("/active", userCtrl.getActives);
router.post("/details", auth, userCtrl.getUserDetails);
router.post("/add", auth, multer.single("photo"), userCtrl.addUser);
router.post("/delete", auth, userCtrl.deleteUser);
router.post("/modify", auth, userCtrl.modifyUser);
router.post(
  "/modify-photo",
  auth,
  multer.single("photo"),
  userCtrl.modifyPhoto
);

// Router export
module.exports = router;
