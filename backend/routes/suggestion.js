// Router creation
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

// Importing controllers
const suggestionCtrl = require("../controllers/suggestion.js");

// Suggestion routes declaration
router.post("/", auth, suggestionCtrl.getAll);
router.post("/product", suggestionCtrl.getAllByProduct);
router.post("/active", auth, suggestionCtrl.getActives);
router.post("/product-active", auth, suggestionCtrl.getActivesByProduct);
router.post("/details", auth, suggestionCtrl.getSuggestionDetails);
router.post("/add", auth, suggestionCtrl.addSuggestion);
router.post("/delete", auth, suggestionCtrl.deleteSuggestion);
router.post("/modify", auth, suggestionCtrl.modifySuggestion);

// Router export
module.exports = router;
