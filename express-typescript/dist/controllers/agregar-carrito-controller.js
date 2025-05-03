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
const CarritoServices_1 = __importDefault(require("../services/ModuloCarritoCompras/CarritoServices"));
const agregarCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Ruta /carrito_compras/:id llamada con ID:", req.params.id);
    try {
        const id = parseInt(req.params.id);
        const producto = yield CarritoServices_1.default.agregarCarrito(id);
        console.log("Producto agregado al carrito:", producto);
        return res.status(200).json(producto);
    }
    catch (error) {
        console.error("Error al agregar al carrito:", error);
        return res.status(500).json({ error: "Error al agregar al carrito" });
    }
});
exports.default = agregarCarrito;
