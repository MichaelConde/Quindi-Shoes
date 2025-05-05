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
exports.eliminarEmpleado = exports.obtenerEmpleados = void 0;
const UserServices_1 = __importDefault(require("../services/ModuloUsuarios/UserServices"));
const UsuarioDto_1 = __importDefault(require("../Dto/UsuarioDto"));
const ValidarCorreoService_1 = require("../services/ModuloUsuarios/ValidarCorreoService"); // Asegúrate de que la función de envío de correo esté bien implementada
const generateToken_1 = __importDefault(require("../Helpers/generateToken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombres, apellidos, telefono, direccion, correo, rol, contraseña, } = req.body;
        // Validar si el correo ya existe
        const usuarioExistente = yield UserServices_1.default.EncontrarCorreo(correo);
        if (usuarioExistente) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }
        // Crear usuario
        const nuevoUsuario = new UsuarioDto_1.default(nombres, apellidos, telefono, direccion, correo, rol, contraseña);
        const usuarioRegistrado = yield UserServices_1.default.register(nuevoUsuario);
        const token = (0, generateToken_1.default)({ correo }, process.env.KEY_TOKEN, 15);
        yield (0, ValidarCorreoService_1.ValidarCorreo)(correo, token);
        return res.status(201).json({
            message: "Usuario registrado con éxito. Verifica tu correo electrónico.",
            usuario: usuarioRegistrado,
        });
    }
    catch (error) {
        console.error("Error en el registro:", error);
        if (error.code === "ER_DUP_ENTRY") {
            return res
                .status(409)
                .json({ error: "Ya existe un usuario con ese correo" });
        }
        return res.status(500).json({ error: "Error en el servidor" });
    }
});
const obtenerEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield UserServices_1.default.obtenerEmpleados();
        res.json(empleados);
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});
exports.obtenerEmpleados = obtenerEmpleados;
const eliminarEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield UserServices_1.default.eliminarEmpleado(Number(id));
        res.status(200).json({ message: "Producto eliminado con éxito" });
    }
    catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});
exports.eliminarEmpleado = eliminarEmpleado;
exports.default = register;
