// NEW !

module.exports = (req, res, next) => {
    if (!req.user.isAdmin) {

        return res.status(401).json({ message: "Vous n'êtes pas administrateur" });
    }
    next();
};