

import { Request, Response } from "express";
import Auth from '../Dto/AuthDto';
import UsuarioService from '../services/ModuloUsuarios/UserServices';
import generateToken from '../Helpers/generateToken';
import dotenv from "dotenv";
dotenv.config();


let auth = async (req: Request, res: Response) => {
  try {
    const { correo, contraseña,rol, recaptchaToken } = req.body;

    if(!recaptchaToken) {

      return res.status(400).json({
        status: "Recaptcha token is required"
      });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const response = await fetch(verifyUrl, {
      method: 'POST',
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({
        status: "Recaptcha verification failed"
      });
    }

    const login = await UsuarioService.login(new Auth(correo, contraseña,rol));
 
    if (login.logged) {
      return res.status(200).json({
        status: login.status,
        token: generateToken({id: login.id}, process.env.KEY_TOKEN, 5),
        rol : login.rol,
      });
    }
    return res.status(401).json({
      status: login.status
    });
  } catch (error) {
    console.log(error);
  }
}


export default auth;