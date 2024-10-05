// Router creation
const express = require('express');
const router = express.Router();

// Importing controllers
const suggestionCtrl = require('../controllers/suggestion.js');

// Suggestion routes declaration
router.post('/', suggestionCtrl.getAll);
router.post('/product', suggestionCtrl.getAllByProduct);
router.post('/active', suggestionCtrl.getActives);
router.post('/product-active', suggestionCtrl.getActivesByProduct);
router.post('/add', suggestionCtrl.addSuggestion);
router.post('/delete', suggestionCtrl.deleteSuggestion);
router.post('/modify', suggestionCtrl.modifySuggestion);
// router.post('/visible', articleCtrl.getVisible);
// router.post('/add', multer.single('photo'), articleCtrl.addArticle);
// router.post('/delete', articleCtrl.deleteArticle);
// router.post('/modify', articleCtrl.modifyArticle);

// Router export
module.exports = router;
