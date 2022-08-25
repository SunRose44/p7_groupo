// Global imports
const fs = require('fs')
// Models
const Post = require('../models/Post')

// Setup
const PostController = {
	createPost: async (request, response) => {
		try {
			const imageURL = request.file
				? `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
				: null

			const post = await new Post({
				...request.body,
				user: request.auth.userID,
				imageURL
			}).save()

			return response.status(201).json({ message: 'Objet enregistré !' })
		} catch {
			return response.status(400).json({ message: 'Requête erronée' })
		}
	},
	readPost: async (request, response) => {
		try {
			const post = await Post.findById(request.params.id)

			return response.status(200).json(post)
		} catch {
			return response.status(404).json({ message: 'Page non trouvée' })
		}
	},
	readPosts: async (request, response) => {
		try {
			const posts = await Post.find().populate('user')
			const securePosts = posts.map((post) => ({
				...post.toObject(), user: { email: post.user.email, userID: post.user._id }
			}))

			return response.status(200).json(securePosts)
		} catch {
			response.status(400).json({ message: 'Requête erronée' })
		}
	},
	updatePost:  async (request, response) => {
		try {
			const post = {
				...request.body,
				imageURL:
					request.file
						? `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
						: (request.body.imageURL || null)
			}
			const finded = await Post.findById(request.params.id).populate('user')

			await Post.findByIdAndUpdate(request.params.id, post)

			if ((request.file && finded.imageURL) || (!request.body.imageURL && finded.imageURL)) {
				const filename = finded.imageURL.split('/images/')[1]
				fs.unlinkSync(`images/${filename}`)
			}

			return response.status(200).json({ message: 'Objet modifié!' })
		} catch {
			return response.status(400).json({ message: 'Requête erronée' })
		}
	},
	deletePost: async (request, response) => {
		try {
			const post = await Post.findById(request.params.id)

			await Post.findByIdAndDelete(request.params.id)

			if (post.imageURL) {
				const filename = post.imageURL.split('/images/')[1]
				fs.unlinkSync(`images/${filename}`)
			}

			return response.status(200).json({ message: 'Objet supprimé !' })
		} catch {
			response.status(400).json({ message: 'Requête erronée' })
		}
	},
	likePost: async (request, response) => {
		try {
			const post = await Post.findById(request.params.id)
			const { userID } = request.auth

			if (request.body.isLiked) {
				// si l'user a déjà liké, il peut pas reliker
				if (post.userLikes.includes(userID)) {
					return response.status(401).json({ message: 'Not authorized' })
				}

				post.userLikes.push(userID)
				post.likes = post.likes + 1

				const updated = await Post.findByIdAndUpdate(request.params.id, post, { new: true })

				return response.status(200).json(updated)
			} else {
				// si l'user n'a pas déjà liké, il peut pas retirer son like
				if (!post.userLikes.includes(userID)) {
					return response.status(401).json({ message: 'Not authorized' })
				}
				const index = post.userLikes.indexOf(userID)

				post.userLikes.splice(index, 1)
				post.likes = post.likes - 1

				const updated = await Post.findByIdAndUpdate(request.params.id, post, { new: true })

				return response.status(200).json(updated)
			}
		} catch {
			response.status(400).json({ message: 'Requête erronée' })
		}
	}
}

module.exports = PostController





// // Mise en place des modules

// const Post = require('../models/Post');
// const fs = require('fs');

// // Création d'un post
// exports.createPost = (req, res) => {
//     const post = new Post({
//         ...req.body,
//         userId: req.auth.userId,
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     });

//     post.save()
//         .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
//         .catch(() => { res.status(400).json({ message: "Requête erronée" }) })
// };

// // Obtenir un post
// exports.getOnePost = (req, res, next) => {
//     Post.findOne({
//         _id: req.params.id
//     }).then(
//         (post) => {
//             res.status(200).json(post);
//         }
//     ).catch(
//         () => {
//             res.status(404).json({
//                 message: "Page non trouvée"
//             });
//         }
//     );
// };

// // Modifier un post
// exports.modifyPost = (req, res, next) => {
//     const postObject = req.file ? {
//         ...JSON.parse(req.body.post),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : {...req.body };

//     delete postObject._userId;
//     Post.findOne({ _id: req.params.id })
//         .then((post) => {
//             if (post.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
//                     .then(() => res.status(200).json({ message: 'Objet modifié!' }))
//                     .catch(() => res.status(401).json({ message: "Accès non autorisé" }));
//             }
//         })
//         .catch(() => {
//             res.status(400).json({ message: "Requête erronée" });
//         });
// };

// // Supprimer un post
// exports.deletePost = (req, res, next) => {
//     Post.findOne({ _id: req.params.id })
//         .then(post => {
//             if (post.userId != req.auth.userId) {
//                 res.status(401).json({ message: 'Not authorized' });
//             } else {
//                 const filename = post.imageUrl.split('/images/')[1];
//                 Post.deleteOne({ _id: req.params.id })
//                     .then(() => fs.unlinkSync(`images/${filename}`))
//                     .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
//                     .catch(() => res.status(401).json({ message: "Accès non autorisé" }));
//             }
//         })
//         .catch(() => {
//             res.status(500).json({ message: "Requête erronée" });
//         });
// };

// // Obtenir tous les posts
// exports.getAllPost = (req, res, next) => {
//     Post.find().then(
//         (posts) => {
//             res.status(200).json(posts);
//         }
//     ).catch(
//         () => {
//             res.status(400).json({
//                 message: "Requête erronée"
//             });
//         }
//     );
// };


// //Liker ou disliker un post
// exports.likePost = (req, res, next) => {
//     console.log(req.body)
//     if (req.body.like === 1) {
//         Post.findOne({ _id: req.params.id })
//             .then(post => {
//                 post.usersLiked.push(req.body.userId)
//                 return Post.updateOne({ _id: req.params.id }, { likes: post.likes + 1, usersLiked: post.usersLiked })
//             })
//             .then((post) => {
//                 res.status(200).json(post)
//             })
//             .catch(() => {
//                 res.status(400).json({
//                     message: "Requête erronée"
//                 })
//             })
//     }
//     if (req.body.like === -1) {
//         Post.findOne({ _id: req.params.id })
//             .then(post => {
//                 post.usersDisliked.push(req.body.userId)
//                 Post.updateOne({ _id: req.params.id }, { dislikes: post.dislikes + 1, usersDisliked: post.usersDisliked }) // update la post en BDD
//             })
//             .then((post) => {
//                 res.status(200).json(post)
//             })
//             .catch(() => {
//                 res.status(400).json({
//                     message: "Requête erronée"
//                 })
//             })
//     }
//     if (req.body.like === 0) {
//         Post.findOne({ _id: req.params.id })
//             .then(post => {
//                 if (post.usersLiked.includes(req.body.userId)) {
//                     const index = post.usersLiked.indexOf(req.body.userId)
//                     post.usersLiked.splice(index, 1)
//                     Post.updateOne({ _id: req.params.id }, { likes: post.likes - 1, usersLiked: post.usersLiked })
//                 }
//                 if (post.usersDisliked.includes(req.body.userId)) {
//                     const index = post.usersDisliked.indexOf(req.body.userId)
//                     post.usersDisliked.splice(index, 1)
//                     Post.updateOne({ _id: req.params.id }, { likes: post.dislikes - 1, usersLiked: post.usersDisliked })
//                 }
//             })
//             .then((Post) => {
//                 res.status(200).json(post)
//             })
//             .catch(() => {
//                 res.status(400).json({
//                     message: "Requête erronée"
//                 })
//             })
//     }
// };