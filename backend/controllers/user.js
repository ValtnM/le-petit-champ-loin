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
  const {userId, isAdmin} = req.body; 

  if(!isAdmin && userId) {
    models.User.findOne({where: {id: userId}})
    .then(user => {
      if(!user) {
        return res.status(404).json({message: "Aucun membre trouvé"})
      }

      return res.status(200).json(user);
    })
  } else if(isAdmin) {

    
    models.User.findAll()
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: "Aucun membre trouvé" });
      }
      
      return res.status(200).json(users);
    })
    .catch((err) => res.status(500).json(err));
  } else {
    return res.status(500).json({ message: "Erreur lors de la récupération des membres"})
  }
};

// Get all users
exports.getActives = (req, res) => {
  models.User.findAll({ where: { isActive: 1 } })
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: "Aucun membre trouvé" });
      }

      return res.status(200).json(users);
    })
    .catch((err) => res.status(500).json(err));
};

// Get user details
exports.getUserDetails = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(500).json({ message: "Id manquant" });
  }

  models.User.findOne({ where: { id: id } })
    .then((user) => {
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "Aucun membre trouvé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new user
exports.addUser = async (req, res) => {
  const currentIsAdmin = req.isAdmin;
  const userId = req.userId;

  if(!currentIsAdmin) {
    return res.status(500).json({error: "Action réservée aux administrateurs"})
  }

  const { email, password, name, presentation, isAdmin, isActive } = req.body;
  const photo = req.file.filename;

  if (
    !email ||
    !password ||
    !name ||
    !presentation ||
    isAdmin === undefined ||
    isActive === undefined
  ) {
    deletePhoto(photo);
    return res.status(500).json({ error: "Données manquantes" });
  }

  if (!photo) {
    return res.status(500).json({ error: "Photo manquante" });
  }

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    deletePhoto(photo);
    return res
      .status(500)
      .json({ error: "Problème lors du hashage du mot de passe" });
  }

  models.User.create({
    email,
    password: hashedPassword,
    name,
    presentation,
    photo,
    isAdmin,
    isActive,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((user) => {
      if (!user) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création du membre" });
      }
      return res.status(200).json({ success: "Membre créé !", userId, isAdmin: currentIsAdmin });
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
  const currentIsAdmin = req.isAdmin;
  const userId = req.userId;

  
  let { id, email, password, name, presentation, isAdmin, isActive } = req.body;
  
  if(!currentIsAdmin && userId != id) {
    return res.status(500).json({error: "Action réservée aux administrateurs"})
  }

  if (
    !id ||
    !email ||
    !name ||
    !presentation ||
    isAdmin === undefined ||
    isActive === undefined
  ) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  let hashedPassword;

  if (password != "") {
    hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      return res
        .status(500)
        .json({ message: "Problème lors du hashage du mot de passe" });
    }
  }

  models.User.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé" });
      }
      if (password === "") {
        password = user.password;
      }
      models.User.update(
        {
          email,
          password: hashedPassword,
          name,
          presentation,
          isAdmin,
          isActive,
          updatedAt: new Date(),
        },
        {
          where: { id: id },
        }
      )
        .then(() => {
          return res.status(200).json({ success: "Utilisateur modifié" });
        })
        .catch((err) => res.status(500).json("ERROR UPDATE"));
    })
    .catch((error) => {
      console.error("Erreur lors de la recherche de l'utilisateur :", error);
      res.status(500).json(error);
    });
};

exports.modifyPhoto = (req, res) => {
  const { id } = req.body;
  const photo = req.file.filename;

  if (!id) {
    deletePhoto(photo);
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  if (!photo) {
    return res.status(500).json({ message: "Aucune photo trouvée" });
  }

  models.User.findOne({
    where: {
      id,
    },
  })
    .then((user) => {
      if (!user) {
        deletePhoto(photo);
        return res.status(500).json({ message: "Aucun utilisateur trouvé" });
      }
      const oldPhoto = user.photo;
      models.User.update({ photo }, { where: { id } })
        .then(() => {
          deletePhoto(oldPhoto);

          return res.status(200).json({ message: "La photo a été modifiée" });
        })
        .catch((err) => {
          deletePhoto(photo);
          res.status(500).json(err);
        });
    })
    .catch((error) => {
      deletePhoto(photo);
      return res.status(500).json("Find Error", error);
    });
};
