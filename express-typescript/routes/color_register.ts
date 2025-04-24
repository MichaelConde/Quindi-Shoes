import express from "express";
import addColor from "../controllers/color-register-controller";
const router = express.Router();


router.post('/', addColor);


export default router;