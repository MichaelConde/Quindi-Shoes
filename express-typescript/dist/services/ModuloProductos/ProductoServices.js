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
const ProductoRepository_1 = __importDefault(require("../../repositories/ModuloProductos/ProductoRepository"));
class ProductoServices {
    //Se necesita un disparador para poder agregar producto, cuando la factura se halla hecho exitosamente 
    static registrarProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductoRepository_1.default.registrarProducto(producto);
        });
    }
    static obtenerProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductoRepository_1.default.obtenerTodos();
        });
    }
    static eliminarProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProductoRepository_1.default.eliminarProducto(id);
        });
    }
    static actualizarProducto(producto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductoRepository_1.default.ActualizarProducto(producto, id);
        });
    }
}
exports.default = ProductoServices;
