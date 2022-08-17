// Global imports
const express = require('express')
const router = express.Router()
// Controllers
const userController = require('../controllers/user')

// Setup
router.post('/signup', userController.signup)
router.post('/login', userController.login)

// Export
module.exports = router
