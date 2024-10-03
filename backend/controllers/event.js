const models = require("../models");

// Get all events
exports.getAll = (req, res) => {
  models.Event.findAll({
    include: [
      {
        model: models.User,
        as: "EventUsers",
        attributes: ["id", "name", "email", "photo"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((events) => {
      if (!events) {
        return res.status(404).json({ message: "Aucun événement trouvé" });
      }

      return res.status(200).json(events);
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new event
exports.addEvent = async (req, res) => {
  const { title, date, schedule, location, isVisible, userId } = req.body;

  if (
    !title ||
    !date ||
    !schedule ||
    !location ||
    !userId ||
    isVisible === undefined
  ) {
    return res.status(500).json({ message: "Données manquantes" });
  }
  const event = await models.Event.create({
    title,
    date,
    schedule,
    location,
    isVisible,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await event
    .addEventUsers(userId)
    .then((event) => {
      if (!event) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la création de l'événement" });
      }
      return res.status(200).json({ message: "Événement créé" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

// Delete an event
exports.deleteEvent = (req, res) => {
  const eventId = req.body.id;

  if (!eventId) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }
  models.Event.findOne({ where: { id: eventId } })
    .then((event) => {
      if (event) {
        models.Event.destroy({ where: { id: eventId } })
          .then(() => {
            return res.status(200).json({ message: "Événement supprimé" });
          })
          .catch((err) => res.status(500).json(err));
      } else {
        return res.status(404).json({ message: "Aucun événement trouvé" });
      }
    })
    .catch(() => res.status(500).json(err));
};

// Add an user
exports.addUser = (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  models.Event.findOne({ where: { id: eventId } })
    .then((event) => {
      if (event) {
        models.User.findOne({ where: { id: userId } })
          .then((user) => {
            if (user) {
              models.EventUser.findOne({
                where: { user_id: user.id, event_id: event.id },
              })
                .then((eventUser) => {
                  if (eventUser) {
                    return res.status(400).json({
                      message:
                        "L'utilisateur est déja présent sur cette événement",
                    });
                  } else {
                    models.EventUser.create({
                      user_id: user.id,
                      event_id: event.id,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    })
                      .then(() =>
                        res
                          .status(200)
                          .json({ message: "Utilisateur ajouté à l'événement" })
                      )
                      .catch((err) => res.status(500).json(err));
                  }
                })
                .catch((err) => res.status(500).json(err));
            } else {
              return res
                .status(404)
                .json({ message: "Aucun utilisateur trouvé" });
            }
          })
          .catch(() => res.status(500).json(err));
      } else {
        return res.status(404).json({ message: "Aucun événement trouvé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Delete an user
exports.deleteUser = (req, res) => {
  const eventUserId = req.body.id;

  if (!eventUserId) {
    return res.status(500).json({ message: "Aucun id trouvé" });
  }

  models.EventUser.findOne({ where: { id: eventUserId } })
    .then((eventUser) => {
      if (eventUser) {
        models.EventUser.destroy({ where: { id: eventUserId } })
          .then(() => {
            return res.status(200).json({ message: "Utilisateur supprimé" });
          })
          .catch((err) => res.status(500).json(err));
      } else {
        return res
          .status(404)
          .json({ message: "Utilisateur non trouvé sur cet événement" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Modify an event
exports.modifyEvent = async (req, res) => {
  const { id, title, date, schedule, location, isVisible } = req.body;

  if (
    !id ||
    !title ||
    !date ||
    !schedule ||
    !location ||
    isVisible === undefined
  ) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  models.Event.findOne({ where: { id: id } })
    .then((event) => {
      if (event) {
        models.Event.update(
          {
            title,
            date,
            schedule,
            location,
            isVisible,
            updatedAt: new Date(),
          },
          {
            where: { id: id },
          }
        )
          .then(() => {
            return res.status(200).json({ message: "Événement modifié" });
          })
          .catch((err) => res.status(500).json(err));
      } else {
        return res.status(404).json({ message: "Aucun événement trouvé" });
      }
    })
    .catch(() => res.status(500).json(err));
};
