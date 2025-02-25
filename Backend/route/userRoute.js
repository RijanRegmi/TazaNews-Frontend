const express = require('express');
const { signup, login, dashboard } = require('../controller/userController.js');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/dashboard', verifyToken, dashboard);

module.exports = router;
