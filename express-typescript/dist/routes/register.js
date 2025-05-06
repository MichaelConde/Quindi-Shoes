"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_controller_1 = __importDefault(require("../controllers/register-controller")); // Importar el controlador completo
const router = express_1.default.Router();
// Ruta para registrar un nuevo usuario
router.post('/', register_controller_1.default.register);
// Ruta para confirmar el correo usando el token
router.get('/confirmar', register_controller_1.default.confirmarCorreo); // Esta ruta ya está correcta, pero revisaremos la lógica en el controlador
// Ruta para eliminar un empleado
// router.delete('/empleado/:id', empleadoController.eliminarEmpleado);
exports.default = router;
