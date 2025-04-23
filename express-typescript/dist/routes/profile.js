"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_controller_1 = __importDefault(require("../controllers/profile-controller"));
const VerifyToken_1 = __importDefault(require("../middleware/VerifyToken"));
const router = express_1.default.Router();
router.get('/', VerifyToken_1.default, profile_controller_1.default);
exports.default = router;
