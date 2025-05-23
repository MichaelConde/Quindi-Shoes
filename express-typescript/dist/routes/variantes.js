"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variantes_controller_1 = require("../controllers/variantes-controller");
const renovar_token_controller_1 = require("../controllers/renovar-token-controller");
const router = express_1.default.Router();
router.get("/:id_producto", renovar_token_controller_1.verifyToken, renovar_token_controller_1.renovarTokenMiddleware, variantes_controller_1.obtenerVariantesPorProducto);
router.post("/", renovar_token_controller_1.verifyToken, renovar_token_controller_1.renovarTokenMiddleware, variantes_controller_1.crearVariante);
router.put("/:id_variante", renovar_token_controller_1.verifyToken, renovar_token_controller_1.renovarTokenMiddleware, variantes_controller_1.actualizarVariante);
router.delete("/:id_variante", renovar_token_controller_1.verifyToken, renovar_token_controller_1.renovarTokenMiddleware, variantes_controller_1.eliminarVariante);
exports.default = router;
