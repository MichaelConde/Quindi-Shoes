"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validar_correo_controller_1 = __importDefault(require("../controllers/validar-correo-controller"));
const router = express_1.default.Router();
router.post('/', validar_correo_controller_1.default);
exports.default = router;
