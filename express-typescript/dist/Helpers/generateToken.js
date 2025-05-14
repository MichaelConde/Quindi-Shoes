"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let generateToken = (properties, key, minutes) => {
    // Asegúrate de imprimir el payload y la clave para depuración
    console.log("🔐 Firmando token con clave:", key);
    console.log("📦 Payload:", properties);
    console.log("⏱️ Expiración en (segundos):", Math.floor(Date.now() / 1000) + (minutes * 60));
    return jsonwebtoken_1.default.sign({
        data: properties, // Se asegura que el payload se pasa correctamente
    }, key, { expiresIn: minutes * 60 } // Utiliza `expiresIn` en lugar de calcular la expiración manualmente
    );
};
exports.default = generateToken;
