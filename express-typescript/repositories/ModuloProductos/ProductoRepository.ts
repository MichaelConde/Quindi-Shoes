import db from '../../config/config-db';
import Producto from '../../Dto/ProductoDto';

class ProductoRepository {
  static async RegistrarProducto(producto: Producto) {

    const sql = `
      INSERT INTO productoReal (
        tipo_producto,
        nombre_producto,
        genero_producto,
        stock,
        tallas_producto,
        precio_producto,
        colores_producto,
        imagen_producto
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      producto.tipoProducto,
      producto.nombreProducto,
      producto.generoProducto,
      producto.stockProducto,
      producto.tallaProducto,
      producto.precioProducto,
      producto.colorProducto,
      producto.imagenProducto
    ];

    return await db.execute(sql, values);
  }

  static async obtenerTodos() {
    const [rows] = await db.execute('SELECT * FROM productoReal');
    console.log(rows);
    return rows;
  }

  static async eliminarProducto(id: number) {
    const sql = 'DELETE FROM productoReal WHERE id_producto = ?';
    await db.execute(sql, [id]);
  }
}

export default ProductoRepository;
