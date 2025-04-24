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

export default registrarProducto;
