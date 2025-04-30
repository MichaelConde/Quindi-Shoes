import UsuarioRepository from '../../repositories/ModuloUsuarios/UsuarioRepository';
import generateHash from '../../Helpers/generateHash';
import Auth from '../../Dto/AuthDto';
import Usuario from '../../Dto/UsuarioDto';



class UsuarioService {
   
    static async actualizarEmpleado(usuario: Usuario, id: number, ) {
        return await UsuarioRepository.ActualizarEmpleado( usuario,id);
    }

    static async register(usuario: Usuario) {
        usuario.contraseña = await generateHash(usuario.contraseña);
        console.log(usuario.contraseña)
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

  
}

export default UsuarioService;