import { Request, Response } from 'express';
import { ChatService } from '../services/ModuloIA/chatBotService';

const chatService = new ChatService();

export class ChatController {
    static async obtenerRespuestaIA(req: Request, res: Response) {
        const { question, history } = req.body;

        try {
            const respuesta = await chatService.obtenerProductosPorIA(question, history || []);
            res.status(200).json({ reply: respuesta });
        } catch (error) {
            console.error("Error en ChatController:", error);
            res.status(500).json({ error: 'Error al obtener respuesta de la IA' });
        }
    }
}
