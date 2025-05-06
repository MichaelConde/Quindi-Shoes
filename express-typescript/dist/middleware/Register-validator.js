"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorParams = void 0;
exports.validator = validator;
const express_validator_1 = require("express-validator");
exports.validatorParams = [
    (0, express_validator_1.check)('correo').isEmail().withMessage('Debe ser un correo válido'),
    (0, express_validator_1.check)('contrasena').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    (0, express_validator_1.check)('nombres').isLength({ min: 1, max: 255 }),
    (0, express_validator_1.check)('direccion').isLength({ min: 1, max: 255 }),
    (0, express_validator_1.check)('telefono').isLength({ min: 1, max: 255 }),
    (0, express_validator_1.check)('apellidos').isLength({ min: 1, max: 255 })
];
function validator(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log("Errores de validación:", errors.array());
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
