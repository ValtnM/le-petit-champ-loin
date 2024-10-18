const models = require("../models");
const { validationResult } = require("express-validator");

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

// Get visibles events
exports.getActives = (req, res) => {
  models.Event.findAll({
    where: { isActive: true },
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

// Get event details
exports.getEventDetails = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(500).json({ message: "Id manquant" });
  }

  models.Event.findOne({
    where: { id: id },
    include: [
      {
        model: models.User,
        as: "EventUsers",
        attributes: ["id", "name", "email", "photo"],
        through: {
          attributes: ["id"],
        },
      },
    ],
  })
    .then((event) => {
      if (event) {
        console.log(event);

        return res.status(200).json(event);
      } else {
        return res.status(404).json({ message: "Aucun événement trouvé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

// Add a new event
exports.addEvent = async (req, res) => {
  const { title, date, schedule, location, isActive, userId, memberList } =
    req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (
    !title ||
    !date ||
    !schedule ||
    !location ||
    !memberList ||
    isActive === undefined
  ) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  models.Event.create({
    title,
    date,
    schedule,
    location,
    isActive,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((event) => {
      if (!event) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la création de l'événement" });
      }

      const eventId = event.dataValues.id;
      let eventUsers = [];
      memberList.forEach((member) => {
        eventUsers.push({ user_id: member.id, event_id: eventId });
      });

      models.EventUser.bulkCreate(eventUsers)
        .then(() => res.status(200).json({ success: "Événement créé" }))
        .catch(() =>
          res.status(500).json({ error: "Création de l'événement impossible" })
        );
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

  console.log(req.body);

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
  const { id, title, date, schedule, location, isActive } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (
    !id ||
    !title ||
    !date ||
    !schedule ||
    !location ||
    isActive === undefined
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
            isActive,
            updatedAt: new Date(),
          },
          {
            where: { id: id },
          }
        )
          .then(() => {
            return res.status(200).json({ success: "Événement modifié" });
          })
          .catch(() =>
            res.status(500).json({ error: "La modification a échouée" })
          );
      } else {
        return res.status(404).json({ message: "Aucun événement trouvé" });
      }
    })
    .catch(() => res.status(500).json(err));
};
