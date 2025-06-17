const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createUserGameValidations = [
  body('game')
    .notEmpty().withMessage('El ID del juego es obligatorio')
    .isInt().withMessage('Debe ser un ID válido'),

  body('status')
    .notEmpty().withMessage('El estado es obligatorio')
    .isIn(['finished', 'pending', 'playing', 'abandoned']).withMessage('Estado inválido'),

  body('review')
    .optional()
    .isString().withMessage('La reseña debe ser un string'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage('El rating debe estar entre 0 y 5'),

  validateResult
];

const updateUserGameValidations = [
  
  body('status')
    .optional()
    .isIn(['finished', 'pending', 'playing', 'abandoned']).withMessage('Estado inválido'),

  body('review')
    .optional()
    .isString().withMessage('La reseña debe ser un string'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage('El rating debe estar entre 0 y 5'),

  validateResult
];

const getUserGameValidations = [
  param('gameId')
    .notEmpty().withMessage('El ID es obligatorio')
    .isInt().withMessage('Debe ser un ID válido'),

  validateResult
];

const deleteUserGameValidations = [
  param('gameId')
    .notEmpty().withMessage('El ID es obligatorio')
    .isInt().withMessage('Debe ser un ID válido'),

  validateResult
];

module.exports = {
  createUserGameValidations,
  updateUserGameValidations,
  getUserGameValidations,
  deleteUserGameValidations
};
