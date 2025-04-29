import express from "express";
import { obtenerEmpleados }  from '../controllers/register-controller';
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";
const router = express.Router();


router.get('/', verifyToken,renovarTokenMiddleware,obtenerEmpleados);



export default router;