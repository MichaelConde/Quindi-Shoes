import express from "express";
import registrarProducto  from '../controllers/producto-controller';
import { obtenerProductos, eliminarProducto} from "../controllers/producto-controller";
import  actualizarProducto  from "../controllers/actualizar-producto-controller";
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";
const router = express.Router();


router.post('/', renovarTokenMiddleware, registrarProducto);
router.get("/", verifyToken, renovarTokenMiddleware, obtenerProductos);
router.delete("/:id", renovarTokenMiddleware, eliminarProducto);
router.put("/:id", renovarTokenMiddleware, actualizarProducto);
router.get("/public", obtenerProductos);
export default router;