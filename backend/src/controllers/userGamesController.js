const { getUserGames, getUserGameById, updateUserGame, deleteUserGame, insertUserGame } = require('../services/userGameService');
const { createUserGameValidations, updateUserGameValidations,getUserGameValidations,deleteUserGameValidations } = require('../validations/userGameValidations'); 

const userGamesController = {
    getGames: [
        async (request, response) => {
            try {
                const userId = request.user.id;
                const data = await getUserGames(userId);
                response.status(200).json(data);
            } catch (error) {
                response.status(500).json({ error: 'Error al recoger los juegos de la BBDD' });
            }
        }
    ],
    getOneGame: [
        ...getUserGameValidations,
        async (request, response) => {
            try {
                const userId = request.user.id;
                const { gameId } = request.params;
                const data = await getUserGameById(userId, gameId);
                response.status(200).json(data);
            } catch (error) {
                response.status(500).json({ error: 'Error al recoger el juego de la BBDD' });
            }
        }
    ],
    createGame: [
        ...createUserGameValidations,
        async (request, response) => {
            try {
                const { game, status, review, rating, duration } = request.body;
                const user = request.user.id;
                const newGame = await insertUserGame({ user, game, status, review, rating, duration });
                response.status(201).json(newGame);
            } catch (error) {
                response.status(500).json({ error: 'Error al crear el juego', message: error.message });
            }
        }
    ],
    updateGame: [
        ...updateUserGameValidations,
        async (request, response) => {
            try {
                const userId = request.user.id;
                const { gameId } = request.params;
                const data = request.body;
                const updatedGame = await updateUserGame(userId, gameId, data);
                response.status(200).json(updatedGame);
            } catch (error) {
                response.status(500).json({ error: 'Error al actualizar juego' });
            }
        }
    ],
    deleteGame: [
        ...deleteUserGameValidations,
        async (request, response) => {
            try {
                const userId = request.user.id;
                const { gameId } = request.params;
                await deleteUserGame(userId, gameId);
                response.status(200).json({ mensaje: 'Juego eliminado' });
            } catch (error) {
                response.status(500).json({ error: 'Error al eliminar juego' });
            }
        }
    ]
};

module.exports = userGamesController; 