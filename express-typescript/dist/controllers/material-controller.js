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
exports.eliminarMateriales = exports.obtenerMateriales = void 0;
const MaterialesDto_1 = __importDefault(require("../Dto/MaterialesDto"));
const PersonalizacionServices_1 = __importDefault(require("../services/ModuloPersonalizacion/PersonalizacionServices"));
const addMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_material } = req.body;
        if (!nombre_material) {
            return res.status(400).json({ error: 'El nombre del material es requerido' });
        }
        const material_register = yield PersonalizacionServices_1.default.addMateriales(new MaterialesDto_1.default(nombre_material));
        return res.status(201).json({ message: 'Material agregado exitosamente', material_register });
    }
    catch (error) {
        console.error('Error al agregar material:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
const obtenerMateriales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materiales = yield PersonalizacionServices_1.default.obtenerMateriales();
        res.json(materiales);
    }
    catch (error) {
        console.error("Error al obtener materiales:", error);
        res.status(500).json({ error: "Error al obtener materiales" });
    }
});
exports.obtenerMateriales = obtenerMateriales;
const eliminarMateriales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield PersonalizacionServices_1.default.deleteMateriales(Number(id));
        res.status(200).json({ message: "Material eliminado con éxito" });
    }
    catch (error) {
        console.error("Error al eliminar material:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});
exports.eliminarMateriales = eliminarMateriales;
exports.default = addMaterial;
