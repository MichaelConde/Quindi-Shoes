import { Request, Response } from "express";
import UsuarioService from '../services/ModuloUsuarios/UserServices';
import Usuario from "../Dto/UsuarioDto";


let register = async (req: Request, res: Response) => {
  try {
    const {
      nombres,
      apellidos,
      telefono,
      direccion,
      correo,
      contraseña,
      rol
    } = req.body;
    const registerUser = await UsuarioService.register(new Usuario(nombres,apellidos, telefono, direccion, correo ,contraseña,rol))
    return res.status(201).json(
      { status: 'register ok'}
    );
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).json({ errorInfo: error.sqlMessage }
      );
    }
  }
}


export default register;