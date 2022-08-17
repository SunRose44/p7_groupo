// Global imports
const express = require('express')
const router = express.Router()
// Middlewares
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const multer = require('../middleware/multer-config')
// Controllers
const adminController = require('../controllers/admin')

// Setup
router.delete('/:id', [auth, admin], adminController.deletePost)
router.put('/:id', [auth, admin], multer, adminController.updatePost)

// Export
module.exports = router
