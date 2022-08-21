// Global imports
const express = require('express')
// Controllers
const userController = require('../controllers/user')

// Setup
const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)

// Export
module.exports = router
