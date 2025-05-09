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
exports.verifyPayment = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
// Configura el SDK de Mercado Pago con tu Access Token
mercadopago_1.default.configurations.setAccessToken('YOUR_ACCESS_TOKEN'); // Esto es ahora innecesario
// Reemplaza con tu Access Token
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId } = req.body;
    if (!paymentId) {
        return res.status(400).json({ error: 'El paymentId es necesario' });
    }
    try {
        // Llamada a la API de Mercado Pago para obtener el estado del pago
        const payment = yield mercadopago_1.default.payment.get(paymentId);
        // Verifica el estado del pago
        if (payment.body.status === 'approved') {
            res.json({ status: 'approved' });
        }
        else {
            res.json({ status: payment.body.status });
        }
    }
    catch (error) {
        console.error('Error al verificar el pago:', error);
        res.status(500).json({ error: 'Error al verificar el pago' });
    }
});
exports.verifyPayment = verifyPayment;
