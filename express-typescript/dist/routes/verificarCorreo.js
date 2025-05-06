"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_controller_1 = require("../controllers/register-controller"); // Importamos la función del controlador
const router = express_1.default.Router();
// Ruta para verificar el correo
router.get('/verificar-correo', register_controller_1.verificarEstadoCorreo); // Llamamos a la función que verifica el correo
exports.default = router;
