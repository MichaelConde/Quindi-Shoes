import db from '../../config/config-db';
import Producto from '../../Dto/ProductoDto';

class ProductoRepository {
static async registrarProducto(producto: Producto) {
  // Aquí realizarías la inserción en la tabla productos
  const result = await db.query(`
    INSERT INTO productos (tipo_producto, nombre_producto, genero_producto, precio_producto)
    VALUES (?, ?, ?, ?)`, [
    producto.tipoProducto,
    producto.nombreProducto,
    producto.generoProducto,
    producto.precioProducto
  ]);
  return result;  // Retorna el producto insertado, incluyendo el id_producto
}

static async registrarVariante(variante: { id_producto: any; id_talla: any; id_color: any; stock: any; }) {
  await db.query(`
    INSERT INTO producto_variantes (id_producto, id_talla, id_color, stock)
    VALUES (?, ?, ?, ?)`, [
    variante.id_producto,
    variante.id_talla,
    variante.id_color,
    variante.stock
  ]);
}

static async registrarImagen(imagen: { id_producto: any; url_imagen: any; }) {
  await db.query(`
    INSERT INTO imagenes (id_producto, url_imagen)
    VALUES (?, ?)`, [
    imagen.id_producto,
    imagen.url_imagen
  ]);
}

static async obtenerColores() {
  try {
   
    const result = await db.query('SELECT * FROM colores_producto');
    return result;  
  } catch (error) {
    console.error("Error al obtener los colores:", error);
    throw error;  
  }
}

static async obtenerTallas () {
  try {
    const result = await db.query('SELECT * FROM tallas');
    return result; 
  } catch (error) {
    console.error("Error al obtener las tallas:", error);
    throw error;  
  }
};



  static async obtenerTodos() {
    const [rows] = await db.execute('SELECT * FROM productos');
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
