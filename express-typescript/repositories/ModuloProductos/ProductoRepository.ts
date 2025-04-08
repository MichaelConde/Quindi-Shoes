import db from '../../config/config-db';
import Producto from '../../Dto/ProductoDto';


class ProductoRepository {
// Se necesita una alidacion con detalle facutra, para poder agregar producto, si detalle factura no se cumple no se agregara producto 
  static async addProducto(producto: Producto) {
    const sql = 'call Insertar_producto(?, ?, ?, ?, ?, ?, ?);';
    const values = [producto.tipoProducto, producto.nombreProducto, producto.generoProducto, producto.precioProducto, producto.stockProducto,producto.tallaProducto,producto.imagenProducto];
    return db.execute(sql, values);
  }

  static async deleteProducto(producto: Producto) {
    const sql = 'BorrarProducto';
    const values = [producto.tipoProducto, producto.nombreProducto, producto.generoProducto, producto.precioProducto, producto.stockProducto,producto.tallaProducto,producto.imagenProducto];
    return db.execute(sql, values);
  }

 

}


export default ProductoRepository;