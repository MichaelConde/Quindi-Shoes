import { Router } from 'express';
import { ChatController } from '../controllers/chatBot-controller';

const router = Router();

console.log("ChatBot router initialized");
router.post('/', ChatController.obtenerRespuestaIA);

export default router;
