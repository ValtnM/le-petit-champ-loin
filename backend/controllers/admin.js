const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).json({ message: "Données manquantes" });
  }

  models.User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }
    bcrypt.compare(password, user.password, (err, valid) => {
      if (!valid) {
        return res.status(401).json({ message: "Identifiants incorrects" });
      }
      res.status(200).json({
        token: jwt.sign(
          {
            userName: user,
          },
          process.env.TOKEN_KEY,
          { expiresIn: "4h" }
        ),
      });
    });
  });
};

exports.checkToken = (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (!err) {
        const isAdmin = decoded.userName.isAdmin;
        const userId = decoded.userName.id;
        
        res.status(200).json({ isConnected: true, userId, isAdmin });
      } else {
        res.status(400).json({ isConnected: false, isAdmin: false });
      }
    });
  }
};

exports.getAllElements = async (req, res) => {
  try {
    const Products = await models.Product.findAll();
    const activeProducts = await models.Product.findAll({
      where: { isActive: true },
    });
    const members = await models.User.findAll();
    const activeMembers = await models.User.findAll({
      where: { isActive: true },
    });
    const events = await models.Event.findAll();
    const activeEvents = await models.Event.findAll({
      where: { isActive: true },
    });
    const locations = await models.Location.findAll();
    const activeLocations = await models.Location.findAll({
      where: { isActive: true },
    });
    const suggestions = await models.Suggestion.findAll();
    const activeSuggestions = await models.Suggestion.findAll({
      where: { isActive: true },
    });
    const articles = await models.Article.findAll();
    const activeArticles = await models.Article.findAll({
      where: { isActive: true },
    });

    res.status(200).json({
      nbProducts: Products.length,
      nbActiveProducts: activeProducts.length,
      nbMembers: members.length,
      nbActiveMembers: activeMembers.length,
      nbEvents: events.length,
      nbActiveEvents: activeEvents.length,
      nbLocations: locations.length,
      nbActiveLocations: activeLocations.length,
      nbSuggestions: suggestions.length,
      nbActiveSuggestions: activeSuggestions.length,
      nbArticles: articles.length,
      nbActiveArticles: activeArticles.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
