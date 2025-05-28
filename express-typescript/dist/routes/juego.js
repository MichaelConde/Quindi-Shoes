"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Juego_controller_1 = require("../controllers/Juego-controller");
const renovar_token_controller_1 = require("../controllers/renovar-token-controller");
const router = (0, express_1.Router)();
router.post("/", renovar_token_controller_1.verifyToken, Juego_controller_1.guardarPuntuacion);
router.get("/", Juego_controller_1.obtenerTops);
exports.default = router;
