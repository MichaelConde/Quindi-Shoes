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
    static EncontrarCorreo(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UsuarioRepository_1.default.EncontrarCorreo(correo);
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
            return yield bcryptjs_1.default.compare(contraseñaActual, contraseñaGuardada);
        });
    }
    static actualizarContraseña(id, nuevaContraseña) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield (0, generateHash_1.default)(nuevaContraseña);
            yield UsuarioRepository_1.default.ActualizarContraseña(id, hash);
        });
    }
    static verificarUsuario(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verificado = yield UsuarioRepository_1.default.estaVerificado(correo);
                if (verificado) {
                    return 'El usuario está verificado.';
                }
                else {
                    return 'El usuario no está verificado. Revisa tu correo para confirmar tu cuenta.';
                }
            }
            catch (error) {
                console.error('Error en la verificación del usuario:', error);
                throw new Error('Hubo un problema al verificar el estado del usuario.');
            }
        });
    }
    static crearUsuarioTemporal(_a) {
        return __awaiter(this, arguments, void 0, function* ({ correo, contraseña, nombres, apellidos, telefono, direccion, tokenVerificacion, }) {
            const contraseñaHasheada = yield (0, generateHash_1.default)(contraseña); // Cifrar la contraseña antes de guardarla
            const nuevoUsuarioTemporal = {
                correo,
                contraseña: contraseñaHasheada,
                nombres,
                apellidos,
                telefono,
                direccion,
                tokenVerificacion,
                estado: "pendiente",
            };
            // Aquí podrías llamar a un repositorio si estás guardando en base de datos
            // return await UsuarioRepository.agregarUsuarioTemporal(nuevoUsuarioTemporal);
            console.log("Usuario temporal creado:", nuevoUsuarioTemporal);
        });
    }
}
exports.default = UsuarioService;
