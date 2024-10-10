const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.login = (req, res) => {  
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(500).json({message: "Données manquantes"})
  }

  models.User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }
    bcrypt.compare(password, user.password, (err,valid) => {
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
