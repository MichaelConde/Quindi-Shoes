"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_1 = __importDefault(require("../services/ModuloUsuarios/UserServices"));
const CorreoService_1 = require("../services/ModuloUsuarios/CorreoService"); // Asegúrate de importar la función de envío de correo
const UsuarioDto_1 = __importDefault(require("../Dto/UsuarioDto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombres, apellidos, telefono, direccion, correo, rol, contraseña, } = req.body;
        const correoExistente = yield UserServices_1.default.EncontrarCorreo(correo);
        if (correoExistente) {
            return res.status(400).json({ error: "El correo ya está registrado." });
        }
        const nuevoUsuario = new UsuarioDto_1.default(nombres, apellidos, telefono, direccion, correo, rol, contraseña);
        const registerUser = yield UserServices_1.default.register(nuevoUsuario);
        const token = jsonwebtoken_1.default.sign({ id: registerUser.id }, process.env.KEY_TOKEN, { expiresIn: "15m" });
        yield (0, CorreoService_1.enviarCorreo)(correo, token);
        return res.status(201).json({
            message: "Usuario registrado con éxito. Se ha enviado un correo de verificación."
        });
    }
    catch (error) {
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage });
        }
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ error: "Error interno en el servidor" });
    }
});
exports.default = register;
