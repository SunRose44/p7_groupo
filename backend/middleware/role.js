// Global imports
const jwt = require('jsonwebtoken')
const Post = require("../models/Post")
const User = require("../models/User")

// Export
module.exports = async (request, response, next) => {
	try {
		const post = await Post.findById(request.params.id)
		const user = await User.findById(request.auth.userID)

		// si l'user n'est pas le propriétaire du post et qu'il n'est pas admin alors error
		if (post.user.toString() !== request.auth.userID && !user.roles.includes('admin')) {
			return response.status(401).json({ message: 'Not authorized' })
		}
		next()
	} catch {
		response.status(401).send({ message: 'Accès non autorisé' })
	}
}
