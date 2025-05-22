"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Rese_aController_1 = __importDefault(require("../controllers/Rese\u00F1aController"));
const router = (0, express_1.Router)();
router.post('/agregar', Rese_aController_1.default.agregarReseña);
exports.default = router;
