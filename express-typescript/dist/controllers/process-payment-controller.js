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
exports.processPayment = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const uuid_1 = require("uuid"); // npm install uuid
const processPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = process.env.MP_ACCESS_TOKEN;
        if (!accessToken) {
            return res.status(500).json({ error: "No se encontró el access token de MercadoPago." });
        }
        const { token, issuer_id, payment_method_id, transaction_amount, installments, payer, } = req.body;
        // Validación de campos obligatorios
        if (!token ||
            !issuer_id ||
            !payment_method_id ||
            !transaction_amount ||
            !installments ||
            !payer ||
            !payer.email ||
            !payer.identification ||
            !payer.identification.type ||
            !payer.identification.number) {
            return res.status(400).json({ error: "Faltan campos obligatorios para procesar el pago." });
        }
        const paymentData = {
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(transaction_amount),
            installments: Number(installments),
            payer: {
                email: payer.email,
                identification: {
                    type: payer.identification.type,
                    number: payer.identification.number,
                },
            },
        };
        console.log("Enviando a /v1/payments:", JSON.stringify(paymentData, null, 2));
        const idempotencyKey = (0, uuid_1.v4)();
        const mpResponse = yield (0, node_fetch_1.default)("https://api.mercadopago.com/v1/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "X-Idempotency-Key": idempotencyKey,
            },
            body: JSON.stringify(paymentData),
        });
        const mpResult = yield mpResponse.json();
        console.log("Respuesta de MercadoPago al crear pago:", mpResult);
        res.status(mpResponse.status).json(mpResult);
    }
    catch (error) {
        console.error("Error al procesar el pago:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.processPayment = processPayment;
