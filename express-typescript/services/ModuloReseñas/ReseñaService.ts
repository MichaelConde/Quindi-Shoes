import ResenaDto from '../../Dto/reseñaDto'; // Puedes renombrar el archivo si quieres evitar la "ñ"
import UsuarioRepository from '../../repositories/ModuloUsuarios/UsuarioRepository';

class ResenaService {
  static async agregarResena(resena: ResenaDto) {
    return await UsuarioRepository.agregarResena(resena); 
  }
}

export default ResenaService;
