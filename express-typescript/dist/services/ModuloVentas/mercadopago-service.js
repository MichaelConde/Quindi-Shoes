"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.MercadoPagoService = void 0;
const mercadopago_1 = require("mercadopago");
const preference_1 = require("mercadopago/dist/clients/preference");
const payment_1 = require("mercadopago/dist/clients/payment");
const mercadopago_repository_1 = require("../../repositories/ModuloVentas/mercadopago-repository");
const utils_1 = require("../../src/utils"); // ajusta la ruta si es necesario
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class MercadoPagoService {
    constructor() {
        const accessToken = (0, utils_1.getEnvVar)('MP_ACCESS_TOKEN');
        this.client = new mercadopago_1.MercadoPagoConfig({ accessToken });
        this.preference = new preference_1.Preference(this.client);
        this.payment = new payment_1.Payment(this.client);
        this.mercadopagoRepository = new mercadopago_repository_1.MercadoPagoRepository();
    }
    createPreference(preferenceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validar que el campo items esté presente y sea válido
                if (!preferenceData.items || !Array.isArray(preferenceData.items) || preferenceData.items.length === 0) {
                    throw new Error('El campo items es obligatorio y debe contener al menos un elemento.');
                }
                console.log('Datos enviados a MercadoPago:', preferenceData); // Depuración
                const res = yield this.preference.create({ body: preferenceData });
                if (!res.id) {
                    throw new Error('Preference ID is undefined');
                }
                return res.id;
            }
            catch (error) {
                console.error('Error al crear preferencia:', error);
                throw new Error(error.message || 'Error en la creación de la preferencia');
            }
        });
    }
    getPaymentDetails(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.payment.get({ id: paymentId });
                return res;
            }
            catch (error) {
                console.error('Error al obtener pago:', error);
                throw new Error(error.message || 'Error al obtener detalles del pago');
            }
        });
    }
    processPayment(paymentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Detalles del pago:", paymentDetails);
            if (paymentDetails.status === 'approved') {
                // Actualiza tu base de datos aquí
            }
        });
    }
}
exports.MercadoPagoService = MercadoPagoService;
