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
  static async obtenerProductosParaChatbot() {
    const [rows]: [any[], any] = await db.execute('SELECT * FROM productoReal');

    // Mapeamos los productos para adaptarlos al formato que necesita el chatbot
    const productosAdaptados = rows.map((product: any) => ({
        nombre: product.nombre_producto,    // Renombramos el campo
        precio: product.precio_producto,    // Renombramos el campo
        tallas: product.tallas_producto.toString(),  // Dejamos las tallas como un string
    }));

    console.log('Productos adaptados para el chatbot:', productosAdaptados);
    return productosAdaptados;
}
  static async obtenerTodos() {
    const [rows] = await db.execute('SELECT * FROM productoReal');
    console.log('Resultado de la consulta:', rows);
    return rows;
}

  static async eliminarProducto(id: number) {
    const sql = 'DELETE FROM productoReal WHERE id_producto = ?';
    await db.execute(sql, [id]);
  }

  static async ActualizarProducto(producto: Producto,id: number) {
    console.log("Datos recibidos en el update:", producto, "ID:", id);
    const sql = `
      UPDATE productoReal SET 
        tipo_producto = ?,
        nombre_producto = ?,
        genero_producto = ?,
        stock = ?,
        tallas_producto = ?,
        precio_producto = ?,
        colores_producto = ?,
        imagen_producto = ?
      WHERE id_producto = ?
    `;

    const values = [
      producto.tipoProducto,
      producto.nombreProducto,
      producto.generoProducto,
      producto.stockProducto,
      producto.tallaProducto,
      producto.precioProducto,
      producto.colorProducto,
      producto.imagenProducto,
      id
    ];
    return await db.execute(sql, values);
  }
}

export default ProductoRepository;
