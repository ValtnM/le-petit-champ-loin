const fs = require("fs");
const bcrypt = require("bcrypt");
const models = require("../models");

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deletePhoto = (filename) => {
  fs.unlink("./images/" + filename, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Photo supprimée");
  });
};

// Get all users
exports.getAll = (req, res) => {
  models.User.findAll()
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: "Aucun membre trouvé" });
      }

      return res.status(200).json(users);
    })
    .catch((err) => res.status(500).json(err));
};

// Get all users
exports.getActives = (req, res) => {
  models.User.findAll({where: {isActive: 1}})
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: "Aucun membre trouvé" });
      }

      return res.status(200).json(users);
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new user
exports.addUser = async (req, res) => {
  const { email, password, name, presentation, isAdmin } = req.body;
  const photo = req.file.filename;

  if (!email || !password || !name || !presentation || isAdmin === undefined) {
    deletePhoto(photo);
    return res.status(500).json({ message: "Données manquantes" });
  }

  if (!photo) {
    return res.status(500).json({ message: "Photo manquante" });
  }

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    deletePhoto(photo);
    return res
      .status(500)
      .json({ message: "Problème lors du hashage du mot de passe" });
  }

  models.User.create({
    email,
    password: hashedPassword,
    name,
    presentation,
    photo,
    isAdmin,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((user) => {
      if (!user) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la création du membre" });
      }
      return res.status(200).json({ message: "Membre créé !" });
    })
    .catch((error) => {
      deletePhoto(photo);
      return res.status(500).json(error);
    });
};

// Delete an user
exports.deleteUser = (req, res) => {
  const userId = req.body.id;

  if (!userId) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }
  models.User.findOne({ where: { id: userId } })
    .then((user) => {
      const filename = user.photo;
      models.User.destroy({ where: { id: userId } })
        .then(() => {
          deletePhoto(filename);
          return res.status(200).json({ message: "Utilisateur supprimé" });
        })
        .catch((err) => res.status(401).json({ message: "Erreur" + err }));
    })
    .catch(() => res.status(500).json({ message: "Aucun utilisateur trouvé" }));
};

// Modify user
exports.modifyUser = async (req, res) => {
  const { id, email, password, name, presentation, isAdmin } = req.body;
  const photo = req.file.filename;

  if (
    !id ||
    !email ||
    !password ||
    !name ||
    !presentation ||
    isAdmin === undefined
  ) {
    deletePhoto(photo);
    return res.status(500).json({ message: "Données manquantes" });
  }

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    deletePhoto(photo);
    return res
      .status(500)
      .json({ message: "Problème lors du hashage du mot de passe" });
  }

  models.User.findOne({ where: { id: id } })
    .then((user) => {
      if (user.photo) {
        deletePhoto(user.photo);
      }
      models.User.update(
        {
          email,
          password: hashedPassword,
          name,
          photo,
          presentation,
          isAdmin,
          updatedAt: new Date(),
        },
        {
          where: { id: id },
        }
      )
        .then(() => {
          return res.status(200).json({ message: "Utilisateur modifié" });
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch(() => res.status(404).json({ message: "Aucun utilisateur trouvé" }));
};
