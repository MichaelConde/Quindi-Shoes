"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatBot_controller_1 = require("../controllers/chatBot-controller");
const router = (0, express_1.Router)();
console.log("ChatBot router initialized");
router.post('/', chatBot_controller_1.ChatController.obtenerRespuestaIA);
exports.default = router;
