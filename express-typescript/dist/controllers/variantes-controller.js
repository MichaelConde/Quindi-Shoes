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
exports.crearVariante = exports.actualizarVariante = exports.eliminarVariante = exports.obtenerVariantesPorProducto = void 0;
const ProductoRepository_1 = __importDefault(require("../repositories/ModuloProductos/ProductoRepository"));
// Obtener todas las variantes de un producto
const obtenerVariantesPorProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_producto } = req.params;
        const variantes = yield ProductoRepository_1.default.obtenerVariantesPorProducto(Number(id_producto));
        res.json(variantes);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener variantes" });
    }
});
exports.obtenerVariantesPorProducto = obtenerVariantesPorProducto;
// Eliminar una variante
const eliminarVariante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_variante } = req.params;
        yield ProductoRepository_1.default.eliminarVariante(Number(id_variante));
        res.json({ message: "Variante eliminada" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar variante" });
    }
});
exports.eliminarVariante = eliminarVariante;
// Actualizar una variante
const actualizarVariante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_variante } = req.params;
        const { id_talla, id_color, stock } = req.body;
        yield ProductoRepository_1.default.actualizarVariante(Number(id_variante), { id_talla, id_color, stock });
        res.json({ message: "Variante actualizada" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar variante" });
    }
});
exports.actualizarVariante = actualizarVariante;
// Crear una nueva variante
const crearVariante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_producto, id_talla, id_color, stock } = req.body;
        yield ProductoRepository_1.default.registrarVariante({ id_producto, id_talla, id_color, stock });
        res.status(201).json({ message: "Variante creada" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear variante" });
    }
});
exports.crearVariante = crearVariante;
