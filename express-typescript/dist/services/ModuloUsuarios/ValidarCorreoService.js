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
const ValidarCorreo = (correo, urlConfirm) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: `"Mi App" <${process.env.EMAIL_USER}>`,
        to: correo,
        subject: 'Confirma tu cuent a',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>¡Bienvenido!</h2>
    <p>Gracias por registrarte. Para activar tu cuenta, haz clic en el botón:</p>
    <a href="${urlConfirm}" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 20px;
    ">
      Confirmar cuenta
    </a>
    <p style="margin-top: 20px;">Si no solicitaste esta cuenta, puedes ignorar este mensaje.</p>
  </div>
    `,
    };
    yield transporter.sendMail(mailOptions);
});
exports.ValidarCorreo = ValidarCorreo;
