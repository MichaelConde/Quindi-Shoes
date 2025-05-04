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
const UsuarioRepository_1 = __importDefault(require("../../repositories/ModuloUsuarios/UsuarioRepository"));
const generateHash_1 = __importDefault(require("../../Helpers/generateHash"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioService {
    static actualizarEmpleado(usuario, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UsuarioRepository_1.default.ActualizarEmpleado(usuario, id);
        });
    }
    static register(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!usuario.contraseña) {
                throw new Error("La contraseña es obligatoria para el registro.");
            }
            usuario.contraseña = yield (0, generateHash_1.default)(usuario.contraseña);
            console.log(usuario.contraseña);
            return yield UsuarioRepository_1.default.addUser(usuario);
        });
    }
    static login(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UsuarioRepository_1.default.loginUser(auth);
        });
    }
    static obtenerEmpleados() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UsuarioRepository_1.default.obtenerEmpleados();
        });
    }
    static eliminarEmpleado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UsuarioRepository_1.default.eliminarEmpleado(id);
        });
    }
    static verificarContrasenaActual(id, contraseñaActual) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ID recibido:", id);
            const contraseñaGuardada = yield UsuarioRepository_1.default.verificarContraseña(id);
            return yield bcryptjs_1.default.compare(contraseñaActual, contraseñaGuardada); // Compara con el hash guardado
        });
    }
    // Función para actualizar la contraseña
    static actualizarContraseña(id, nuevaContraseña) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield (0, generateHash_1.default)(nuevaContraseña); // Genera el hash para la nueva contraseña
            yield UsuarioRepository_1.default.ActualizarContraseña(id, hash); // Actualiza la contraseña en la base de datos
        });
    }
}
exports.default = UsuarioService;
