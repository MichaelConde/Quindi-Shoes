import UsuarioRepository from '../../repositories/ModuloUsuarios/UsuarioRepository';
import generateHash from '../../Helpers/generateHash';
import Auth from '../../Dto/AuthDto';
import Usuario from '../../Dto/UsuarioDto';
import bcrypt from 'bcryptjs';



class UsuarioService {
   
    static async actualizarEmpleado(usuario: Usuario, id: number, ) {
        return await UsuarioRepository.ActualizarEmpleado( usuario,id);
    }

    static async EncontrarCorreo(correo: string) {
        return await UsuarioRepository.EncontrarCorreo(correo);
    }

    static async register(usuario: Usuario) {
        if (!usuario.contraseña) {
            throw new Error("La contraseña es obligatoria para el registro.");
          }
        
          usuario.contraseña = await generateHash(usuario.contraseña);
          console.log(usuario.contraseña);
          return await UsuarioRepository.addUser(usuario);
    }

    static async login(auth: Auth) {
        return await UsuarioRepository.loginUser(auth);
    }

    static async obtenerEmpleados() {
        return await UsuarioRepository.obtenerEmpleados();
    }

    static async eliminarEmpleado(id: number) {
        await UsuarioRepository.eliminarEmpleado(id);
    }

    static async verificarContrasenaActual(id: number, contraseñaActual: string) {
        console.log("ID recibido:", id);
        const contraseñaGuardada = await UsuarioRepository.verificarContraseña(id);
        return await bcrypt.compare(contraseñaActual, contraseñaGuardada); // Compara con el hash guardado
      }
    
      // Función para actualizar la contraseña
      static async actualizarContraseña(id: number, nuevaContraseña: string) { // Cambiar el nombre del parámetro
        const hash = await generateHash(nuevaContraseña); // Genera el hash para la nueva contraseña
        await UsuarioRepository.ActualizarContraseña(id, hash); // Actualiza la contraseña en la base de datos
      }

    //   static async crearUsuarioTemporal({ correo, contraseña, nombres, apellidos, telefono, direccion, tokenVerificacion }) {
        
    //     const nuevoUsuarioTemporal = {
    //       correo,
    //       contraseña,  // Asegúrate de cifrar la contraseña antes de guardarla
    //       nombres,
    //       apellidos,
    //       telefono,
    //       direccion,
    //       tokenVerificacion,
    //       estado: "pendiente",  // El usuario está pendiente de verificación
    //     };
}}

export default UsuarioService;