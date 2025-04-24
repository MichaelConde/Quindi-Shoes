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
class ProductoRepository {
    static RegistrarProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
      INSERT INTO productoReal (
        tipo_producto,
        nombre_producto,
        genero_producto,
        stock,
        tallas_producto,
        precio_producto,
        colores_producto,
        imagen_producto
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
            const values = [
                producto.tipoProducto,
                producto.nombreProducto,
                producto.generoProducto,
                producto.stockProducto,
                producto.tallaProducto,
                producto.precioProducto,
                producto.colorProducto,
                producto.imagenProducto
            ];
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static obtenerTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('SELECT * FROM productoReal');
            console.log(rows);
            return rows;
        });
    }
    static eliminarProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM productoReal WHERE id_producto = ?';
            yield config_db_1.default.execute(sql, [id]);
        });
    }
}
exports.default = ProductoRepository;
