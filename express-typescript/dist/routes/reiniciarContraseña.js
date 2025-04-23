"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reiniciar_contrase_a_controller_1 = __importDefault(require("../controllers/reiniciar-contrase\u00F1a-controller"));
const router = express_1.default.Router();
router.post('/', reiniciar_contrase_a_controller_1.default);
exports.default = router;
