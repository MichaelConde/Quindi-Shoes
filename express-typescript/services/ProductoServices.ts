
import ProductoRepository from '../repositories/ProductoRepository';
import Producto from '../Dto/ProductoDto';

class ProductoServices{

    //Se necesita un disparador para poder agregar producto, cuando la factura se halla hecho exitosamente 

    static async addProducto(producto: Producto) {
        return await ProductoRepository.addProducto(producto);
    }

    static async deleteProducto(producto: Producto){
        return await ProductoRepository.deleteProducto(producto);
    }
    //Cuando se haga factura 
    static async resProducto(producto: Producto){
        return await ProductoRepository.restProducto(producto);
    }


}