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
const obtenerInfoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No se proporcionó token válido" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        const idUsuario = decoded.data.id;
        const usuario = yield UserServices_1.default.obtenerInfoUsuario(idUsuario);
        // Aseguramos que se retorna solo una vez
        return res.status(200).json(usuario);
    }
    catch (error) {
        console.error("Error al obtener información del usuario:", error);
        // Nos aseguramos de usar `return` aquí también
        return res.status(400).json({ error: "Error al obtener información del usuario" });
    }
});
exports.default = obtenerInfoUsuario;
