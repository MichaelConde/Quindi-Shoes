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
const MaterialesDto_1 = __importDefault(require("../Dto/MaterialesDto"));
const PersonalizacionServices_1 = __importDefault(require("../services/ModuloPersonalizacion/PersonalizacionServices"));
const actualizarMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre_material } = req.body;
        const material = new MaterialesDto_1.default(nombre_material);
        yield PersonalizacionServices_1.default.actualizarMaterial(material, id);
        return res.status(200).json({ message: "Material actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar material:", error);
        return res.status(500).json({ error: "Error al actualizar material" });
    }
});
exports.default = actualizarMaterial;
