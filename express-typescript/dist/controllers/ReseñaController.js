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
                const { resena, fecha_resena, id_usuario } = req.body;
                if (!resena || !fecha_resena || !id_usuario || isNaN(Number(id_usuario))) {
                    return res.status(400).json({ mensaje: 'Faltan datos para agregar la resena' });
                }
                yield Rese_aService_1.default.agregarResena({ resena, fecha_resena, id_usuario: Number(id_usuario) });
                res.status(200).json({ mensaje: 'Resena agregada correctamente' });
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error del servidor al agregar resena' });
            }
        });
    }
    static editarResena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resena, fecha_resena, id_usuario } = req.body;
                if (!resena || !fecha_resena || !id_usuario || isNaN(Number(id_usuario))) {
                    return res.status(400).json({ mensaje: 'Faltan datos para editar la resena' });
                }
                yield Rese_aService_1.default.editarResena({ resena, fecha_resena, id_usuario: Number(id_usuario) });
                res.status(200).json({ mensaje: 'Resena editada correctamente' });
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error del servidor al editar resena' });
            }
        });
    }
    static eliminarResena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_usuario } = req.body;
                if (!id_usuario || isNaN(Number(id_usuario))) {
                    return res.status(400).json({ mensaje: 'Falta el id_usuario' });
                }
                yield Rese_aService_1.default.eliminarResena(Number(id_usuario));
                res.status(200).json({ mensaje: 'Resena eliminada correctamente' });
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error del servidor al eliminar resena' });
            }
        });
    }
    static obtenerTodasLasResenas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resenas = yield Rese_aService_1.default.obtenerTodasLasResenas();
                res.status(200).json(resenas);
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al obtener las reseñas' });
            }
        });
    }
}
exports.default = ResenaController;
