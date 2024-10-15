// Router creation
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

// Importing controllers
const eventCtrl = require("../controllers/event.js");

// Product routes declaration
router.post("/", auth, eventCtrl.getAll);
router.post("/active", eventCtrl.getActives);
router.post("/add", auth, eventCtrl.addEvent);
router.post("/delete", auth, eventCtrl.deleteEvent);
router.post("/add-user", auth, eventCtrl.addUser);
router.post("/delete-user", auth, eventCtrl.deleteUser);
router.post("/modify", auth, eventCtrl.modifyEvent);

// Router export
module.exports = router;
