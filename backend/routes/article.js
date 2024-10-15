// Router creation
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.js");
const auth = require("../middleware/auth.js");

// Importing controllers
const articleCtrl = require("../controllers/article.js");

// Article routes declaration
router.post("/", auth, articleCtrl.getAll);
router.post("/active", articleCtrl.getActives);
router.post("/details", auth, articleCtrl.getArticleDetails);
router.post("/add", auth, multer.single("photo"), articleCtrl.addArticle);
router.post("/delete", auth, articleCtrl.deleteArticle);
router.post("/modify", auth, articleCtrl.modifyArticle);
router.post(
  "/modify-photo",
  auth,
  multer.single("photo"),
  articleCtrl.modifyPhoto
);

// Router export
module.exports = router;
