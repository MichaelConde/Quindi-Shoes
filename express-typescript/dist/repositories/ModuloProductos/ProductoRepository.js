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
    static obtenerTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield config_db_1.default.execute('SELECT * FROM productoReal');
            return rows;
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
            // Trae productos con variantes (talla, color, stock) e imágenes
            const result = yield config_db_1.default.query(`
    SELECT 
      p.id_producto,
      p.tipo_producto,
      p.nombre_producto,
      p.reseña_producto,
      p.genero_producto,
      p.precio_producto,
      i.url_imagen,
      v.id_variantes,
      v.stock,
      t.id_talla,
      t.talla,
      c.id_color,
      c.color,
      c.codigo_hex       
    FROM productos p
    LEFT JOIN producto_variantes v ON p.id_producto = v.id_producto
    LEFT JOIN tallas t ON v.id_talla = t.id_talla
    LEFT JOIN colores_producto c ON v.id_color = c.id_color
    LEFT JOIN imagenes i ON p.id_producto = i.id_producto
    ORDER BY p.id_producto
  `);
            let rows = [];
            if (Array.isArray(result)) {
                if (Array.isArray(result[0])) {
                    // e.g., [RowDataPacket[], ...]
                    rows = result[0];
                }
                else if (result.length > 0 && typeof result[0] === 'object' && 'id_producto' in result[0]) {
                    // e.g., RowDataPacket[]
                    rows = result;
                }
                // else: result might be OkPacket[] or ResultSetHeader[], which we ignore for this query
            }
            // Agrupa por producto
            const productosMap = {};
            for (const row of rows) {
                if (!productosMap[row.id_producto]) {
                    productosMap[row.id_producto] = {
                        id_producto: row.id_producto,
                        tipo_producto: row.tipo_producto,
                        nombre_producto: row.nombre_producto,
                        reseña_producto: row.reseña_producto,
                        genero_producto: row.genero_producto,
                        precio_producto: row.precio_producto,
                        imagenes: [],
                        variantes: [],
                    };
                }
                // Agrega imagen si no está repetida y existe
                if (row.url_imagen && !productosMap[row.id_producto].imagenes.includes(row.url_imagen)) {
                    productosMap[row.id_producto].imagenes.push(row.url_imagen);
                }
                // Agrega variante si existe talla y color
                if (row.id_talla && row.id_color) {
                    productosMap[row.id_producto].variantes.push({
                        id_variantes: row.id_variantes,
                        id_talla: row.id_talla,
                        talla: row.talla,
                        id_color: row.id_color,
                        color: row.color,
                        codigo_hex: row.codigo_hex,
                        stock: row.stock,
                    });
                }
            }
            // Devuelve un array de productos
            return Object.values(productosMap);
        });
    }
    // Elimina el producto y sus variantes e imágenes (recomendado para integridad referencial)
    static eliminarProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Elimina variantes e imágenes primero si tienes claves foráneas
            yield config_db_1.default.execute('DELETE FROM producto_variantes WHERE id_producto = ?', [id]);
            yield config_db_1.default.execute('DELETE FROM imagenes WHERE id_producto = ?', [id]);
            // Luego elimina el producto
            yield config_db_1.default.execute('DELETE FROM productos WHERE id_producto = ?', [id]);
        });
    }
    static ActualizarProducto(producto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
    UPDATE productos SET 
      tipo_producto = ?,
      nombre_producto = ?,
      genero_producto = ?,
      precio_producto = ?
    WHERE id_producto = ?
  `;
            const values = [
                producto.tipoProducto,
                producto.nombreProducto,
                producto.generoProducto,
                producto.precioProducto,
                id
            ];
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static registrarColor(color) {
        return __awaiter(this, void 0, void 0, function* () {
            // Inserta un nuevo color y retorna el id insertado
            const [result] = yield config_db_1.default.query(`INSERT INTO colores_producto (color, codigo_hex) VALUES (?, ?)`, [color.color, color.codigo_hex]);
            return result.insertId;
        });
    }
}
exports.default = ProductoRepository;
