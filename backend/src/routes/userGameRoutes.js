const express = require('express');
const userGamesController = require('../controllers/userGamesController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');

router.get('/:gameId', authMiddleware, userGamesController.getOneGame);

router.get('/', authMiddleware, userGamesController.getGames);

router.post('/', authMiddleware, userGamesController.createGame);

router.put('/:gameId', authMiddleware, userGamesController.updateGame);

router.delete('/:gameId', authMiddleware, userGamesController.deleteGame);

module.exports = router; 