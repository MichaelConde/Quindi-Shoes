import express from "express";
import registrarProducto  from '../controllers/producto-controller';
const router = express.Router();


router.post('/', registrarProducto);


export default router;