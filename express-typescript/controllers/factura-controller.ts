import db from '../config/config-db';

export const guardarFactura = async (factura: any) => {
  try {
    const sql = `
      INSERT INTO facturas (
        id_usuario, ref_payco, transaction_id, estado, valor, moneda, metodo_pago, 
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      factura.id_usuario,
      factura.ref_payco,
      factura.transaction_id,
      factura.estado,
      factura.valor,
      factura.moneda,
      factura.metodo_pago
    ]);

    console.log("📦 Factura guardada exitosamente");
  } catch (error) {
    console.error("❌ Error al guardar la factura:", error);
  }
};
export const obtenerFacturas = async (req: any, res: any) => {
    
    const result = await db.query('SELECT * FROM facturas WHERE id_usuario = ?');
    res.json(result);
  }
