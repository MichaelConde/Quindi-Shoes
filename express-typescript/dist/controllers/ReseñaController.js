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
const Rese_aService_1 = __importDefault(require("../services/ModuloRese\u00F1as/Rese\u00F1aService"));
class ResenaController {
    static agregarResena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mensaje, fecha, usuario_id } = req.body;
                if (!mensaje || !fecha || !usuario_id) {
                    return res.status(400).json({ mensaje: 'Faltan datos para agregar la reseña' });
                }
                const nuevaResena = { mensaje, fecha, usuario_id };
                yield Rese_aService_1.default.agregarResena(nuevaResena); // ✅ Sin "ñ" en el método
                console.log('📥 BODY recibido en /resenas/agregar:', req.body);
                res.status(200).json({ mensaje: 'Reseña agregada correctamente' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: 'Error del servidor al agregar reseña' });
            }
        });
    }
}
exports.default = ResenaController; // ✅ Exporta sin "ñ"
