// Global imports
const jwt = require('jsonwebtoken')

// Export
module.exports = (request, response, next) => {
	try {
		const token = request.headers.authorization.split(' ')[1]
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')

		request.auth = { userID: decodedToken.userId }
		next()
	} catch {
		response.status(401).send({ message: 'Accès non autorisé' })
	}
}