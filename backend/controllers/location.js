const fs = require("fs");
const models = require("../models");

const deletePhoto = (filename) => {
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
  const photo = req.file.filename;

  if (!name || !frequency || !schedule || isActive === undefined) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  if (!photo) {
    return res.status(500).json({ message: "Photo manquante" });
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
      return res.status(200).json({ message: "Lieu créé" });
    })
    .catch((error) => {
      deletePhoto(photo);
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
            deletePhoto(photo);
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
          return res.status(200).json({ message: "Lieu modifié" });
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
          deletePhoto(location.photo);
          return res.status(200).json({ message: "Photo modifié" });
        })
        .catch((err) => {
          deletePhoto(newPhoto);
          return res.status(500).json(err);
        });
    } else {
      deletePhoto(newPhoto);
      return res.status(404).json({ message: "Aucun lieu trouvé" });
    }
  });
};
