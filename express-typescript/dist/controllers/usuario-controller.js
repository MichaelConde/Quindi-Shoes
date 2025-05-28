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
exports.obtenerUsuarioPorId = void 0;
const UsuarioRepository_1 = __importDefault(require("../repositories/ModuloUsuarios/UsuarioRepository"));
const obtenerUsuarioPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (!id)
            return res.status(400).json({ mensaje: "ID inválido" });
        const usuario = yield UsuarioRepository_1.default.ObtenerUsuarioPorId(id);
        if (!usuario)
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" });
    }
});
exports.obtenerUsuarioPorId = obtenerUsuarioPorId;
