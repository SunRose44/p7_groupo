// Global imports
const mongoose = require('mongoose')

// Setup
const postSchema = mongoose.Schema({
	userID: { type: String, required: true },
	imageURL: { type: String },
	content: { type: String, required: true },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	userLikes: [String],
	userDislikes: [String],
	creationDate: { type: Date, default: Date.now() }
})

// Export
module.exports = mongoose.model('Post', postSchema)
