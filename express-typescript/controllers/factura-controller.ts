import db from '../config/config-db';
import { Request, Response } from "express";

export const guardarFactura = async (req: Request) => {
  const {
    x_ref_payco,
    x_transaction_id,
    x_respuesta,
    x_amount,
    x_currency_code,
    x_franchise,
    x_xextra1,
  } = req.body;

  if (!x_xextra1 || isNaN(parseInt(x_xextra1))) {
    throw new Error(`id_usuario no válido: ${x_xextra1}`);
  }

  const id_usuario = parseInt(x_xextra1);

  const sql = `
    INSERT INTO facturas (
      ref_payco,
      transaction_id,
      estado,
      valor,
      moneda,
      metodo_pago,
      id_usuario
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  await db.query(sql, [
    x_ref_payco,
    x_transaction_id,
    x_respuesta,
    x_amount,
    x_currency_code,
    x_franchise,
    id_usuario,
  ]);
};



export const obtenerFacturas = async (req: any, res: any) => {
    
    const result = await db.query('SELECT * FROM facturas WHERE id_usuario = ?');
    res.json(result);
  }
