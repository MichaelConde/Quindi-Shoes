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
class CarritoRepository {
    static obtenerItemCarrito(id_variantes) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            SELECT 
                p.id_producto,
                p.nombre_producto,
                p.tipo_producto,
                p.precio_producto,
                v.id_variantes,
                v.stock,
                t.id_talla,
                t.talla,
                c.id_color,
                c.color,
                i.url_imagen
            FROM productos p
            JOIN producto_variantes v ON p.id_producto = v.id_producto
            JOIN tallas t ON v.id_talla = t.id_talla
            JOIN colores_producto c ON v.id_color = c.id_color
            LEFT JOIN imagenes i ON p.id_producto = i.id_producto
            WHERE v.id_variantes = ?
            LIMIT 1
        `;
            const values = [id_variantes];
            const [rows] = yield config_db_1.default.execute(sql, values);
            return rows[0];
        });
    }
}
exports.default = CarritoRepository;
