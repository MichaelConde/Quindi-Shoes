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
exports.obtenerSugerencias = exports.buscarProductosConFiltros = void 0;
const BusquedaServices_1 = __importDefault(require("../services/ModuloProductos/BusquedaServices"));
const buscarProductosConFiltros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtros = req.body;
        const productos = yield BusquedaServices_1.default.buscarProductosConFiltros(filtros);
        return res.status(200).json(productos);
    }
    catch (error) {
        console.error("Error en la búsqueda de productos:", error);
        return res.status(500).json({ error: "Error en la búsqueda" });
    }
});
exports.buscarProductosConFiltros = buscarProductosConFiltros;
const obtenerSugerencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        const sugerencias = yield BusquedaServices_1.default.obtenerSugerencias(query);
        return res.status(200).json(sugerencias);
    }
    catch (error) {
        console.error("Error en sugerencias:", error);
        return res.status(500).json({ error: "Error en sugerencias" });
    }
});
exports.obtenerSugerencias = obtenerSugerencias;
