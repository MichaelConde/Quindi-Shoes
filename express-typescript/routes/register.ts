import express from "express";
import registerController from '../controllers/register-controller';
import { validatorParams, validator } from "../middleware/Register-validator";
const router = express.Router();


router.post('/',validatorParams,validator,registerController);
router.get('/', registerController);



export default router;