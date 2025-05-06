import { Request, Response } from 'express';
import ReseñaService from '../services/ModuloReseñas/ReseñaService';
import ReseñaDto from '../Dto/reseñaDto';

class ReseñaController {
  static async agregarReseña(req: Request, res: Response) {
    try {
      const { mensaje, fecha, usuario_id } = req.body;

      if (!mensaje || !fecha || !usuario_id) {
        return res.status(400).json({ mensaje: 'Faltan datos para agregar la reseña' });
      }

      const nuevaReseña: ReseñaDto = { mensaje, fecha, usuario_id };
      await ReseñaService.agregarReseña(nuevaReseña);

      res.status(200).json({ mensaje: 'Reseña agregada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error del servidor al agregar reseña' });
    }
  }
}

export default ReseñaController;
