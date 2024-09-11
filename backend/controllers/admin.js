const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.login = (req, res) => {  
  const email = req.body.email;
  const password = req.body.password; 

  models.User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Erreur d'authentification" });
    }
    bcrypt.compare(password, user.password, (err,valid) => {
      if (!valid) {
        
        return res.status(401).json({ message: "Erreur d'authentification" });
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
    })
  
  });
};


exports.checkToken = (req, res) => {
    const token = req.body.token
    if(token) {
      jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if(!err) {
          res.status(200).json({isConnected: true})
        } else {
          res.status(400).json({isConnected: false})
        }
      })
    }
}
