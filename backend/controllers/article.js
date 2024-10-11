const fs = require("fs");
const models = require("../models");

const deletePhoto = (res, filename) => {
  fs.unlink("./images/" + filename, (err) => {
    if (err) {
      res.status(500).json({
        message: "Erreur lors de la suppression de photo: " + err,
      });
    }
  });
};

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

// Get active articles
exports.getActives = (req, res) => {
  models.Article.findAll({
    where: { isActive: true },
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

// Get article details
exports.getArticleDetails = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(500).json({ message: "Id manquant" });
  }

  models.Article.findOne({ where: { id: id } })
    .then((article) => {
      if (article) {
        return res.status(200).json(article);
      } else {
        return res.status(404).json({ message: "Aucun lieu trouvé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new article
exports.addArticle = (req, res) => {
  const { title, content, isActive, userId } = req.body;
  const photo = req.file.filename;

  if (!title || !content || !userId || isActive === undefined) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  if (!photo) {
    return res.status(500).json({ message: "Photo manquante" });
  }

  models.Article.create({
    title,
    content,
    photo,
    isActive,
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
      deletePhoto(res, photo);
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
            deletePhoto(res, photo);
            return res.status(200).json({ message: "Article supprimé" });
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
  const { id, title, content, isActive } = req.body;

  if ((!id, !title || !content || isActive === undefined)) {
    return res
      .status(500)
      .json({ message: "Une ou plusieurs données manquantes" });
  }

  models.Article.findOne({ where: { id: id } }).then((article) => {
    if (article) {
      models.Article.update(
        { title, content, isActive, updatedAt: new Date() },
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

// Modify an article's photo
exports.modifyPhoto = (req, res) => {
  const { id } = req.body;

  const newPhoto = req.file.filename;

  if (!id) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  if (!newPhoto) {
    return res.status(500).json({ message: "Photo manquante" });
  }

  models.Article.findOne({ where: { id: id } }).then((article) => {
    if (article) {
      models.Article.update(
        { photo: newPhoto, updatedAt: new Date() },
        {
          where: { id: article.id },
        }
      )
        .then(() => {
          deletePhoto(res, article.photo);
          return res.status(200).json({ message: "Photo modifié" });
        })
        .catch((err) => {
          deletePhoto(res, newPhoto);
          return res.status(500).json(err);
        });
    } else {
      deletePhoto(res, newPhoto);
      return res.status(404).json({ message: "Aucun article trouvé" });
    }
  });
};
