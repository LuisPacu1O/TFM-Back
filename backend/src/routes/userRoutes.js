const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/send-email', userController.sendEmail);
router.post('/logout', userController.logout);
router.get('/verify', userController.verify);
router.post('/avatar',authMiddleware, userController.avatar );

module.exports = router;
