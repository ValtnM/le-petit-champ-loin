// Router creation
const express = require("express");
const router = express.Router();

// Importing controllers
const eventCtrl = require("../controllers/event.js");

// Product routes declaration
router.post("/", eventCtrl.getAll);
router.post("/visible", eventCtrl.getVisibles);
router.post("/add", eventCtrl.addEvent);
router.post("/delete", eventCtrl.deleteEvent);
router.post("/add-user", eventCtrl.addUser);
router.post("/delete-user", eventCtrl.deleteUser);
router.post("/modify", eventCtrl.modifyEvent);

// Router export
module.exports = router;
