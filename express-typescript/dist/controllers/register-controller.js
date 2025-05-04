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
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombres, apellidos, telefono, direccion, correo, rol, contraseña, } = req.body;
        const registerUser = yield UserServices_1.default.register(new UsuarioDto_1.default(nombres, apellidos, telefono, direccion, correo, rol, contraseña));
        return res.status(201).json({ registerUser, message: "Usuario registrado con éxito" });
    }
    catch (error) {
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage });
        }
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
