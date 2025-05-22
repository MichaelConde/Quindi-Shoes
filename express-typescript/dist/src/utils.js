"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mpClient = void 0;
// src/utils.ts
const mercadopago_1 = require("mercadopago");
exports.mpClient = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});
