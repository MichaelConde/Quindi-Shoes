"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createPreference_controller_1 = require("../controllers/createPreference-controller");
const process_payment_controller_1 = require("../controllers/process-payment-controller");
const router = (0, express_1.Router)();
router.post("/create_preference", createPreference_controller_1.createPreferenceController);
router.post("/process_payment", process_payment_controller_1.processPayment);
exports.default = router;
