import { Request, Response } from "express";
import ProductoServices from "../services/ModuloProductos/ProductoServices";
import Producto from "../Dto/ProductoDto"; // Asegúrate de tener esta clase

const registrarProducto = async (req: Request, res: Response) => {
  try {
    const {
      tipoProducto,
      nombreProducto,
      generoProducto,
      stockProducto,
      tallaProducto,
      precioProducto,
      colorProducto,
      imagenProducto
    } = req.body;

    
    const nuevoProducto = new Producto(
      tipoProducto,
      nombreProducto,
      generoProducto,
      stockProducto,
      tallaProducto,
      precioProducto,
      colorProducto,
      imagenProducto
    );


    await ProductoServices.registrarProducto(nuevoProducto);

    res.status(201).json({ message: "Producto registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar producto:", error);
    res.status(500).json({ error: "Error al registrar producto" });
  }

  
};

export const obtenerProductos = async (req: Request, res: Response) => {
    try {
      const productos = await ProductoServices.obtenerProductos();
      res.json(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ error: "Error al obtener productos" });
    }
  };
  
  export const eliminarProducto = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await ProductoServices.eliminarProducto(Number(id));
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).json({ error: "Error al eliminar producto" });
    }
  };

  

export default registrarProducto;
