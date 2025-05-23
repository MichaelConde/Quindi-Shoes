import { Router } from 'express';
import ReseñaController from '../controllers/ReseñaController';

const router = Router();

router.post('/agregar', ReseñaController.agregarReseña);

export default router;
