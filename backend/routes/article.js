// Router creation
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.js");
const auth = require("../middleware/auth.js");
const { body } = require("express-validator");

// Importing controllers
const articleCtrl = require("../controllers/article.js");

// Validation rules
const validateArticle = [
  body("title")
    .notEmpty()
    .withMessage("Un titre est requis")
    .matches(/^[a-zA-Z0-9À-ÿ\s.,!?'"()\-_:;@]+$/)
    .withMessage("Titre invalide. Contient des caractères non autorisés"),

  body("content")
    .notEmpty()
    .withMessage("Une texte est requis")
    .matches(/^[a-zA-Z0-9À-ÿ\s.,!?'"()\-_:;@]+$/)
    .withMessage("Le texte contient des caractères non autorisés"),
  body("isActive").isBoolean().withMessage("La valeur de 'Actif' est invalide"),
];

// Article routes declaration
router.post("/", auth, articleCtrl.getAll);
router.post("/active", articleCtrl.getActives);
router.post("/details", auth, articleCtrl.getArticleDetails);
router.post(
  "/add",
  auth,
  multer.single("photo"),
  validateArticle,
  articleCtrl.addArticle
);
router.post("/delete", auth, articleCtrl.deleteArticle);
router.post("/modify", auth, validateArticle, articleCtrl.modifyArticle);
router.post(
  "/modify-photo",
  auth,
  multer.single("photo"),
  articleCtrl.modifyPhoto
);

// Router export
module.exports = router;
