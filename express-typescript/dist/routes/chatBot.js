"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatBot_controller_1 = require("../controllers/chatBot-controller");
const router = (0, express_1.Router)();
router.post('/chat', chatBot_controller_1.chatController);
exports.default = router;
