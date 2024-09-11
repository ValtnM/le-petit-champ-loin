const models = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Connection en tant qu'administrateur
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log("EMAIL: ", email);
  console.log("PASSWORD: ", password);

  models.User.findOne({where: {email: email}})
  .then(user => {
    if(!user) {
        return res.status(401).json({message: "Erreur d'authentification"})
    }
    bcrypt.compare(password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({message: "Erreur d'authentification"})
            }
            res.status(200).json({
                token: jwt.sign(
                {
                    userName: user,                    
                }, 
                process.env.TOKEN_KEY,
                { expiresIn: '4h' }        
                )
            })
        })
    })

  }

  