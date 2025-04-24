
import ProductoRepository from '../../repositories/ModuloProductos/ProductoRepository';
import Producto from '../../Dto/ProductoDto';

class ProductoServices{

    //Se necesita un disparador para poder agregar producto, cuando la factura se halla hecho exitosamente 

    static async registrarProducto(producto: Producto) {
        return await ProductoRepository.RegistrarProducto(producto);
    }

   

}
export default ProductoServices;