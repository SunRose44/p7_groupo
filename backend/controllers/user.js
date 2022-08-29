// Global imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Models
const User = require('../models/User')

// Setup
const UserController = {
	signup: async (request, response) => {
		try {
			const hash = await bcrypt.hash(request.body.password, 10)

			const user = await new User({
				email: request.body.email,
				password: hash
			}).save()

			return response.status(200).json({
				userID: user._id,
				token: jwt.sign({ userId: user._id },
					'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
				),
				roles: user.roles
			})
		} catch {
			return response.status(500).json({ message: 'Requête erronée' })
		}
	},
	login: async (request, response) => {
		try {
			const user = await User.findOne({ email: request.body.email })

			if (!user) {
				return response.status(401).json({ error: 'Utilisateur non trouvé !' })
			}

			const isValid = await bcrypt.compare(request.body.password, user.password)

			if (!isValid) {
				return response.status(401).json({ error: 'Mot de passe incorrect !' })
			}

			return response.status(200).json({
				userID: user._id,
				token: jwt.sign({ userId: user._id },
					'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
				),
				roles: user.roles
			})
		} catch {
			return response.status(500).json({ message: 'Requête erronée' })
		}
	}
}

module.exports = UserController


