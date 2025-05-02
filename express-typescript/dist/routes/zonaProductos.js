"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zonaProducto_controller_1 = __importDefault(require("../controllers/zonaProducto-controller"));
const zonaProducto_controller_2 = require("../controllers/zonaProducto-controller");
const actualizar_zonaProducto_controller_1 = __importDefault(require("../controllers/actualizar-zonaProducto-controller"));
const renovar_token_controller_1 = require("../controllers/renovar-token-controller");
const router = express_1.default.Router();
router.post('/', renovar_token_controller_1.renovarTokenMiddleware, zonaProducto_controller_1.default);
router.get("/", renovar_token_controller_1.verifyToken, renovar_token_controller_1.renovarTokenMiddleware, zonaProducto_controller_2.obtenerZonaProducto);
router.delete("/:id", renovar_token_controller_1.renovarTokenMiddleware, zonaProducto_controller_2.eliminarZonaProducto);
router.put("/:id", renovar_token_controller_1.renovarTokenMiddleware, actualizar_zonaProducto_controller_1.default);
exports.default = router;
