//Modules 
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Shema Users
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    NEW !
    isAdmin: { Boolean },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);