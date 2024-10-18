const fs = require("fs");
const models = require("../models");
const { validationResult } = require("express-validator");

const deletePhoto = (filename) => {
  fs.unlink("./images/" + filename, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Photo supprimée");
  });
};

// Get all products
exports.getAll = (req, res) => {
  models.Product.findAll({
    include: [
      {
        model: models.ProductPhoto,
        as: "Product_Photos",
        attributes: ["id", "name"],
      },
    ],
  })
    .then((products) => {
      if (!products) {
        return res.status(404).json({ message: "Aucun produit trouvé" });
      }

      return res.status(200).json(products);
    })
    .catch((err) => res.status(500).json(err));
};

// Get active products
exports.getActives = (req, res) => {
  models.Product.findAll({
    where: { isActive: true },
    include: [
      {
        model: models.ProductPhoto,
        as: "Product_Photos",
        attributes: ["name"],
      },
    ],
  })
    .then((products) => {
      if (!products) {
        return res.status(404).json({ message: "Aucun produit trouvé" });
      }

      return res.status(200).json(products);
    })
    .catch((err) => res.status(500).json(err));
};

// Get product details
exports.getProductDetails = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(500).json({ message: "Id manquant" });
  }

  models.Product.findOne({
    where: { id: id },
    include: [
      {
        model: models.Suggestion,
        as: "Suggestions",
        attributes: ["title", "description"],
        required: false,
        where: { isActive: 1 },
        include: [
          { model: models.User, as: "Users", attributes: ["name", "photo"] },
        ],
      },
      {
        model: models.ProductPhoto,
        as: "Product_Photos",
        attributes: ["id", "name"],
      },
    ],
  })
    .then((product) => {
      if (product) {
        return res.status(200).json(product);
      } else {
        return res.status(404).json({ message: "Aucun produit trouvé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new product
exports.addProduct = (req, res) => {
  const { name, type, description, isActive } = req.body;
  const photos = req.files;

  for (const photo of photos) {
    if (!["image/jpeg", "image/jpg", "image/png"].includes(photo.mimetype)) {
      deletePhoto(photo.filename);
      return res.status(500).json({
        error:
          "Format d'image invalide (fichiers autorisés: .jpg, .jpeg, .png)",
      });
    }
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    photos.forEach((photo) => {
      deletePhoto(photo);
    });
    return res.status(400).json({ errors: errors.array() });
  }

  if (!name || !type || !description || isActive === undefined) {
    return res.status(500).json({ error: "Données manquantes" });
  }

  if (!photos || photos.length === 0) {
    return res.status(500).json({ error: "Photo manquante" });
  }

  models.Product.create(
    {
      name,
      type,
      description,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
      Product_Photos: photos.map((photo) => ({
        name: photo.filename,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    },
    {
      include: [
        {
          model: models.ProductPhoto,
          as: "Product_Photos",
        },
      ],
    }
  )
    .then((product) => {
      if (!product) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création du produit" });
      }
      return res.status(200).json({ success: "Produit ajouté !" });
    })
    .catch((error) => {
      photos.forEach((photo) => {
        deletePhoto(photo.filename);
      });
      return res.status(500).json(error);
    });
};

// Delete a product
exports.deleteProduct = (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  models.Product.findOne({
    where: { id: id },
    include: [
      {
        model: models.ProductPhoto,
        as: "Product_Photos",
        attributes: ["name"],
      },
    ],
  })
    .then((product) => {
      const photos = product.Product_Photos;
      if (!photos || photos.length <= 0) {
        res
          .status(500)
          .json({ message: "Erreur lors de la suppression du produit" });
      }
      models.Product.destroy({ where: { id: product.id } })
        .then(() => {
          photos.forEach((photo) => {
            fs.unlink("./images/" + photo.name, (err) => {
              if (err) {
                res
                  .status(500)
                  .json({ message: "Erreur lors de la suppression de photo" });
              }
              return res.status(200).json({ message: "Photo supprimée" });
            });
          });
        })
        .catch((err) => res.status(401).json({ message: "Erreur" + err }));
    })
    .catch(() => res.status(404).json({ message: "Produit non trouvé" }));
};

// Delete a product's photo
exports.deleteProductPhoto = (req, res) => {
  const photoId = req.body.id;
  console.log(req.body);

  if (!photoId) {
    return res.status(500).json({ message: "Id introuvable" });
  }

  models.ProductPhoto.findOne({ where: { id: photoId } })
    .then((photo) => {
      if (!photo) {
        return res.status(404).json({ message: "Photo non trouvée" });
      }
      const filename = photo.name;
      if (!filename) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la récupération de la photo" });
      }

      models.ProductPhoto.destroy({ where: { id: photoId } })
        .then(() => {
          fs.unlink("./images/" + filename, (err) => {
            if (err) {
              return res.status(500).json({
                message: "Erreur lors de la suppression de la photo : " + err,
              });
            }
            return res.status(200).json({ message: "Photo supprimée" });
          });
        })
        .catch((err) =>
          res
            .status(500)
            .json({ message: "La suppression de la photo à échouée : " + err })
        );
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new product's photo
exports.addProductPhoto = (req, res) => {
  const productId = req.body.id;
  const photo = req.file;

  if (!["image/jpeg", "image/jpg", "image/png"].includes(photo.mimetype)) {
    deletePhoto(photo.filename);
    return res.status(500).json({
      error:
        "Format d'image invalide (fichiers autorisés: .jpg, .jpeg, .png)",
    });
  }

  if (!productId) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  if (!photo) {
    return res.status(500).json({ message: "Aucune photo trouvée" });
  }

  models.ProductPhoto.create({
    name: photo.filename,
    product_id: productId,
  })
    .then((result) => {
      if (!result) {
        return res
          .status(500)
          .json({ message: "L'ajout de la photo à échoué" });
      }
      return res.status(200).json({ message: "La photo a été ajoutée" });
    })
    .catch((error) => {
      deletePhoto(photo.filename);
      return res.status(500).json(error);
    });
};

// Modify product's details
exports.modifyProduct = (req, res) => {
  const { id, name, type, description, isActive } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if ((!id, !name || !type || !description || isActive === undefined)) {
    return res
      .status(500)
      .json({ message: "Une ou plusieurs données manquantes" });
  }

  models.Product.update(
    { name, type, description, isActive, updatedAt: new Date() },
    {
      where: { id: id },
    }
  )
    .then(() => {
      return res.status(200).json({ success: "Produit modifié" });
    })
    .catch((err) => res.status(500).json(err));
};
