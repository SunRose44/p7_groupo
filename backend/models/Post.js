// Global imports
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Setup
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	roles: { type: Array, default: ['user'] }
})

userSchema.plugin(uniqueValidator)

// Export
module.exports = mongoose.model('User', userSchema)
