import { Request, Response } from 'express';
import ZonaProductos from '../Dto/ZonaProductosDto';
import PersonalizacionServices from '../services/ModuloPersonalizacion/PersonalizacionServices';


  let addZona = async (req: Request, res: Response) => {
    try {
      const { nombreZona } = req.body;

      if (!nombreZona) {
        return res.status(400).json({ error: 'El nombre la zona es requerido' });
      }

      const zona_register = await PersonalizacionServices.addZonaProducto(new ZonaProductos(nombreZona));

      return res.status(201).json({ message: 'Zona agregada exitosamente', zona_register });
    } catch (error) {
      console.error('Error al agregar material:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


export default addZona;