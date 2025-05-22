import ReseñaDto from '../../Dto/reseñaDto';
import UsuarioRepository from '../../repositories/ModuloUsuarios/UsuarioRepository';

class ReseñaService {
  static async agregarReseña(resena: ReseñaDto) {
    return await UsuarioRepository.agregarReseña(resena);
  }
}

export default ReseñaService;
