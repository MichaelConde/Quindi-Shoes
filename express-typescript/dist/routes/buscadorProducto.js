"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busqueda_controller_1 = require("../controllers/busqueda-controller");
const router = (0, express_1.Router)();
router.post("/", busqueda_controller_1.buscarProductosConFiltros);
router.get("/", busqueda_controller_1.obtenerSugerencias);
exports.default = router;
