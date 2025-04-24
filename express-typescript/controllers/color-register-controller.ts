import { Request, Response } from 'express';
import Colores from '../Dto/ColoresDto';
import PersonalizacionServices from '../services/ModuloPersonalizacion/PersonalizacionServices';


  let addColor = async (req: Request, res: Response) => {
    try {
      const { nombreColor, codigoHax } = req.body;

      if (!nombreColor || !codigoHax) {
        return res.status(400).json({ error: 'El nombre del color y el código Hax son requeridos' });
      }

      const color_register = await PersonalizacionServices.addColores(new Colores(nombreColor, codigoHax));

      return res.status(201).json({ message: 'Color agregado exitosamente', color_register });
    } catch (error) {
      console.error('Error al agregar material:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


export default addColor;