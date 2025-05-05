import express from "express";
import registrarProducto  from '../controllers/producto-controller';
import { obtenerProductos, eliminarProducto} from "../controllers/producto-controller";
import  actualizarProducto  from "../controllers/actualizar-producto-controller";
import { obtenerFacturas } from "../controllers/factura-controller";
import { guardarFactura } from '../controllers/factura-controller';
import {renovarTokenMiddleware, verifyToken }from "../controllers/renovar-token-controller";
import bodyParser from 'body-parser';
const router = express.Router();


router.post('/', renovarTokenMiddleware, registrarProducto);
router.get("/", verifyToken, renovarTokenMiddleware, obtenerProductos);
router.delete("/:id", renovarTokenMiddleware, eliminarProducto);
router.put("/:id", renovarTokenMiddleware, actualizarProducto);
router.get("/public", obtenerProductos);

router.get('/facturas', obtenerFacturas);




// En Node.js con Express
 // 👈 controlador que guardará en D

router.post('/pagos/confirmacion', async (req, res) => {
  const data = req.body;

  const crypto = require('crypto');
  const signature = crypto
    .createHash('sha256')
    .update(
      `TU_PRIVATE_KEY^${data.x_ref_payco}^${data.x_transaction_id}^${data.x_amount}^${data.x_currency_code}`
    )
    .digest('hex');

  if (signature === data.x_signature) {
    console.log("✅ Firma válida. Guardando datos...");

    // Extrae los datos útiles
    const factura = {
      id_usuario: data.extra1, // tú lo puedes enviar desde el frontend
      ref_payco: data.x_ref_payco,
      transaction_id: data.x_transaction_id,
      estado: data.x_response,
      valor: data.x_amount,
      moneda: data.x_currency_code,
      metodo_pago: data.x_type_payment,
  
    };

    await guardarFactura(factura); // 👈 llama al controlador que guarda

  } else {
    console.log("❌ Firma inválida. Posible intento de fraude.");
  }

  res.sendStatus(200); // Siempre responde 200 a ePayco
});

  
export default router;