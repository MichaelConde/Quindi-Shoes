"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const color_controller_1 = __importDefault(require("../controllers/color-controller"));
const color_controller_2 = require("../controllers/color-controller");
const actualizar_color_controller_1 = __importDefault(require("../controllers/actualizar-color-controller"));
const renovar_token_controller_1 = require("../controllers/renovar-token-controller");
const router = express_1.default.Router();
router.post('/', renovar_token_controller_1.renovarTokenMiddleware, color_controller_1.default);
router.get("/", renovar_token_controller_1.verifyToken, renovar_token_controller_1.renovarTokenMiddleware, color_controller_2.obtenerColores);
router.delete("/:id", renovar_token_controller_1.renovarTokenMiddleware, color_controller_2.eliminarColores);
router.put("/:id", renovar_token_controller_1.renovarTokenMiddleware, actualizar_color_controller_1.default);
exports.default = router;
