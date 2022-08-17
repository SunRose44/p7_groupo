// Export
module.exports = (request, response, next) => {
	if (!request.user.roles.includes('administrator')) {
		return response.status(401).json({ message: 'Vous n\'êtes pas administrateur' })
	}

	next()
}