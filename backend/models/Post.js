// Global imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Setup
const postSchema = mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	imageURL: { type: String },
	content: { type: String, required: true },
	likes: { type: Number, default: 0 },
	userLikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	creationDate: { type: Date, default: Date.now }
})

// Export
module.exports = mongoose.model('Post', postSchema)
