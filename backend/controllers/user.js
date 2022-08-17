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

			await new User({
				email: request.body.email,
				password: hash
			}).save()

			return response.status(201).json({ message: 'Utilisateur créé !' })
		} catch (error) {
			console.log(error)
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
				)
			})
		} catch (error) {
			console.log(error)
			return response.status(500).json({ message: 'Requête erronée' })
		}
	}
}

module.exports = UserController



// // Mise en place des modules
// //Modification de tous les messages des catch error
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');



// // Création d'un nouveau utilisateur
// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = new User({
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//                 .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//                 .catch(() => res.status(400).json({ message: "Requête erronée" }));
//         })
//         .catch(() => res.status(500).json({ message: "Requête erronée" }));
// };

// // Connexion utilisateur
// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             if (!user) {
//                 return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ error: 'Mot de passe incorrect !' });
//                     }
//                     res.status(200).json({
//                         userId: user._id,
//                         token: jwt.sign({ userId: user._id },
//                             'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
//                         )
//                     });
//                 })
//                 .catch(() => res.status(500).json({ message: "Requête erronée" }));
//         })
//         .catch(() => res.status(500).json({ message: "Requête erronée" }));
// };