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
const ProductoServices_1 = __importDefault(require("../services/ModuloProductos/ProductoServices"));
const ProductoDto_1 = __importDefault(require("../Dto/ProductoDto"));
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        // Recibe solo los campos principales que realmente se actualizan
        const { tipoProducto, nombreProducto, generoProducto, precioProducto } = req.body;
        // Crea el DTO solo con los campos necesarios
        const producto = new ProductoDto_1.default(tipoProducto, nombreProducto, generoProducto, 0, // stockProducto
        '', // tallaProducto
        precioProducto, '', // colorProducto
        '' // imagenProducto
        );
        yield ProductoServices_1.default.actualizarProducto(producto, id);
        return res.status(200).json({ message: "Producto actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ error: "Error al actualizar producto" });
    }
});
exports.default = actualizarProducto;
