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
const ColoresDto_1 = __importDefault(require("../Dto/ColoresDto"));
const PersonalizacionServices_1 = __importDefault(require("../services/ModuloPersonalizacion/PersonalizacionServices"));
let addColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreColor, codigoHax } = req.body;
        if (!nombreColor || !codigoHax) {
            return res.status(400).json({ error: 'El nombre del color y el código Hax son requeridos' });
        }
        const color_register = yield PersonalizacionServices_1.default.addColores(new ColoresDto_1.default(nombreColor, codigoHax));
        return res.status(201).json({ message: 'Color agregado exitosamente', color_register });
    }
    catch (error) {
        console.error('Error al agregar material:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.default = addColor;
