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
exports.enviarCorreo = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const enviarCorreo = (destinatario, token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const url = `http://localhost:5173/reiniciarContrasena?token=${token}`;
    const mailOptions = {
        from: '"QuindiShoes 👟" <santiagoaguirrecastano8@gmail.com>',
        to: destinatario,
        subject: "Restablecer tu contraseña",
        html: `
      <p>Hola, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${url}">${url}</a>
      <p>Este enlace expirará en 15 minutos.</p>
    `,
    };
    yield transporter.sendMail(mailOptions);
});
exports.enviarCorreo = enviarCorreo;
