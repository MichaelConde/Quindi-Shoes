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
const AuthDto_1 = __importDefault(require("../Dto/AuthDto"));
const UserServices_1 = __importDefault(require("../services/ModuloUsuarios/UserServices"));
const generateToken_1 = __importDefault(require("../Helpers/generateToken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Cambiado: usar "contrasena" (sin ñ) en lugar de "contraseña"
        const { correo, contrasena, rol, recaptchaToken } = req.body;
        // Validar token de reCAPTCHA
        if (!recaptchaToken) {
            return res.status(400).json({ status: "Recaptcha token is required" });
        }
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
        const recaptchaRes = yield fetch(verifyUrl, { method: "POST" });
        const data = yield recaptchaRes.json();
        if (!data.success) {
            return res.status(400).json({ status: "Recaptcha verification failed" });
        }
        // Verificar login: se crea el objeto Auth utilizando "contrasena"
        const login = yield UserServices_1.default.login(new AuthDto_1.default(correo, contrasena, rol));
        if (login.logged) {
            const payload = {
                id: login.id, // Incluye el ID del usuario
                rol: login.rol, // Puedes incluir más info si quieres
            };
            const token = (0, generateToken_1.default)(payload, process.env.KEY_TOKEN, 5); // Expira en 5 horas (o lo que uses)
            return res.status(200).json({
                status: login.status,
                token: token,
                rol: login.rol,
                id: login.id, // Opcional: enviar también el ID del usuario
            });
        }
        return res.status(401).json({ status: login.status });
    }
    catch (error) {
        console.error("❌ Error en login:", error);
        return res.status(500).json({ status: "Server error" });
    }
});
exports.default = auth;
