const models = require("../models");
const { validationResult } = require("express-validator");


// Get all suggestions
exports.getAll = (req, res) => {
  models.Suggestion.findAll({
    include: [
      {
        model: models.User,
        as: "Users",
        attributes: ["name", "photo"],
      },
    ],
  })
    .then((suggestions) => {
      if (!suggestions) {
        return res.status(404).json({ message: "Aucune suggestion trouvé" });
      }

      return res.status(200).json(suggestions);
    })
    .catch((err) => res.status(500).json(err));
};

// Get all suggestions by product
exports.getAllByProduct = (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  models.Suggestion.findAll({
    where: { product_id: productId },
    include: [
      {
        model: models.User,
        as: "Users",
        attributes: ["name", "photo"],
      },
    ],
  })
    .then((suggestions) => {
      if (!suggestions) {
        return res.status(404).json({ message: "Aucune suggestion trouvé" });
      }

      return res.status(200).json(suggestions);
    })
    .catch((err) => res.status(500).json(err));
};

// Get visibles suggestions
exports.getActives = (req, res) => {
  models.Suggestion.findAll({
    where: { isActive: true },
    include: [
      {
        model: models.User,
        as: "Users",
        attributes: ["name", "photo"],
      },
    ],
  })
    .then((suggestions) => {
      if (!suggestions) {
        return res.status(404).json({ message: "Aucune suggestion trouvé" });
      }

      return res.status(200).json(suggestions);
    })
    .catch((err) => res.status(500).json(err));
};

// Get visibles suggestions by product
exports.getActivesByProduct = (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  models.Suggestion.findAll({
    where: { isActive: true, product_id: productId },
    include: [
      {
        model: models.User,
        as: "Users",
        attributes: ["name", "photo"],
      },
    ],
  })
    .then((suggestions) => {
      if (!suggestions) {
        return res.status(404).json({ message: "Aucune suggestion trouvé" });
      }

      return res.status(200).json(suggestions);
    })
    .catch((err) => res.status(500).json(err));
};

// get suggestion details
exports.getSuggestionDetails = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(500).json({ message: "Id manquant" });
  }

  models.Suggestion.findOne({ where: { id: id } })
    .then((suggestion) => {
      if (suggestion) {
        return res.status(200).json(suggestion);
      } else {
        return res.status(404).json({ message: "Aucune suggestion trouvée" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new suggestion
exports.addSuggestion = (req, res) => {
  const { title, description, isActive, productId } = req.body;
  const userId = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (
    !title ||
    !description ||
    !userId ||
    !productId ||
    isActive === undefined
  ) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  models.Suggestion.create({
    title,
    description,
    isActive,
    user_id: userId,
    product_id: productId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((suggestion) => {
      if (!suggestion) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de la suggestion" });
      }
      return res.status(200).json({ success: "Suggestion créée" });
    })
    .catch((error) => res.status(500).json(error));
};

// Delete a suggestion
exports.deleteSuggestion = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  models.Suggestion.findOne({
    where: { id: id },
  })
    .then((suggestion) => {
      if (suggestion) {
        models.Suggestion.destroy({ where: { id: suggestion.id } })
          .then(() => res.status(200).json({ message: "Suggestion supprimée" }))
          .catch((err) => res.status(500).json(err));
      } else {
        return res.status(404).json({ message: "Aucune suggestion trouvée" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Modify a suggestion
exports.modifySuggestion = (req, res) => {
  const { id, title, description, isActive } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if ((!id, !title || !description || isActive === undefined)) {
    return res
      .status(500)
      .json({ message: "Une ou plusieurs données manquantes" });
  }

  models.Suggestion.findOne({ where: { id: id } }).then((suggestion) => {
    if (suggestion) {
      models.Suggestion.update(
        { title, description, isActive, updatedAt: new Date() },
        {
          where: { id: suggestion.id },
        }
      )
        .then(() => res.status(200).json({ success: "Suggestion modifiée" }))
        .catch((err) => res.status(500).json(err));
    } else {
      return res.status(404).json({ message: "Aucune suggestion trouvée" });
    }
  });
};
