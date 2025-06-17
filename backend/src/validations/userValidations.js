const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const loginValidation = [
    body('email')
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('El email debe ser texto'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatorio')
        .isString()
        .withMessage('La contraseña debe ser texto')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateResult
];

const registerValidation = [
    body('email')
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Introduce un email válido'),
    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isString()
        .withMessage('Introduce un nombre válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatorio')
        .isString()
        .withMessage('La contraseña debe ser texto')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateResult
]

module.exports = { loginValidation, registerValidation }; 