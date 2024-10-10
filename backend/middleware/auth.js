// Import modules
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Check authentication token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userName = decodedToken.userName;
        if(userName && process.env.LOGNAME !== userName) {
            throw 'username incorrect !';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({erreur: "Action non autorisée !"});
    }
}