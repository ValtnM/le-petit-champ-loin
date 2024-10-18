const models = require("../models");
const nodemailer = require("nodemailer");



// Send an email
exports.sendEmail = (req, res) => {
  const mailInfos = {
    from: `${req.body.firstname} ${req.body.lastname} <valentin.monteiro@3wa.io>`,
    to: "valentin.monteiro@3wa.io",
    subject: req.body.subject,
    text: req.body.message,
    replyTo: req.body.email,
  };

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Verify the transporter
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  // Send email
  const sendingMail = (mailInfos) => {
    if (!req.body.gender) {
      res.status(400).json({ error: "Veuillez indiquer une civilité" });
    } else if (!req.body.firstname) {
      res.status(400).json({ error: "Veuillez saisir un prénom" });
    } else if (!req.body.lastname) {
      res.status(400).json({ error: "Veuillez saisir un nom" });
    } else if (!req.body.email) {
      res.status(400).json({ error: "Veuillez saisir un email valide" });
    } else if (!req.body.subject) {
      res.status(400).json({ error: "Aucun objet n'a été saisi" });
    } else if (!req.body.message) {
      res.status(400).json({ error: "Aucun message n'a été saisi" });
    } else {
      transporter.sendMail(mailInfos, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: "Échec de l'envoi" });
        } else {
          res.status(200).json({ success: "Message envoyé avec succès" });
        }
      });
    }
  };

  sendingMail(mailInfos);

};


