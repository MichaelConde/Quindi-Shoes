import express from "express";
import addZona from "../controllers/zona-register-controller";
const router = express.Router();


router.post('/', addZona);


export default router;