import db from '../config/config-db';
import DetalleFactura from '../Dto/DetalleFacturaDto';

class DetalleFacturaRepository{

    static async addDetalleFactura(DetalleFactura: DetalleFactura) {
        const sql = '';
        const values = [];
        return db.execute(sql, values);
      }
}

export default DetalleFacturaRepository;