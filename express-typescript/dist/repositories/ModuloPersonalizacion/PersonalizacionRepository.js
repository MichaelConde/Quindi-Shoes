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
class PersonalizacionRepository {
    // Materiales
    static addMateriales(materiales) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call InsertarMaterial(?);';
            const values = [materiales.nombre_material];
            return config_db_1.default.execute(sql, values);
        });
    }
    static ActualizarMaterial(material, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Datos recibidos en el update:", material, "ID", id);
            const sql = `
          call ActualizarMaterial(?,?);
        `;
            const values = [
                material.nombre_material,
                id
            ];
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static obtenerMaterial() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('SELECT * FROM materiales');
            console.log(rows);
            return rows;
        });
    }
    static deleteMateriales(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call EliminarMaterial(?);';
            yield config_db_1.default.execute(sql, [id]);
        });
    }
    // Colores
    static addColores(colores) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call InsertarColor(?, ?);';
            const values = [colores.nombreColor, colores.codigoHax];
            return config_db_1.default.execute(sql, values);
        });
    }
    static ActualizarColor(color, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Datos recibidos en el update:", "ID:", id, color);
            const sql = `
          call ActualizarColor(?,?);
        `;
            const values = [
                color.nombreColor,
                color.codigoHax,
                id
            ];
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static obtenerColores() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('SELECT * FROM colores');
            console.log(rows);
            return rows;
        });
    }
    static deleteColores(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call EliminarColor(?);';
            yield config_db_1.default.execute(sql, [id]);
        });
    }
    // Zona Producto
    static addZonaProducto(zonaProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call InsertarZonaProductos(?);';
            const values = [zonaProducto.nombreZona];
            return config_db_1.default.execute(sql, values);
        });
    }
    static ActualizarZonaProducto(zonaProducto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Datos recibidos en el update:", zonaProducto, "ID:", id);
            const sql = `
          call ActualizarZonaProductos(?,?);
        `;
            const values = [
                zonaProducto.nombreZona,
                id
            ];
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static obtenerZonaProducto() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('SELECT * FROM zona_productos');
            console.log(rows);
            return rows;
        });
    }
    static deleteZonaProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call EliminarZonaProductos(?);';
            yield config_db_1.default.execute(sql, [id]);
        });
    }
}
exports.default = PersonalizacionRepository;
