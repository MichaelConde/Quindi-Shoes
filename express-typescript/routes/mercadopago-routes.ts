import { Router } from "express";
import { createPreferenceController } from "../controllers/createPreference-controller";
import { processPayment } from "../controllers/process-payment-controller";

const router = Router();

router.post("/create_preference", createPreferenceController);
router.post("/process_payment", processPayment);

export default router;