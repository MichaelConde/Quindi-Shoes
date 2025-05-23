"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mercadopago_1 = require("mercadopago");
const mpClient = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-1998873060520696-050814-0ef56bd58a675fa7b099a1a6d509bd3c-2427123749'
});
exports.default = mpClient;
