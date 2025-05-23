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
exports.PaymentRepository = void 0;
const mercadopago_1 = require("mercadopago");
const utils_1 = require("../../src/utils");
const paymentInstance = new mercadopago_1.Payment(utils_1.mpClient);
exports.PaymentRepository = {
    create: (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield paymentInstance.create({ body: paymentData });
            return result;
        }
        catch (error) {
            throw error;
        }
    })
};
