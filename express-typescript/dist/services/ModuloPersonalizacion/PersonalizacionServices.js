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
const PersonalizacionRepository_1 = __importDefault(require("../../repositories/ModuloPersonalizacion/PersonalizacionRepository"));
class PersonalizacionServices {
    static addMateriales(materiales) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.addMateriales(materiales);
        });
    }
    static deleteMateriales(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.deleteMateriales(id);
        });
    }
    static actualizarMaterial(material, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.ActualizarMaterial(material, id);
        });
    }
    static obtenerMateriales() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.obtenerMaterial();
        });
    }
    static addColores(colores) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.addColores(colores);
        });
    }
    static deleteColores(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.deleteColores(id);
        });
    }
    static actualizarColor(colores, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.ActualizarColor(colores, id);
        });
    }
    static obtenerColores() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.obtenerColores();
        });
    }
    static addZonaProducto(zonaProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.addZonaProducto(zonaProducto);
        });
    }
    static deleteZonaProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.deleteZonaProducto(id);
        });
    }
    static actualizarZonaProducto(zonaProducto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.ActualizarZonaProducto(zonaProducto, id);
        });
    }
    static obtenerZonaProducto() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PersonalizacionRepository_1.default.obtenerZonaProducto();
        });
    }
}
exports.default = PersonalizacionServices;
