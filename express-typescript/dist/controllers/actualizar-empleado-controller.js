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
const UsuarioDto_1 = __importDefault(require("../Dto/UsuarioDto"));
const UserServices_1 = __importDefault(require("../services/ModuloUsuarios/UserServices"));
const actualizarEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombres, apellidos, telefono, direccion, correo, rol, record } = req.body;
        const usuario = new UsuarioDto_1.default(nombres !== null && nombres !== void 0 ? nombres : null, apellidos !== null && apellidos !== void 0 ? apellidos : null, telefono !== null && telefono !== void 0 ? telefono : null, direccion !== null && direccion !== void 0 ? direccion : null, correo !== null && correo !== void 0 ? correo : null, rol !== null && rol !== void 0 ? rol : null, record !== null && record !== void 0 ? record : null);
        yield UserServices_1.default.actualizarEmpleado(usuario, id);
        return res.status(200).json({ message: "Empleado actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar Empleado:", error);
        return res.status(500).json({ error: "Error al actualizar empleado" });
    }
});
exports.default = actualizarEmpleado;
