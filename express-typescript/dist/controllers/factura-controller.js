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
const guardarFactura = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { x_ref_payco, x_transaction_id, x_respuesta, x_amount, x_currency_code, x_franchise, x_xextra1, x_xextra2, } = req.body;
    if (!x_xextra1 || isNaN(parseInt(x_xextra1))) {
        throw new Error(`id_usuario no válido: ${x_xextra1}`);
    }
    const id_usuario = parseInt(x_xextra1);
    const sql = `
    INSERT INTO facturas (
      ref_payco,
      transaction_id,
      estado,
      valor,
      moneda,
      metodo_pago,
      id_usuario,
      contenido_factura
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
    yield config_db_1.default.query(sql, [
        x_ref_payco,
        x_transaction_id,
        x_respuesta,
        x_amount,
        x_currency_code,
        x_franchise,
        id_usuario,
        x_xextra2
    ]);
});
exports.guardarFactura = guardarFactura;
const obtenerFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield config_db_1.default.query(`SELECT * FROM facturas ORDER BY id DESC`);
        const facturas = rows.map((factura) => (Object.assign(Object.assign({}, factura), { contenido_factura: typeof factura.contenido_factura === 'string'
                ? JSON.parse(factura.contenido_factura)
                : factura.contenido_factura })));
        res.json(facturas);
    }
    catch (error) {
        console.error("Error al obtener todas las facturas:", error);
        res.status(500).json({ message: 'Error al obtener las facturas' });
    }
});
exports.obtenerFacturas = obtenerFacturas;
