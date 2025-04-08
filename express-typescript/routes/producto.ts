import express from "express";
import ProductoController  from '../controllers/producto-controller';
const router = express.Router();


router.post('/', ProductoController);


export default router;