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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UsuarioRepository_1 = __importDefault(require("../repositories/ModuloUsuarios/UsuarioRepository"));
const CorreoService_1 = require("../services/ModuloUsuarios/CorreoService");
const recuperarContraseña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body;
    try {
        const usuario = yield UsuarioRepository_1.default.EncontrarCorreo(correo);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.KEY_TOKEN, { expiresIn: "15m" });
        yield (0, CorreoService_1.enviarCorreo)(correo, token);
        return res.status(200).json({ message: "Correo enviado con instrucciones" });
    }
    catch (error) {
        console.error("Error al recuperar contraseña:", error);
        return res.status(500).json({ error: "Error al enviar el correo" });
    }
});
exports.default = recuperarContraseña;
