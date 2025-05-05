import { Request, Response } from "express";
import UsuarioService from '../services/ModuloUsuarios/UserServices';
import Usuario from "../Dto/UsuarioDto";
import jwt from 'jsonwebtoken'; // Para crear el token de validación
import { ValidarCorreo } from '../services/ModuloUsuarios/ValidarCorreoService'; // Asegúrate de que la función de envío de correo esté bien implementada
import generateToken from "../Helpers/generateToken";

const register = async (req: Request, res: Response) => {
    try {
        const {
          nombres,
          apellidos,
          telefono,
          direccion,
          correo,
          rol,
          contraseña,
        } = req.body;
    
        // Validar si el correo ya existe
        const usuarioExistente = await UsuarioService.EncontrarCorreo(correo);
        if (usuarioExistente) {
          return res.status(400).json({ error: "El correo ya está registrado" });
        }
    
        // Crear usuario temporal (sin confirmación de correo)
        const nuevoUsuario = new Usuario(
          nombres,
          apellidos,
          telefono,
          direccion,
          correo,
          rol,
          contraseña
        );

        // Crear el token de verificación para el correo
        const tokenVerificacion = generateToken({ correo }, process.env.KEY_TOKEN, '1h');  // Token de 1 hora
        
        // Guardar usuario temporal (con token de verificación)
        await UsuarioService.crearUsuarioTemporal({
            correo,
            contraseña,
            nombres,
            apellidos,
            telefono,
            direccion,
            tokenVerificacion,
          });

        // Enviar correo con el token de verificación
        await ValidarCorreo(correo, tokenVerificacion);

        // Usuario registrado (pero no validado)
        return res.status(201).json({
          message: "Usuario registrado con éxito. Verifica tu correo electrónico.",
        });

      } catch (error: any) {
        console.error("Error en el registro:", error);
    
        if (error.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ error: "Ya existe un usuario con ese correo" });
        }
    
        return res.status(500).json({ error: "Error en el servidor" });
      }
};

// Confirmar correo (cuando el usuario hace clic en el enlace de verificación)
export const confirmarCorreo = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    

    interface DecodedToken {
      correo: string;
    }
    
    const { correo } = jwt.verify(token, process.env.KEY_TOKEN!) as DecodedToken;

    // Verificar si el usuario existe
    const usuarioExistente = await UsuarioService.EncontrarCorreo(correo);
    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Confirmar el correo y activar al usuario
    await UsuarioService.EncontrarCorreo(correo);

    return res.status(200).json({ message: "Correo confirmado con éxito, ahora puedes ingresar a tu cuenta." });
  } catch (error) {
    console.error("Error al confirmar el correo:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Eliminar usuario
export const eliminarEmpleado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UsuarioService.eliminarEmpleado(Number(id));
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export default { register, confirmarCorreo, eliminarEmpleado };
