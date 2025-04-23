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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UsuarioRepository_1 = __importDefault(require("../repositories/ModuloUsuarios/UsuarioRepository"));
const reiniciarContraseña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, contraseña } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        const userId = decoded.id;
        const hash = yield bcryptjs_1.default.hash(contraseña, 10);
        yield UsuarioRepository_1.default.ActualizarContraseña(userId, hash);
        return res.status(200).json({ message: "Contraseña restablecida con éxito" });
    }
    catch (error) {
        return res.status(400).json({ error: "Token inválido o expirado" });
    }
});
exports.default = reiniciarContraseña;
