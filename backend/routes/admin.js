// NEW !

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.delete('/:id', [auth, admin], postCtrl.deletePost);
router.put('/:id', [auth, admin], multer, postCtrl.modifyPost);


module.exports = router;