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
const ZonaProductosDto_1 = __importDefault(require("../Dto/ZonaProductosDto"));
const PersonalizacionServices_1 = __importDefault(require("../services/ModuloPersonalizacion/PersonalizacionServices"));
const actualizarMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombreZona } = req.body;
        const zonaProducto = new ZonaProductosDto_1.default(nombreZona);
        yield PersonalizacionServices_1.default.actualizarZonaProducto(zonaProducto, id);
        return res.status(200).json({ message: "Zona del producto actualizada correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar la zona del producto:", error);
        return res.status(500).json({ error: "Error al actualizar la zona del producto" });
    }
});
exports.default = actualizarMaterial;
