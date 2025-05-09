import { MercadoPagoConfig } from 'mercadopago';
import { Preference } from 'mercadopago/dist/clients/preference';
import { Payment } from 'mercadopago/dist/clients/payment';
import { MercadoPagoRepository } from '../../repositories/ModuloVentas/mercadopago-repository';
import { getEnvVar } from '../../src/utils'; // ajusta la ruta si es necesario
import * as dotenv from 'dotenv';

dotenv.config();

export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private preference: Preference;
  private payment: Payment;
  private mercadopagoRepository: MercadoPagoRepository;

  constructor() {
    const accessToken = getEnvVar('MP_ACCESS_TOKEN');

    this.client = new MercadoPagoConfig({ accessToken });
    this.preference = new Preference(this.client);
    this.payment = new Payment(this.client);
    this.mercadopagoRepository = new MercadoPagoRepository();
  }

  async createPreference(preferenceData: any): Promise<string> {
    try {
      // Validar que el campo items esté presente y sea válido
      if (!preferenceData.items || !Array.isArray(preferenceData.items) || preferenceData.items.length === 0) {
        throw new Error('El campo items es obligatorio y debe contener al menos un elemento.');
      }

      console.log('Datos enviados a MercadoPago:', preferenceData); // Depuración
      const res = await this.preference.create({ body: preferenceData });
      if (!res.id) {
        throw new Error('Preference ID is undefined');
      }
      return res.id;
    } catch (error: any) {
      console.error('Error al crear preferencia:', error);
      throw new Error(error.message || 'Error en la creación de la preferencia');
    }
  }

  async getPaymentDetails(paymentId: string): Promise<any> {
    try {
      const res = await this.payment.get({ id: paymentId });
      return res;
    } catch (error: any) {
      console.error('Error al obtener pago:', error);
      throw new Error(error.message || 'Error al obtener detalles del pago');
    }
  }

  async processPayment(paymentDetails: any): Promise<void> {
    console.log("Detalles del pago:", paymentDetails);
    if (paymentDetails.status === 'approved') {
      // Actualiza tu base de datos aquí
    }
  }
}