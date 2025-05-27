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
exports.obtenerTops = exports.guardarPuntuacion = void 0;
const JuegoService_1 = __importDefault(require("../services/ModuloJuego/JuegoService"));
// Guardar puntuación
const guardarPuntuacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioId, puntuacion } = req.body;
    try {
        console.log("Guardando puntuación:", usuarioId, puntuacion);
        yield JuegoService_1.default.guardarPuntuacion(usuarioId, puntuacion);
        res.status(200).json({ message: "Puntuación guardada" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al guardar la puntuación" });
    }
});
exports.guardarPuntuacion = guardarPuntuacion;
// Obtener top 10
const obtenerTops = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Obteniendo top de jugadores");
        const tops = yield JuegoService_1.default.obtenerTops();
        res.status(200).json(tops);
        console.log("Top de jugadores obtenido:", tops);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el top de jugadores" });
    }
});
exports.obtenerTops = obtenerTops;
