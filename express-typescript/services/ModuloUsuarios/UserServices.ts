import UsuarioRepository from '../../repositories/ModuloUsuarios/UsuarioRepository';
import generateHash from '../../Helpers/generateHash';
import Auth from '../../Dto/AuthDto';
import Usuario from '../../Dto/UsuarioDto';



class UsuarioService {
    
    static async register(usuario: Usuario) {
        usuario.contraseña = await generateHash(usuario.contraseña);
        console.log(usuario.contraseña)
        return await UsuarioRepository.addUser(usuario);
    }

    static async login(auth: Auth) {
        return await UsuarioRepository.loginUser(auth);
    }

  
}

export default UsuarioService;