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
exports.eliminarZonaProducto = exports.obtenerZonaProducto = void 0;
const ZonaProductosDto_1 = __importDefault(require("../Dto/ZonaProductosDto"));
const PersonalizacionServices_1 = __importDefault(require("../services/ModuloPersonalizacion/PersonalizacionServices"));
let addZona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreZona } = req.body;
        if (!nombreZona) {
            return res.status(400).json({ error: 'El nombre la zona es requerido' });
        }
        const zona_register = yield PersonalizacionServices_1.default.addZonaProducto(new ZonaProductosDto_1.default(nombreZona));
        return res.status(201).json({ message: 'Zona agregada exitosamente', zona_register });
    }
    catch (error) {
        console.error('Error al agregar zona del producto:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
const obtenerZonaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zonaProducto = yield PersonalizacionServices_1.default.obtenerZonaProducto();
        res.json(zonaProducto);
    }
    catch (error) {
        console.error("Error al obtener zona del producto:", error);
        res.status(500).json({ error: "Error al obtener zona del producto" });
    }
});
exports.obtenerZonaProducto = obtenerZonaProducto;
const eliminarZonaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield PersonalizacionServices_1.default.deleteZonaProducto(Number(id));
        res.status(200).json({ message: "Zona dle producto eliminada con éxito" });
    }
    catch (error) {
        console.error("Error al eliminar la zona del producto:", error);
        res.status(500).json({ error: "Error al eliminar la zona del producto" });
    }
});
exports.eliminarZonaProducto = eliminarZonaProducto;
exports.default = addZona;
