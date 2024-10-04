const fs = require("fs");
const models = require("../models");


// Get all products
exports.getAll = (req, res) => {
  models.Product.findAll({
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


// Get active products
exports.getActive = (req, res) => {
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
  const {id} = req.body;

  if(!id) {
    return res.status(500).json({message: "Id manquant"})
  }

  models.Product.findOne({where: {id: id}, include: [
    {
      model: models.Suggestion,
      as: "Suggestions",
      attributes: ["title", "description"],
      where: {isVisible: 1},
      include: [{model: models.User, as: "Users", attributes: ["name", "photo"]}]
    },
    {
      model: models.ProductPhoto,
      as: "Product_Photos",
      attributes: ["name"]
    },

  ]})
  .then(product => {
    if(product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({message: "Aucun produit trouvé"})
    }
  })
  .catch(err => res.status(500).json(err))
}


// Add a new product
exports.addProduct = (req, res) => {
  const { name, type, description, isActive } = req.body;
  const photos = req.files;

  if (!name || !type || !description || isActive === undefined) {
    return res
      .status(500)
      .json({ message: "Données manquantes" });
  }

  if (!photos || photos.length === 0) {
    return res
      .status(500)
      .json({ message: "Photo manquante" });
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
          .json({ message: "Erreur lors de la création du produit" });
      }
      return res.status(200).json({ message: "Produit ajouté !" });
    })
    .catch((error) => {
      photos.forEach((photo) => {
        fs.unlink("./images/" + photo.filename, (err) => {
          if (err) {
            console.log(err);
          }
          console.log("Photo supprimée");
        });
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
      fs.unlink("./images/" + photo.filename, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Photo supprimée");
      });
      return res.status(500).json(error);
    });
};


// Modify product's details
exports.modifyProduct = (req, res) => {
  const { id, name, type, description, isActive } = req.body;

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
      return res.status(200).json({ message: "Produit modifié" });
    })
    .catch((err) => res.status(500).json(err));
};
