const express = require('express');
const { getProfile, updatePreferences, getChildren } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware, getProfile);
router.put('/:id/preferences', authMiddleware, updatePreferences);
router.get('/:id/children', authMiddleware, getChildren);

module.exports = router;
