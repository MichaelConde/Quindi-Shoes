import UserRepository from '../../repositories/ModuloUsuarios/UsuarioRepository';
import User from '../../Dto/UsuarioDto';
import generateHash from '../../Helpers/generateHash';
import Auth from '../../Dto/AuthDto';
import Producto from '../../Dto/ProductoDto';


class UsuarioService {
    
    static async register(user: User) {
        user.password = await generateHash(user.password);
        console.log(user.password)
        return await UserRepository.addUser(user);
    }

    static async login(auth: Auth) {
        return await UserRepository.loginUser(auth);
    }

  
}

export default UsuarioService;