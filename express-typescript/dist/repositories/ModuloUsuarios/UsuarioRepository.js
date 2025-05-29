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
const config_db_1 = __importDefault(require("../../config/config-db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuarioRepository {
    static ActualizarContraseña(id, nuevaContraseña) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE users SET contraseña = ? WHERE id_usuario = ?';
            return yield config_db_1.default.execute(sql, [nuevaContraseña, id]);
        });
    }
    static verificarContraseña(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const sql = 'SELECT contraseña FROM users WHERE id_usuario = ?';
            const [rows] = yield config_db_1.default.execute(sql, [id]);
            console.log("Contraseña recuperada de la base de datos:", (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.contraseña); // Verifica el valor de la contraseña
            return (_b = rows[0]) === null || _b === void 0 ? void 0 : _b.contraseña; // Retorna la contraseña actual
        });
    }
    static ObtenerUsuarioPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT id_usuario, nombre, correo, resena, fecha_resena FROM users WHERE id_usuario = ?';
            const [rows] = yield config_db_1.default.execute(sql, [id]);
            return rows[0];
        });
    }
    static eliminarEmpleado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM users WHERE id_usuario = ?';
            yield config_db_1.default.execute(sql, [id]);
        });
    }
    static ActualizarEmpleado(usuario, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Datos recibidos en el update:", usuario, "ID:", id);
            const sql = `
          UPDATE users SET 
            nombre = ?,
            apellido = ?,
            telefono = ?,
            direccion = ?,
            correo = ?,
            rol = ?
          WHERE id_usuario = ?
        `;
            const values = [
                usuario.nombres,
                usuario.apellidos,
                usuario.telefono,
                usuario.direccion,
                usuario.correo,
                usuario.rol,
                id
            ];
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static EncontrarCorreo(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!correo) {
                throw new Error('El parámetro correo no puede ser null o undefined');
            }
            const sql = 'SELECT * FROM users WHERE correo = ? LIMIT 1';
            const [rows] = yield config_db_1.default.execute(sql, [correo]);
            if (!rows || rows.length === 0)
                return null;
            const usuario = rows[0];
            return {
                id: usuario.id_usuario,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                contraseña: usuario.contraseña,
            };
        });
    }
    static estaVerificado(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT verificado FROM users WHERE correo = ?';
            const values = [correo];
            try {
                const [result] = (yield config_db_1.default.execute(sql, values))[0];
                if (result && result.length > 0) {
                    return result[0].verificado === 1;
                }
                return false;
            }
            catch (error) {
                console.error('Error consultando la verificación:', error);
                throw new Error('No se pudo verificar el estado del usuario');
            }
        });
    }
    static addUser(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call Insertar_usuarios(?, ?, ?, ?, ?, ?, ?);';
            const values = [usuario.nombres, usuario.apellidos, usuario.telefono, usuario.direccion, usuario.correo, usuario.contraseña, usuario.rol];
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static loginUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT id_usuario, contraseña, rol FROM users WHERE correo=?;';
            const values = [auth.correo];
            try {
                const [result] = yield config_db_1.default.execute(sql, values);
                if (!auth.contraseña) {
                    return { logged: false, status: "Password is required" };
                }
                if (!result || result.length === 0 || !result[0]) {
                    console.log("Usuario no encontrado en la base de datos.");
                    return { logged: false, status: "Invalid username or password" };
                }
                if (!result[0].contraseña) {
                    console.log("Error: la contraseña en la base de datos es NULL o undefined.");
                    return { logged: false, status: "Invalid username or password" };
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(auth.contraseña, result[0].contraseña);
                if (isPasswordValid) {
                    return { logged: true, status: "Successful authentication", id: result[0].id_usuario, rol: result[0].rol };
                }
                return { logged: false, status: "Invalid username or password" };
            }
            catch (error) {
                console.error("Error during login:", error);
                return { logged: false, status: "Server error" };
            }
        });
    }
    static obtenerEmpleados() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('SELECT * FROM users WHERE rol = "vendedor" OR rol = "domiciliario"');
            console.log(rows);
            return rows;
        });
    }
    static obtenerInfoUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('CALL obtenerInfoUsuario(?)', [id]);
            return rows[0][0]; // El primer usuario que conicnida con este id
        });
    }
    static agregarResena(resena) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE users SET resena = ?, fecha_resena = ? WHERE id_usuario = ?';
            const values = [resena.resena, resena.fecha_resena, resena.id_usuario];
            yield config_db_1.default.execute(sql, values);
        });
    }
    static guardarPuntuacion(usuarioId, puntuacion) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Guardando puntuación:", usuarioId, puntuacion);
            const sql = 'CALL GuardarPuntuacion(?, ?)';
            console.log("SQL:", sql);
            const values = [usuarioId, puntuacion];
            console.log("Valores:", values);
            yield config_db_1.default.execute(sql, values);
            console.log("Puntuación guardada correctamente");
        });
    }
    static ObtenerTops() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'CALL TraerTops()';
            console.log("Ejecutando SQL para obtener tops:", sql);
            const [rows] = yield config_db_1.default.execute(sql);
            console.log("Tops obtenidos:", rows);
            return rows;
            console.log("Tops obtenidos correctamente");
        });
    }
    static editarResena(_a) {
        return __awaiter(this, arguments, void 0, function* ({ resena, fecha_resena, id_usuario }) {
            yield config_db_1.default.query(`UPDATE users SET resena = ?, fecha_resena = ? WHERE id_usuario = ?`, [resena, fecha_resena, id_usuario]);
        });
    }
    static eliminarResena(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_db_1.default.query(`UPDATE users SET resena = NULL, fecha_resena = NULL WHERE id_usuario = ?`, [id_usuario]);
        });
    }
    static obtenerTodasLasResenas() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('SELECT id_usuario, nombre, resena, fecha_resena FROM users WHERE resena IS NOT NULL');
            return rows;
        });
    }
}
exports.default = UsuarioRepository;
