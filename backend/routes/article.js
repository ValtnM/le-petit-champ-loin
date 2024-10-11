// Router creation
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.js');

// Importing controllers
const articleCtrl = require('../controllers/article.js');

// Article routes declaration
router.post('/', articleCtrl.getAll);
router.post('/active', articleCtrl.getActives);
router.post('/details', articleCtrl.getArticleDetails);
router.post('/add', multer.single('photo'), articleCtrl.addArticle);
router.post('/delete', articleCtrl.deleteArticle);
router.post('/modify', articleCtrl.modifyArticle);
router.post('/modify-photo', multer.single('photo'), articleCtrl.modifyPhoto);


// Router export
module.exports = router;
