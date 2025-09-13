const express = require('express');
const { createPost, getPosts, addReply } = require('../controllers/communityController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.post('/:id/reply', authMiddleware, addReply);

module.exports = router;
