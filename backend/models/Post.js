//Module 
const mongoose = require('mongoose');

// Schema Post
const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    imageUrl: { type: String },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: [String],
    usersDisliked: [String]
});

module.exports = mongoose.model('Post', postSchema);