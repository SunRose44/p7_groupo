// Global imports
const fs = require('fs')
// Models
const Post = require('../models/Post')

// Setup
const PostController = {
	createPost: async (request, response) => {
		try {
			//Si user télécharge une image
			const imageURL = request.file
				? `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
				: null
			// save new post
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
			//sélection du post et des info user
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
			// Si user à téléchargé un fichier
			const post = {
				...request.body,
				imageURL:
					request.file
					// je remplace l'image sinon = null
						? `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
						: (request.body.imageURL || null)
			}
			const finded = await Post.findById(request.params.id).populate('user')

			await Post.findByIdAndUpdate(request.params.id, post)
			// Si user à téléchargé une nouvelle image ou/et suppression sans nouvelle image
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





