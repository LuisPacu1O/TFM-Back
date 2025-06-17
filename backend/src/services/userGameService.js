const UserGame = require('../models/userGamesModel');

async function insertUserGame(gameData) {
    try {
        const game = new UserGame(gameData);
        const res = await game.save();
        console.log('Juego insertado: ', res);
        return res;
    } catch (error) {
        console.error('Error al insertar el juego: ', error);
        throw error;
    }
}

async function getUserGames(userId) {
    try {
        const games = await UserGame.find({ user: userId }).populate('game');
        return games;
    } catch (err) {
        console.error('Error al obtener los juegos: ', err);
        throw err;
    }
}

async function getUserGameById(userId, gameId) {
    try {
        const game = await UserGame.findOne({ game: gameId, user: userId }).populate('game');
        return game;
    } catch (err) {
        console.error('Error al encontrar el juego: ', err);
        throw err;
    }
}

async function deleteUserGame(userId, gameId) {
    try {
        const game = await UserGame.findOneAndDelete({ game: gameId, user: userId });
        return game;
    } catch (err) {
        console.error('Error al eliminar el juego: ', err);
        throw err;
    }
}

async function updateUserGame(userId, gameId, data) {
    try {
        const updated = await UserGame.findOneAndUpdate(
            { game: gameId, user: userId },
            data,
            { new: true }
        );
        return updated;
    } catch (err) {
        console.error('Error al actualizar el juego: ', err);
        throw err;
    }
}

module.exports = {
    getUserGames,
    getUserGameById,
    updateUserGame,
    deleteUserGame,
    insertUserGame
};
