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
}

export default ProductoRepository;
