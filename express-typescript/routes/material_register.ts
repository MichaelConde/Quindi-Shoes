import express from "express";
import addMaterial from "../controllers/material-register-controller";
const router = express.Router();


router.post('/', addMaterial);


export default router;