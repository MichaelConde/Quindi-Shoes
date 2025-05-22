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
exports.createPreference = createPreference;
function createPreference(preferenceData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = process.env.MP_ACCESS_TOKEN;
            if (!accessToken) {
                console.error("No se encontró el access token de MercadoPago.");
                throw new Error("No se encontró el access token de MercadoPago.");
            }
            // Asegura currency_id en cada item
            const dataToSend = Object.assign(Object.assign({}, preferenceData), { items: preferenceData.items.map((item) => (Object.assign(Object.assign({}, item), { currency_id: "COP" }))) });
            console.log("Enviando a MercadoPago:", JSON.stringify(dataToSend, null, 2));
            const response = yield fetch("https://api.mercadopago.com/checkout/preferences", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(dataToSend),
            });
            const data = yield response.json();
            console.log("Respuesta de MercadoPago:", data);
            if (!response.ok) {
                throw new Error(data.message || "No se pudo crear la preferencia en Mercado Pago.");
            }
            const preferenceId = data.id || data.preference_id;
            if (!preferenceId) {
                throw new Error("No se recibió el ID de la preferencia de Mercado Pago.");
            }
            return preferenceId;
        }
        catch (error) {
            console.error("Error al crear la preferencia:", error);
            throw new Error("No se pudo crear la preferencia en Mercado Pago. Detalles: " + (error.message || JSON.stringify(error)));
        }
    });
}
