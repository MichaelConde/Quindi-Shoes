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
    static registrarProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Aquí realizarías la inserción en la tabla productos
            const result = yield config_db_1.default.query(`
    INSERT INTO productos (tipo_producto, nombre_producto, genero_producto, precio_producto)
    VALUES (?, ?, ?, ?)`, [
                producto.tipoProducto,
                producto.nombreProducto,
                producto.generoProducto,
                producto.precioProducto
            ]);
            return result; // Retorna el producto insertado, incluyendo el id_producto
        });
    }
    static registrarVariante(variante) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_db_1.default.query(`
    INSERT INTO producto_variantes (id_producto, id_talla, id_color, stock)
    VALUES (?, ?, ?, ?)`, [
                variante.id_producto,
                variante.id_talla,
                variante.id_color,
                variante.stock
            ]);
        });
    }
    static registrarImagen(imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_db_1.default.query(`
    INSERT INTO imagenes (id_producto, url_imagen)
    VALUES (?, ?)`, [
                imagen.id_producto,
                imagen.url_imagen
            ]);
        });
    }
    static obtenerColores() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_db_1.default.query('SELECT * FROM colores_producto');
                return result;
            }
            catch (error) {
                console.error("Error al obtener los colores:", error);
                throw error;
            }
        });
    }
    static obtenerTallas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_db_1.default.query('SELECT * FROM tallas');
                return result;
            }
            catch (error) {
                console.error("Error al obtener las tallas:", error);
                throw error;
            }
        });
    }
    ;
    static obtenerTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('SELECT * FROM productos');
            console.log('Resultado de la consulta:', rows);
            return rows;
        });
    }
    static eliminarProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM productoReal WHERE id_producto = ?';
            yield config_db_1.default.execute(sql, [id]);
        });
    }
    static ActualizarProducto(producto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Datos recibidos en el update:", producto, "ID:", id);
            const sql = `
      UPDATE productoReal SET 
        tipo_producto = ?,
        nombre_producto = ?,
        genero_producto = ?,
        stock = ?,
        tallas_producto = ?,
        precio_producto = ?,
        colores_producto = ?,
        imagen_producto = ?
      WHERE id_producto = ?
    `;
            const values = [
                producto.tipoProducto,
                producto.nombreProducto,
                producto.generoProducto,
                producto.stockProducto,
                producto.tallaProducto,
                producto.precioProducto,
                producto.colorProducto,
                producto.imagenProducto,
                id
            ];
            return yield config_db_1.default.execute(sql, values);
        });
    }
}
exports.default = ProductoRepository;
