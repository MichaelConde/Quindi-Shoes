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
exports.ValidarCorreo = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ValidarCorreo = (destinatario, token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const url = `http://localhost:5173/validarCorreo?token=${token}`;
    const mailOptions = {
        from: '"QuindiShoes 👟" <santiagoaguirrecastano8@gmail.com>',
        to: destinatario,
        subject: "Verificación de correo electrónico",
        html: `
      <p>Hola, gracias por registrarte en QuindiShoes. Para activar tu cuenta, haz clic en el siguiente botón:</p>
      <a href="${url}" style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; border-radius: 8px; font-size: 16px;">Confirmar correo</a>
      <p>Este enlace expirará en 1 hora.</p>
    `,
    };
    // Enviar el correo
    yield transporter.sendMail(mailOptions);
});
exports.ValidarCorreo = ValidarCorreo;
