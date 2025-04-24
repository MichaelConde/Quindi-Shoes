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
exports.eliminarProducto = exports.obtenerProductos = void 0;
const ProductoServices_1 = __importDefault(require("../services/ModuloProductos/ProductoServices"));
const ProductoDto_1 = __importDefault(require("../Dto/ProductoDto")); // Asegúrate de tener esta clase
const registrarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipoProducto, nombreProducto, generoProducto, stockProducto, tallaProducto, precioProducto, colorProducto, imagenProducto } = req.body;
        const nuevoProducto = new ProductoDto_1.default(tipoProducto, nombreProducto, generoProducto, stockProducto, tallaProducto, precioProducto, colorProducto, imagenProducto);
        yield ProductoServices_1.default.registrarProducto(nuevoProducto);
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
exports.default = registrarProducto;
