"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.renovarTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const generateToken_1 = __importDefault(require("../Helpers/generateToken"));
dotenv_1.default.config();
const renovarTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token no proporcionado" });
        }
        const token = authHeader.split(" ")[1]; // Extraer el token del encabezado
        // Verificar el token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        // Generar un nuevo token
        const nuevoToken = (0, generateToken_1.default)({ id: decoded.id }, process.env.KEY_TOKEN, 5);
        // Configurar el nuevo token en el encabezado de respuesta
        res.setHeader("x-renewed-token", nuevoToken);
        console.log("Nuevo token generado:", nuevoToken);
        // Pasar a la siguiente función
        next();
    }
    catch (error) {
        console.error("Error al verificar o renovar token", error);
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};
exports.renovarTokenMiddleware = renovarTokenMiddleware;
// Middleware para verificar token
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extraer token del encabezado
    if (!token) {
        return res.status(401).send('Acceso no autorizado');
    }
    try {
        // Verificar el token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).send('Token inválido');
    }
};
exports.verifyToken = verifyToken;
