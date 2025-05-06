import express, { Router } from 'express';
import ResenaController from '../controllers/ReseñaController';

const router = express.Router();

router.post('/agregar', ResenaController.agregarResena);

export default router;