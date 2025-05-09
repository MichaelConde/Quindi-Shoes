import express, { Router } from 'express';
import { MercadoPagoController } from '../controllers/mercadopago-controller';

const router: Router = express.Router();
const mercadopagoController = new MercadoPagoController();


router.post('/create_preference', mercadopagoController.createPreference);


export default  router