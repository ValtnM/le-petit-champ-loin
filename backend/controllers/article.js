const fs = require("fs");
const models = require("../models");

// Get all articles
exports.getAll = (req, res) => {
  models.Article.findAll({
    include: [
      {
        model: models.User,
        as: "Users",
        attributes: ["name", "photo"],
      },
    ],
  })
    .then((articles) => {
      if (!articles) {
        return res.status(404).json({ message: "Aucun article trouvé" });
      }

      return res.status(200).json(articles);
    })
    .catch((err) => res.status(500).json(err));
};

// Get visibles articles
exports.getVisible = (req, res) => {
  models.Article.findAll({
    where: { isVisible: true },
    include: [
      {
        model: models.User,
        as: "Users",
        attributes: ["name", "photo"],
      },
    ],
  })
    .then((articles) => {
      if (!articles) {
        return res.status(404).json({ message: "Aucun article trouvé" });
      }

      return res.status(200).json(articles);
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new article
exports.addArticle = (req, res) => {
  const { title, content, isVisible, userId } = req.body;
  const photo = req.file.filename;

  if (!title || !content || !userId || isVisible === undefined) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  if (!photo) {
    return res.status(500).json({ message: "Photo manquante" });
  }

  models.Article.create({
    title,
    content,
    photo,
    isVisible,
    user_id: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((article) => {
      if (!article) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la création de l'article" });
      }
      return res.status(200).json({ message: "Article créé" });
    })
    .catch((error) => {
      fs.unlink("./images/" + photo, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Photo supprimée");
      });
      return res.status(500).json(error);
    });
};

// Delete an article
exports.deleteArticle = (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  models.Article.findOne({
    where: { id: id },
  })
    .then((article) => {
      console.log("article: ", article);

      if (article) {
        const photo = article.photo;
        models.Article.destroy({ where: { id: article.id } })
          .then(() => {
            fs.unlink("./images/" + photo, (err) => {
              if (err) {
                res.status(500).json({
                  message: "Erreur lors de la suppression de photo: " + err,
                });
              }
              return res.status(200).json({ message: "Article supprimé" });
            });
          })
          .catch((err) => res.status(500).json(err));
      } else {
        return res.status(404).json({ message: "Aucun article trouvé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Modify an article
exports.modifyArticle = (req, res) => {
  const { id, title, content, isVisible } = req.body;

  if ((!id, !title || !content || isVisible === undefined)) {
    return res
      .status(500)
      .json({ message: "Une ou plusieurs données manquantes" });
  }

  models.Article.findOne({ where: { id: id } }).then((article) => {
    if (article) {
      models.Article.update(
        { title, content, isVisible, updatedAt: new Date() },
        {
          where: { id: article.id },
        }
      )
        .then(() => {
          return res.status(200).json({ message: "Article modifié" });
        })
        .catch((err) => res.status(500).json(err));
    } else {
      return res.status(404).json({ message: "Aucun article trouvé" });
    }
  });
};