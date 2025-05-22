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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const mercadopago_service_1 = require("../services/ModuloVentas/mercadopago-service");
exports.PaymentController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
                return res.status(400).json({ error: "El campo items es obligatorio y debe ser un array con al menos un producto." });
            }
            const items = req.body.items.map((item) => ({
                title: item.title || "Producto",
                quantity: Number(item.quantity) || 1,
                unit_price: Number(item.unit_price) || 1,
                currency_id: item.currency_id || "COP",
            }));
            const preferenceData = {
                items,
                payer: req.body.payer,
                back_urls: {
                    success: "https://www.google.com",
                    failure: "https://www.google.com",
                    pending: "https://www.google.com"
                },
                auto_return: "approved",
            };
            console.log("Datos de la preferencia enviados a MercadoPago:", JSON.stringify(preferenceData, null, 2));
            // El service debe devolver el objeto de respuesta de MercadoPago
            const mpResponse = yield (0, mercadopago_service_1.createPreference)(preferenceData);
            // Si el objeto tiene error, responde con error
            if (!mpResponse || !mpResponse.id) {
                console.error("Error al crear la preferencia:", mpResponse);
                return res.status(500).json({ error: "No se pudo crear la preferencia.", details: mpResponse });
            }
            res.status(200).json({ preference: mpResponse });
        }
        catch (error) {
            console.error("Error al crear la preferencia:", error);
            res.status(500).json({ error: "Error al crear la preferencia: " + error.message });
        }
    }),
};
