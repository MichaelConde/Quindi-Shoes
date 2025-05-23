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
exports.verifyPayment = exports.createPreference = void 0;
// src/controllers/payment.controller.ts
const mercadopago_1 = require("mercadopago");
const ConfigVentas_1 = __importDefault(require("../services/ModuloVentas/ConfigVentas"));
const mercadopago_2 = __importDefault(require("mercadopago"));
const createPreference = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, price, quantity } = req.body;
        const preference = new mercadopago_1.Preference(ConfigVentas_1.default); // 👈 instancia del recurso con el cliente
        const response = yield preference.create({
            body: {
                items: [
                    {
                        id: '1234', // ✅ agrega este campo
                        title: description,
                        unit_price: Number(price),
                        quantity: Number(quantity),
                    },
                ],
                back_urls: {
                    success: 'http://localhost:5173/PagoAceptado',
                    failure: 'http://localhost:5173/PagoRechazado',
                },
                auto_return: 'approved',
            },
        });
        res.json({ id: response.id });
    }
    catch (error) {
        console.error('Error creando preferencia:', error);
        res.status(500).json({ error: 'Error al crear la preferencia de pago' });
    }
});
exports.createPreference = createPreference;
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId } = req.body;
    try {
        if (!paymentId) {
            return res.status(400).json({ error: 'paymentId es requerido' });
        }
        // Obtener el estado del pago usando el paymentId
        const payment = yield mercadopago_2.default.payment.get(paymentId);
        if (!payment.body) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        // Verificar el estado del pago
        if (payment.body.status === 'approved') {
            return res.json({ status: 'approved' });
        }
        else {
            return res.json({ status: payment.body.status });
        }
    }
    catch (error) {
        console.error('Error al verificar el pago:', error);
        return res.status(500).json({ error: 'Error al verificar el pago' });
    }
});
exports.verifyPayment = verifyPayment;
// src/controllers/payment.controller.ts
