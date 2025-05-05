"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_controller_1 = __importDefault(require("../controllers/profile-controller"));
const renovar_token_controller_1 = require("../controllers/renovar-token-controller");
const router = express_1.default.Router();
router.get('/', renovar_token_controller_1.verifyToken, renovar_token_controller_1.renovarTokenMiddleware, profile_controller_1.default);
exports.default = router;
