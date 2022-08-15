// New !
 const admin = require("../routes/admin");
 const Post = require('../models/Post');

// Modifier un post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    delete postObject._userId;
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId.admin != req.auth.userId.admin) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(() => res.status(401).json({ message: "Accès non autorisé" }));
            }
        })
        .catch(() => {
            res.status(400).json({ message: "Requête erronée" });
        });
};

// Supprimer un post 
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId.admin != req.auth.userId.admin) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = post.imageUrl.split('/images/')[1];
                Post.deleteOne({ _id: req.params.id })
                    .then(() => fs.unlinkSync(`images/${filename}`))
                    .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                    .catch(() => res.status(401).json({ message: "Accès non autorisé" }));
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Requête erronée" });
        });
};
