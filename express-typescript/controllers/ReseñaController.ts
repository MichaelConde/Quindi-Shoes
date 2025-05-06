import { Request, Response } from 'express';
import ReseñaService from '../services/ModuloReseñas/ReseñaService';
import ReseñaDto from '../Dto/reseñaDto';

class ResenaController { // ✅ Sin "ñ" en el nombre de clase
  static async agregarResena(req: Request, res: Response) {
    try {
      const { mensaje, fecha, usuario_id } = req.body;

      if (!mensaje || !fecha || !usuario_id) {
        return res.status(400).json({ mensaje: 'Faltan datos para agregar la reseña' });
      }

      const nuevaResena: ReseñaDto = { mensaje, fecha, usuario_id };
      await ReseñaService.agregarResena(nuevaResena); // ✅ Sin "ñ" en el método
      console.log('📥 BODY recibido en /resenas/agregar:', req.body);


      res.status(200).json({ mensaje: 'Reseña agregada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error del servidor al agregar reseña' });
    }
  }
}


export default ResenaController; // ✅ Exporta sin "ñ"
