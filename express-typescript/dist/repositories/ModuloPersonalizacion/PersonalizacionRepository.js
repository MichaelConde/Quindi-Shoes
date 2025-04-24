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
    static addMateriales(materiales) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call InsertarMaterial(?);';
            const values = [materiales.nombre_material];
            return config_db_1.default.execute(sql, values);
        });
    }
    static deleteMateriales(materiales) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'BorrarMateriales';
            const values = [materiales.nombre_material];
            return config_db_1.default.execute(sql, values);
        });
    }
    static addColores(colores) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call InsertarColor(?, ?);';
            const values = [colores.nombreColor, colores.codigoHax];
            return config_db_1.default.execute(sql, values);
        });
    }
    static deleteColores(colores) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'BorrarColores';
            const values = [colores.nombreColor, colores.codigoHax];
            return config_db_1.default.execute(sql, values);
        });
    }
    static addZonaProducto(zonaProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call InsertarZonaProductos(?);';
            const values = [zonaProducto.nombreZona];
            return config_db_1.default.execute(sql, values);
        });
    }
    static deleteZonaProducto(zonaProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'BorrarZonaProducto';
            const values = [zonaProducto.nombreZona];
            return config_db_1.default.execute(sql, values);
        });
    }
}
exports.default = PersonalizacionRepository;
