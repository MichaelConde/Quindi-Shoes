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
exports.obtenerFacturas = exports.guardarFactura = void 0;
const config_db_1 = __importDefault(require("../config/config-db"));
const guardarFactura = (factura) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `
      INSERT INTO facturas (
        id_usuario, ref_payco, transaction_id, estado, valor, moneda, metodo_pago, 
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        yield config_db_1.default.query(sql, [
            factura.id_usuario,
            factura.ref_payco,
            factura.transaction_id,
            factura.estado,
            factura.valor,
            factura.moneda,
            factura.metodo_pago
        ]);
        console.log("📦 Factura guardada exitosamente");
    }
    catch (error) {
        console.error("❌ Error al guardar la factura:", error);
    }
});
exports.guardarFactura = guardarFactura;
const obtenerFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield config_db_1.default.query('SELECT * FROM facturas WHERE id_usuario = ?');
    res.json(result);
});
exports.obtenerFacturas = obtenerFacturas;
