import express from "express";
import registrarProducto  from '../controllers/producto-controller';
import { obtenerProductos, eliminarProducto } from "../controllers/producto-controller";

const router = express.Router();


router.post('/', registrarProducto);
router.get("/", obtenerProductos);
router.delete("/:id", eliminarProducto);

export default router;