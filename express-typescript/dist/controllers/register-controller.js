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
exports.eliminarEmpleado = exports.obtenerEmpleados = exports.verificarEstadoCorreo = void 0;
const UserServices_1 = __importDefault(require("../services/ModuloUsuarios/UserServices"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidarCorreoService_1 = require("../services/ModuloUsuarios/ValidarCorreoService");
const generateHash_1 = __importDefault(require("../Helpers/generateHash"));
const UsuarioDto_1 = __importDefault(require("../Dto/UsuarioDto"));
const generateToken_1 = __importDefault(require("../Helpers/generateToken"));
// Registro de usuario: genera un JWT con todos los datos y envía enlace para confirmar
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombres, apellidos, telefono, direccion, correo, rol, contrasena } = req.body;
        console.log("Datos del formulario recibidos en backend:", req.body);
        // Verificar si el correo ya está registrado
        const usuario = yield UserServices_1.default.EncontrarCorreo(correo);
        if (usuario) {
            return res.status(400).json({ error: "El correo ya está registrado." });
        }
        // Crear el objeto de usuario para generar el token
        const payload = {
            nombres,
            apellidos,
            telefono,
            direccion,
            correo,
            rol,
            contrasena: yield (0, generateHash_1.default)(contrasena), // Hashear la contraseña
        };
        // Generar token con el payload
        const token = (0, generateToken_1.default)(payload, process.env.KEY_TOKEN, 60); // Token válido por 1h
        // Enviar el enlace de confirmación por correo
        const urlConfirm = `http://localhost:5173/esperando-confirmacion?token=${token}`;
        yield (0, ValidarCorreoService_1.ValidarCorreo)(correo, urlConfirm);
        // Responder con mensaje de éxito
        return res.status(201).json({
            message: "Registro iniciado. Revisa tu correo para confirmar tu cuenta.",
            token: token, // Enviar el token por si lo necesitas en el frontend
        });
    }
    catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).json({ error: "Error en el servidor al registrar el usuario." });
    }
});
// Confirmación de correo desde /confirmar-correo
const confirmarCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query; // El token se pasa por query en la URL
        console.log("Token recibido desde query:", token);
        // Verificar si el token no está presente
        if (!token) {
            return res.status(400).json({ error: "Token no proporcionado." });
        }
        // Decodificar el token y obtener el payload
        const payload = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        console.log("Payload decodificado:", payload);
        const { nombres, apellidos, telefono, direccion, correo, rol, contrasena } = payload;
        // Verificar si el usuario ya está registrado
        const usuarioExistente = yield UserServices_1.default.EncontrarCorreo(correo);
        if (usuarioExistente) {
            return res.status(400).json({ error: "Este correo ya fue confirmado anteriormente." });
        }
        // Crear el nuevo usuario y registrarlo
        const usuario = new UsuarioDto_1.default(nombres, apellidos, telefono, direccion, correo, rol, contrasena);
        console.log("Registrando usuario:", usuario);
        yield UserServices_1.default.register(usuario);
        // Responder con éxito al confirmar el correo
        return res.status(200).json({ message: "Correo confirmado con éxito." });
    }
    catch (error) {
        console.error("Error en confirmarCorreo:", error);
        return res.status(400).json({ error: "Token inválido o expirado." });
    }
});
// Verificar estado de correo
// Ruta para verificar el correo y registrar al usuario
const verificarEstadoCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ error: "Token no proporcionado." });
        }
        // Verificar y decodificar el token
        const payload = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        // Verificar si el usuario ya existe (solo se validará después de confirmar el correo)
        const usuarioExistente = yield UserServices_1.default.EncontrarCorreo(payload.correo);
        if (usuarioExistente) {
            return res.status(400).json({ error: "Este correo ya fue confirmado anteriormente." });
        }
        // Crear el nuevo usuario y registrarlo en la base de datos
        const usuario = new UsuarioDto_1.default(payload.nombres, payload.apellidos, payload.telefono, payload.direccion, payload.correo, payload.rol, payload.contrasena);
        // Registrar el usuario
        yield UserServices_1.default.register(usuario);
        return res.status(200).json({ message: "Correo confirmado con éxito. Usuario registrado." });
    }
    catch (error) {
        console.error("Error verificando el estado del correo:", error);
        return res.status(400).json({ error: "Token inválido o expirado." });
    }
});
exports.verificarEstadoCorreo = verificarEstadoCorreo;
// Obtener lista de empleados (esto no cambia)
const obtenerEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield UserServices_1.default.obtenerEmpleados();
        return res.status(200).json(empleados);
    }
    catch (error) {
        console.error("Error al obtener empleados:", error);
        return res.status(500).json({ error: "Error al obtener los empleados" });
    }
});
exports.obtenerEmpleados = obtenerEmpleados;
// Eliminar un empleado
const eliminarEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield UserServices_1.default.eliminarEmpleado(Number(id));
        return res.status(200).json({ message: "Usuario eliminado con éxito." });
    }
    catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ error: "Error al eliminar el usuario" });
    }
});
exports.eliminarEmpleado = eliminarEmpleado;
exports.default = {
    register,
    confirmarCorreo,
    verificarEstadoCorreo: exports.verificarEstadoCorreo,
};
