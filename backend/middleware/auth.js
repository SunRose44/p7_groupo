// Module pour les tokens
//Modification de tous les messages des catch error
const jwt = require('jsonwebtoken');

// Vérification des tokens pour l'authentification
module.exports = (req, res, next) => {
    try {
        console.log("hello")
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch {
        res.status(401).json({ message: "Accès non autorisé" });
    }
};