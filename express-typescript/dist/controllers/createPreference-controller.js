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
exports.createPreferenceController = void 0;
const mercadopago_service_1 = require("../services/ModuloVentas/mercadopago-service");
const createPreferenceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preferenceId = yield (0, mercadopago_service_1.createPreference)(req.body);
        res.status(200).json({ preferenceId });
    }
    catch (error) {
        console.error("Error en createPreferenceController:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.createPreferenceController = createPreferenceController;
