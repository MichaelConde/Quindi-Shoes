import { Request, Response } from "express";
import UsuarioService from '../services/ModuloUsuarios/UserServices';
import jwt from 'jsonwebtoken';
import { ValidarCorreo } from '../services/ModuloUsuarios/ValidarCorreoService';
import generateHash from "../Helpers/generateHash";
import Usuario from "../Dto/UsuarioDto";
import generateToken from "../Helpers/generateToken";

// Registro de usuario: genera un JWT con todos los datos y envía enlace para confirmar
const register = async (req: Request, res: Response) => {
  try {
    const { nombres, apellidos, telefono, direccion, correo, rol, contraseña } = req.body;

    console.log("Datos del formulario recibidos en backend:", req.body);

    // Verificar si el correo ya está registrado
    const usuario = await UsuarioService.EncontrarCorreo(correo);
    if (usuario) {
      return res.status(400).json({ error: "El correo ya está registrado." });
    }

    // Crear el objeto de usuario para generar el token
    const payload = {
      nombres,
      apellidos,
      telefono,
      direccion,
      correo,
      rol,
      contraseña: await generateHash(contraseña), // Hashear la contraseña
    };

    // Generar token con el payload
    const token = generateToken(payload, process.env.KEY_TOKEN!, 60); // Token válido por 1h
    console.log("Token generado:", token);

    // Enviar link de confirmación por correo
    const urlConfirm = `http://localhost:5173/esperando-confirmacion?token=${token}`;
    await ValidarCorreo(correo, urlConfirm);

    // Responder con mensaje de éxito
    return res.status(201).json({
      message: "Registro iniciado. Revisa tu correo para confirmar tu cuenta.",
      token: token, // Por si necesitas usarlo en frontend
    });
  } catch (error: any) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ error: "Error en el servidor al registrar el usuario." });
  }
};


// Confirmación de correo desde /confirmar
const confirmarCorreo = async (req: Request, res: Response) => {
  try {
    const { token } = req.query; // Obtener token desde la query

    if (!token) {
      return res.status(400).json({ error: "Token no proporcionado." });
    }

    console.log("Token recibido desde query:", token);

    // Decodificar el token y obtener el payload
    const payload = jwt.verify(token as string, process.env.KEY_TOKEN!) as {
      nombres: string;
      apellidos: string;
      telefono: string;
      direccion: string;
      correo: string;
      rol: string;
      contraseña: string;
    };

    console.log("Payload decodificado:", payload);

    const { nombres, apellidos, telefono, direccion, correo, rol, contraseña } = payload;

    // Verificar si el usuario ya existe
    const usuarioExistente = await UsuarioService.EncontrarCorreo(correo);
    if (usuarioExistente) {
      return res.status(400).json({ error: "Este correo ya fue confirmado anteriormente." });
    }

    // Crear el nuevo usuario y registrarlo
    const usuario = new Usuario(nombres, apellidos, telefono, direccion, correo, rol, contraseña);
    console.log("Registrando usuario:", usuario);

    await UsuarioService.register(usuario);

    return res.status(200).json({ message: "Correo confirmado con éxito." });
  } catch (error: any) {
    console.error("Error en confirmarCorreo:", error);
    return res.status(400).json({ error: "Token inválido o expirado." });
  }
};

export const obtenerEmpleados = async (req: Request, res: Response) => {
  try {
    const empleados = await UsuarioService.obtenerEmpleados();
    return res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    return res.status(500).json({ error: "Error al obtener los empleados" });
  }
};

export const eliminarEmpleado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UsuarioService.eliminarEmpleado(Number(id));
    return res.status(200).json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export const verificarEstadoCorreo = async (req: Request, res: Response) => {
  try {
    // Obtener el token de la query
    const { token } = req.query;

    // Si no se proporciona un token
    if (!token) {
      return res.status(400).json({ error: "Token no proporcionado." });
    }

    // Verificar y decodificar el token
    const payload = jwt.verify(token as string, process.env.KEY_TOKEN!) as {
      correo: string;
    };

    // Si llegamos aquí, el token es válido
    return res.status(200).json({ message: "Correo verificado correctamente.", correo: payload.correo });

  } catch (error: any) {
    console.error("Error verificando el estado del correo:", error);
    return res.status(400).json({ error: "Token inválido o expirado." });
  }
};

export default {
  register,
  confirmarCorreo,
};
