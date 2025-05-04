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
const UserServices_1 = __importDefault(require("../services/ModuloUsuarios/UserServices"));
const cambiarContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entrando a cambiar contraseña");
    const authHeader = req.headers.authorization;
    console.log("Header de autorización:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No se proporcionó token válido" });
    }
    const token = authHeader.split(" ")[1];
    const { contraseñaActual, nuevaContraseña } = req.body;
    console.log("Body recibido:", req.body);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        console.log("Token decodificado:", decoded);
        const userId = decoded.data.id;
        console.log("ID de usuario decodificado:", userId);
        console.log("Verificando contraseña actual...");
        const contraseñaValida = yield UserServices_1.default.verificarContrasenaActual(userId, contraseñaActual);
        console.log("¿Contraseña válida?:", contraseñaValida);
        if (!contraseñaValida) {
            return res.status(401).json({ error: "La contraseña actual es incorrecta" });
        }
        yield UserServices_1.default.actualizarContraseña(userId, nuevaContraseña);
        return res.status(200).json({ message: "Contraseña actualizada con éxito" });
    }
    catch (error) {
        return res.status(400).json({ error: "Token inválido o expirado" });
    }
});
exports.default = cambiarContrasena;
