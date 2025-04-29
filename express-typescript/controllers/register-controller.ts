import { Request, Response } from "express";
import UsuarioService from '../services/ModuloUsuarios/UserServices';
import Usuario from "../Dto/UsuarioDto";


const register = async (req: Request, res: Response) => {
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

export const obtenerEmpleados = async (req: Request, res: Response) => {
    try {
      const empleados = await UsuarioService.obtenerEmpleados();
      res.json(empleados);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ error: "Error al obtener productos" });
    }
  };
  
export default register;