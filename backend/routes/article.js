// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');

// Importing controllers
const articleCtrl = require('../controllers/article.js');

// Article routes declaration
router.post('/', articleCtrl.getAll);
router.post('/visible', articleCtrl.getVisible);
router.post('/add', multer.single('photo'), articleCtrl.addArticle);
router.post('/delete', articleCtrl.deleteArticle);
router.post('/modify', articleCtrl.modifyArticle);

// Router export
module.exports = router;
