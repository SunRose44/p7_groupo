// Global imports
const express = require('express')
const router = express.Router()
// Middlewares
const auth = require('../middleware/auth')
const role = require('../middleware/role')
const multer = require('../middleware/multer-config')
// Controllers
const postController = require('../controllers/post')

// Setup
router.post('/', auth, multer, postController.createPost)
router.get('/:id', auth, postController.readPost)
router.get('/', auth, postController.readPosts)
router.put('/:id', auth, role, multer, postController.updatePost)
router.delete('/:id', auth, role, postController.deletePost)
router.put('/:id/like', auth, postController.likePost)

// Export
module.exports = router
