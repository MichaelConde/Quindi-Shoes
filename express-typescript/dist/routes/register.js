"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_controller_1 = __importDefault(require("../controllers/register-controller")); // Importar el controlador completo
const Register_validator_1 = require("../middleware/Register-validator"); // Middleware para validar datos
const router = express_1.default.Router();
// Ruta para registrar un nuevo usuario
router.post('/', Register_validator_1.validatorParams, Register_validator_1.validator, register_controller_1.default.register);
// Ruta para confirmar el correo usando el token
router.get('/confirmar', register_controller_1.default.confirmarCorreo);
// Ruta para eliminar un empleado
exports.default = router;
