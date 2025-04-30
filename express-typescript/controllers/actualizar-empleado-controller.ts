// controllers/actualizarProducto-controller.ts
import { Request, Response } from "express";
import Usuario from "../Dto/UsuarioDto";
import UsuarioService from "../services/ModuloUsuarios/UserServices";

const actualizarEmpleado = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const {
        nombres,
        apellidos,
        telefono,
        direccion,
        correo,
        rol,
        contraseña
      } = req.body;
  
      const usuario = new Usuario(
        nombres,
        apellidos,
        telefono,
        direccion,
        correo,
        rol,
        contraseña
      );
  
      await UsuarioService.actualizarEmpleado(usuario, id);
  
      return res.status(200).json({ message: "Empleado actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar Empleado:", error);
      return res.status(500).json({ error: "Error al actualizar empleado" });
    }
  };
  

export default actualizarEmpleado;
