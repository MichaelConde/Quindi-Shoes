import db from '../../config/config-db'
class CarritoRepository{
    static async agregarCarrito(id: number) {
        const sql = `
          Select * from productoReal where id_producto = ?
        `;
    
        const values = [id];
        const [rows] = await db.execute(sql, values);
        return rows;
      }
 }

 export default CarritoRepository;