import nodemailer from "nodemailer";

export const ValidarCorreo = async (destinatario: string, token: string) => {
  const transporter = nodemailer.createTransport({
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
  await transporter.sendMail(mailOptions);
};
