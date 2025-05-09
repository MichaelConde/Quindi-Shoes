"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mercadopago_controller_1 = require("../controllers/mercadopago-controller");
const router = express_1.default.Router();
const mercadopagoController = new mercadopago_controller_1.MercadoPagoController();
router.post('/create_preference', mercadopagoController.createPreference);
exports.default = router;
