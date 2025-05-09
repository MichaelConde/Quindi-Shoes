import { Request, Response } from 'express';
import { MercadoPagoService } from '../services/ModuloVentas/mercadopago-service';

export class MercadoPagoController {
  private mercadoPagoService = new MercadoPagoService();

  constructor() {
    this.createPreference = this.createPreference.bind(this); 
  }

  public async createPreference(req: Request, res: Response): Promise<void> {
    try {
      
      if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
        res.status(400).json({ message: 'El campo items es obligatorio y debe contener al menos un elemento.' });
        return;
      }

      const preferenceId = await this.mercadoPagoService.createPreference(req.body);
      res.status(200).json({ id: preferenceId });
    } catch (error: any) {
      console.error('Error en createPreference:', error);
      res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
  }
}