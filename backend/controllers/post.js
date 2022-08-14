// Mise en place des modules

const Post = require('../models/Post');
const fs = require('fs');

// Création d'un post
exports.createPost = (req, res) => {
    const post = new Post({
        ...req.body,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    post.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(() => { res.status(400).json({ message: "Requête erronée" }) })
};

// Obtenir un post
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        () => {
            res.status(404).json({
                message: "Page non trouvée"
            });
        }
    );
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    delete postObject._userId;
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
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
            if (post.userId != req.auth.userId) {
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

// Obtenir tous les posts
exports.getAllPost = (req, res, next) => {
    Post.find().then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        () => {
            res.status(400).json({
                message: "Requête erronée"
            });
        }
    );
};


//Liker ou disliker un post
exports.likePost = (req, res, next) => {
    console.log(req.body)
    if (req.body.like === 1) {
        Post.findOne({ _id: req.params.id })
            .then(post => {
                post.usersLiked.push(req.body.userId)
                return Post.updateOne({ _id: req.params.id }, { likes: post.likes + 1, usersLiked: post.usersLiked })
            })
            .then((post) => {
                res.status(200).json(post)
            })
            .catch(() => {
                res.status(400).json({
                    message: "Requête erronée"
                })
            })
    }
    if (req.body.like === -1) {
        Post.findOne({ _id: req.params.id })
            .then(post => {
                post.usersDisliked.push(req.body.userId)
                Post.updateOne({ _id: req.params.id }, { dislikes: post.dislikes + 1, usersDisliked: post.usersDisliked }) // update la post en BDD
            })
            .then((post) => {
                res.status(200).json(post)
            })
            .catch(() => {
                res.status(400).json({
                    message: "Requête erronée"
                })
            })
    }
    if (req.body.like === 0) {
        Post.findOne({ _id: req.params.id })
            .then(post => {
                if (post.usersLiked.includes(req.body.userId)) {
                    const index = post.usersLiked.indexOf(req.body.userId)
                    post.usersLiked.splice(index, 1)
                    Post.updateOne({ _id: req.params.id }, { likes: post.likes - 1, usersLiked: post.usersLiked })
                }
                if (post.usersDisliked.includes(req.body.userId)) {
                    const index = post.usersDisliked.indexOf(req.body.userId)
                    post.usersDisliked.splice(index, 1)
                    Post.updateOne({ _id: req.params.id }, { likes: post.dislikes - 1, usersLiked: post.usersDisliked })
                }
            })
            .then((Post) => {
                res.status(200).json(post)
            })
            .catch(() => {
                res.status(400).json({
                    message: "Requête erronée"
                })
            })
    }
};