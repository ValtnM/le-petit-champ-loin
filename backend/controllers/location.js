const fs = require("fs");
const models = require("../models");
const { validationResult } = require("express-validator");

const deletePhoto = (res, filename) => {
  fs.unlink("./images/" + filename, (err) => {
    if (err) {
      res.status(500).json({
        message: "Erreur lors de la suppression de photo: " + err,
      });
    }
  });
};

// Get all locations
exports.getAll = (req, res) => {
  models.Location.findAll()
    .then((locations) => {
      if (!locations) {
        return res.status(404).json({ message: "Aucun lieu trouvé" });
      }

      return res.status(200).json(locations);
    })
    .catch((err) => res.status(500).json(err));
};

// Get visibles locations
exports.getActives = (req, res) => {
  models.Location.findAll({
    where: { isActive: true },
  })
    .then((locations) => {
      if (!locations) {
        return res.status(404).json({ message: "Aucun lieu trouvé" });
      }

      return res.status(200).json(locations);
    })
    .catch((err) => res.status(500).json(err));
};

// Get location details
exports.getLocationDetails = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(500).json({ message: "Id manquant" });
  }

  models.Location.findOne({ where: { id: id } })
    .then((location) => {
      if (location) {
        return res.status(200).json(location);
      } else {
        return res.status(404).json({ message: "Aucun lieu trouvé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new location
exports.addLocation = (req, res) => {
  const { name, frequency, schedule, isActive } = req.body;

  if(!req.file) {
    return res.status(500).json({error: "Photo manquante"})
  }

  const photo = req.file.filename;

  if (req.file.mimetype != ("image/jpeg" || "image/jpg" || "image/png")) {
    deletePhoto(res, photo);
    return res
      .status(500)
      .json({
        error:
          "Format d'image invalide (fichiers autorisés: .jpg, .jpeg, .png)",
      });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    deletePhoto(res, photo);
    return res.status(400).json({ errors: errors.array() });
  }

  if (!name || !frequency || !schedule || isActive === undefined) {
    return res.status(500).json({ message: "Données manquantes" });
  }


  models.Location.create({
    name,
    frequency,
    schedule,
    photo,
    isActive,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((location) => {
      if (!location) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la création du lieu" });
      }
      return res.status(200).json({ success: "Lieu créé" });
    })
    .catch((error) => {
      deletePhoto(res, photo);
      return res.status(500).json(error);
    });
};

// Delete a location
exports.deleteLocation = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  models.Location.findOne({
    where: { id: id },
  })
    .then((location) => {
      if (location) {
        const photo = location.photo;
        models.Location.destroy({ where: { id: location.id } })
          .then(() => {
            deletePhoto(res, photo);
            return res.status(200).json({ message: "Lieu supprimé" });
          })
          .catch((err) => res.status(500).json(err));
      } else {
        return res.status(404).json({ message: "Aucun lieu trouvé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Modify a location
exports.modifyLocation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, name, frequency, schedule, isActive } = req.body;

  if ((!id, !name || !frequency || !schedule || isActive === undefined)) {
    return res
      .status(500)
      .json({ message: "Une ou plusieurs données manquantes" });
  }

  models.Location.findOne({ where: { id: id } }).then((location) => {
    if (location) {
      models.Location.update(
        { name, frequency, schedule, isActive, updatedAt: new Date() },
        {
          where: { id: location.id },
        }
      )
        .then(() => {
          return res.status(200).json({ success: "Lieu modifié" });
        })
        .catch((err) => res.status(500).json(err));
    } else {
      return res.status(404).json({ message: "Aucun lieu trouvé" });
    }
  });
};

// Modify a location's photo
exports.modifyPhoto = (req, res) => {
  const { id } = req.body;
  const newPhoto = req.file.filename;

  if (req.file.mimetype != ("image/jpeg" || "image/jpg" || "image/png")) {
    deletePhoto(res, newPhoto);
    return res
      .status(500)
      .json({
        error:
          "Format d'image invalide (fichiers autorisés: .jpg, .jpeg, .png)",
      });
  }


  if (!id) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  if (!newPhoto) {
    return res.status(500).json({ message: "Photo manquante" });
  }

  models.Location.findOne({ where: { id: id } }).then((location) => {
    if (location) {
      models.Location.update(
        { photo: newPhoto, updatedAt: new Date() },
        {
          where: { id: location.id },
        }
      )
        .then(() => {
          deletePhoto(res, location.photo);
          return res.status(200).json({ message: "Photo modifié" });
        })
        .catch((err) => {
          deletePhoto(res, newPhoto);
          return res.status(500).json(err);
        });
    } else {
      deletePhoto(res, newPhoto);
      return res.status(404).json({ message: "Aucun lieu trouvé" });
    }
  });
};
