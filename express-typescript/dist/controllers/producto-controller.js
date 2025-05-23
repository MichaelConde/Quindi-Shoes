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
exports.registrarColor = exports.obtenerDetalleProducto = exports.obtenerColores = exports.obtenerTallas = exports.eliminarProducto = exports.obtenerProductos = void 0;
const ProductoServices_1 = __importDefault(require("../services/ModuloProductos/ProductoServices"));
const ProductoDto_1 = __importDefault(require("../Dto/ProductoDto")); // Asegúrate de tener esta clase
const ProductoRepository_1 = __importDefault(require("../repositories/ModuloProductos/ProductoRepository"));
const registrarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipoProducto, nombreProducto, generoProducto, stockProducto, tallaProducto, precioProducto, colorProducto, imagenProducto } = req.body;
        // Primero, creamos el producto
        const nuevoProducto = new ProductoDto_1.default(tipoProducto, nombreProducto, generoProducto, stockProducto, tallaProducto, precioProducto, colorProducto, imagenProducto);
        // Insertamos el producto en la base de datos
        const productoInsertado = yield ProductoRepository_1.default.registrarProducto(nuevoProducto);
        // Si el producto se inserta correctamente, obtenemos su ID
        // productoInsertado is likely [result, fields], where result.insertId is the new ID
        const productoId = productoInsertado[0].insertId;
        // Ahora, insertamos las variantes para cada talla y color (podrían ser arrays)
        for (let talla of tallaProducto) { // tallaProducto puede ser un array de IDs de tallas
            for (let color of colorProducto) { // colorProducto puede ser un array de IDs de colores
                yield ProductoRepository_1.default.registrarVariante({
                    id_producto: productoId,
                    id_talla: talla,
                    id_color: color,
                    stock: stockProducto // Este puede ser el stock por variante o se puede definir diferente
                });
            }
        }
        // Si hay una imagen, la insertamos
        if (imagenProducto) {
            yield ProductoRepository_1.default.registrarImagen({
                id_producto: productoId,
                url_imagen: imagenProducto
            });
        }
        res.status(201).json({ message: "Producto registrado con éxito" });
    }
    catch (error) {
        console.error("Error al registrar producto:", error);
        res.status(500).json({ error: "Error al registrar producto" });
    }
});
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield ProductoServices_1.default.obtenerProductos();
        res.json(productos);
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});
exports.obtenerProductos = obtenerProductos;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield ProductoServices_1.default.eliminarProducto(Number(id));
        res.status(200).json({ message: "Producto eliminado con éxito" });
    }
    catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});
exports.eliminarProducto = eliminarProducto;
// En producto-controller.js
const obtenerTallas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tallas = yield ProductoRepository_1.default.obtenerTallas(); // Un servicio para obtener las tallas
        res.json(tallas);
    }
    catch (error) {
        console.error("Error al obtener tallas:", error);
        res.status(500).json({ error: "Error al obtener tallas" });
    }
});
exports.obtenerTallas = obtenerTallas;
const obtenerColores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const colores = yield ProductoRepository_1.default.obtenerColores(); // Un servicio para obtener los colores
        res.json(colores);
    }
    catch (error) {
        console.error("Error al obtener colores:", error);
        res.status(500).json({ error: "Error al obtener colores" });
    }
});
exports.obtenerColores = obtenerColores;
const obtenerDetalleProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        // Trae el producto con variantes e imágenes
        const productos = yield ProductoRepository_1.default.obtenerTodos();
        const producto = productos.find((p) => p.id_producto === id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        // Extrae colores y tallas únicos de las variantes
        const colores = [
            ...new Map(producto.variantes.map((v) => [
                v.id_color,
                { id_color: v.id_color, color: v.color, codigo_hex: v.codigo_hex }
            ])).values(),
        ];
        const tallas = [
            ...new Map(producto.variantes.map((v) => [v.id_talla, { id_talla: v.id_talla, talla: v.talla }])).values(),
        ];
        res.json({
            id_producto: producto.id_producto,
            tipo_producto: producto.tipo_producto,
            nombre_producto: producto.nombre_producto,
            reseña_producto: producto.reseña_producto,
            genero_producto: producto.genero_producto,
            precio_producto: producto.precio_producto,
            imagenes: producto.imagenes,
            colores,
            tallas,
            variantes: producto.variantes,
        });
    }
    catch (error) {
        console.error("Error al obtener detalle del producto:", error);
        res.status(500).json({ error: "Error al obtener detalle del producto" });
    }
});
exports.obtenerDetalleProducto = obtenerDetalleProducto;
const registrarColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { color, codigo_hex } = req.body;
        if (!color || !codigo_hex) {
            return res.status(400).json({ error: "Faltan datos del color" });
        }
        const id = yield ProductoRepository_1.default.registrarColor({ color, codigo_hex });
        res.status(201).json({ id, color, codigo_hex });
    }
    catch (error) {
        console.error("Error al registrar color:", error);
        res.status(500).json({ error: "Error al registrar color" });
    }
});
exports.registrarColor = registrarColor;
exports.default = registrarProducto;
