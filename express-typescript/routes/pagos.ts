import express from "express";
import { guardarFactura } from '../controllers/factura-controller';
const router = express.Router();

router.post('/pagos/confirmacion', async (req, res) => {

  console.log("📩 Confirmación recibida:");
console.log(JSON.stringify(req.body, null, 2));

  
  const data = req.body;

  const crypto = require("crypto");
const x ="hola"

const cadena = `1551203^043cee4ff132cfb3652522390582eed8^123457^78907^15000^COP`;

const signature = crypto.createHash("sha256").update(cadena).digest("hex");
console.log(signature);

  if (signature === data.x_signature) {
    console.log("✅ Firma válida. Guardando datos...");

    // Extrae los datos útiles
    const factura = {
     
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

  res.sendStatus(200);
});

export default router;
