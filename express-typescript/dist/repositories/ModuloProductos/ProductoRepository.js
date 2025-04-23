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
const config_db_1 = __importDefault(require("../../config/config-db"));
class ProductoRepository {
    // Se necesita una alidacion con detalle facutra, para poder agregar producto, si detalle factura no se cumple no se agregara producto 
    static addProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call Insertar_producto(?, ?, ?, ?, ?, ?, ?);';
            const values = [producto.tipoProducto, producto.nombreProducto, producto.generoProducto, producto.precioProducto, producto.stockProducto, producto.tallaProducto, producto.imagenProducto];
            return config_db_1.default.execute(sql, values);
        });
    }
    static deleteProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'BorrarProducto';
            const values = [producto.tipoProducto, producto.nombreProducto, producto.generoProducto, producto.precioProducto, producto.stockProducto, producto.tallaProducto, producto.imagenProducto];
            return config_db_1.default.execute(sql, values);
        });
    }
}
exports.default = ProductoRepository;
