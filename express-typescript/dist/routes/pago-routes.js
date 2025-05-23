"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/pagos.ts
const express_1 = __importDefault(require("express"));
const factura_controller_1 = require("../controllers/factura-controller");
const router = express_1.default.Router();
router.post('/pagos/confirmacion', express_1.default.urlencoded({ extended: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📩 Confirmación recibida:");
        console.log(req.body);
        yield (0, factura_controller_1.guardarFactura)(req); // Ya no pasa `res`
        res.sendStatus(200); // ✅ Solo aquí respondemos
    }
    catch (error) {
        console.error("❌ Error al procesar la confirmación:", error);
        res.sendStatus(500); // ❌ Solo responde si hubo error
    }
}));
exports.default = router;
