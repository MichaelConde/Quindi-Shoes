import { Request, Response } from "express";
import Producto from '../Dto/ProductoDto';
import UserService from '../services/UserServices';

let productoAdd = async (req: Request, res: Response) => {
    try{
        const{
            tipoProducto,
            nombreProducto,
            generoProducto,
            precioProducto,
            cantidadProducto,
            tallaProducto,
            colorProducto,
            imagenProducto
        }=req.body;
        const producto = await UserService.addProducto(new Producto(tipoProducto, nombreProducto, generoProducto, precioProducto, cantidadProducto, tallaProducto, colorProducto, imagenProducto));
        return res.status(201).json(
            { status: 'register ok'}
          );
        } catch (error: any) {
          if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage }
            );
          }
        }
      }
      
      
      export default productoAdd;
 