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
const express_1 = __importDefault(require("express"));
const producto_controller_1 = __importDefault(require("../controllers/producto-controller"));
const producto_controller_2 = require("../controllers/producto-controller");
const actualizar_producto_controller_1 = __importDefault(require("../controllers/actualizar-producto-controller"));
const factura_controller_1 = require("../controllers/factura-controller");
const factura_controller_2 = require("../controllers/factura-controller");
const renovar_token_controller_1 = require("../controllers/renovar-token-controller");
const router = express_1.default.Router();
router.post('/', renovar_token_controller_1.renovarTokenMiddleware, producto_controller_1.default);
router.get("/", renovar_token_controller_1.verifyToken, renovar_token_controller_1.renovarTokenMiddleware, producto_controller_2.obtenerProductos);
router.delete("/:id", renovar_token_controller_1.renovarTokenMiddleware, producto_controller_2.eliminarProducto);
router.put("/:id", renovar_token_controller_1.renovarTokenMiddleware, actualizar_producto_controller_1.default);
router.get("/public", producto_controller_2.obtenerProductos);
router.get('/facturas', factura_controller_1.obtenerFacturas);
// En Node.js con Express
// 👈 controlador que guardará en D
router.post('/pagos/confirmacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const crypto = require('crypto');
    const signature = crypto
        .createHash('sha256')
        .update(`TU_PRIVATE_KEY^${data.x_ref_payco}^${data.x_transaction_id}^${data.x_amount}^${data.x_currency_code}`)
        .digest('hex');
    if (signature === data.x_signature) {
        console.log("✅ Firma válida. Guardando datos...");
        // Extrae los datos útiles
        const factura = {
            id_usuario: data.extra1, // tú lo puedes enviar desde el frontend
            ref_payco: data.x_ref_payco,
            transaction_id: data.x_transaction_id,
            estado: data.x_response,
            valor: data.x_amount,
            moneda: data.x_currency_code,
            metodo_pago: data.x_type_payment,
        };
        yield (0, factura_controller_2.guardarFactura)(factura); // 👈 llama al controlador que guarda
    }
    else {
        console.log("❌ Firma inválida. Posible intento de fraude.");
    }
    res.sendStatus(200); // Siempre responde 200 a ePayco
}));
exports.default = router;
