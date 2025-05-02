// controllers/actualizarProducto-controller.ts
import { Request, Response } from "express";
import  CarritoServices  from "../services/ModuloCarritoCompras/CarritoServices";

const agregarCarrito = async (req: Request, res: Response) => {
    console.log("Ruta /carrito_compras/:id llamada con ID:", req.params.id);
    try {
      const id = parseInt(req.params.id);
     
  
      await CarritoServices.agregarCarrito(id);
  
      return res.status(200).json({ message: "Agregado correctamente al carrito" });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      return res.status(500).json({ error: "Error al agregar al carrito" });
    }
  };
  

export default agregarCarrito;
