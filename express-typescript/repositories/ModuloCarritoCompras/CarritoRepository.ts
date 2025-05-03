import db from '../../config/config-db';
import { RowDataPacket } from "mysql2";

class CarritoRepository {
    static async agregarCarrito(id: number) {
      type Producto = {
        id_producto: number;
        nombre_producto: string;
        tipo_producto: string;
        precio_producto: number;
        
      };
        const sql = `
          SELECT * FROM productoReal WHERE id_producto = ?
        `;
        const values = [id];
        const [productos] = await db.execute<Producto[] & RowDataPacket[]>(sql, values);
        return productos[0];
    }
}

export default CarritoRepository;
