import { Request, Response } from 'express';
import Materiales from '../Dto/MaterialesDto';
import PersonalizacionServices from '../services/ModuloPersonalizacion/PersonalizacionServices';


  let addMaterial = async (req: Request, res: Response) => {
    try {
      const { nombre_material } = req.body;

      if (!nombre_material) {
        return res.status(400).json({ error: 'El nombre del material es requerido' });
      }

      const material_register = await PersonalizacionServices.addMateriales(new Materiales(nombre_material));

      return res.status(201).json({ message: 'Material agregado exitosamente', material_register });
    } catch (error) {
      console.error('Error al agregar material:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


export default addMaterial;