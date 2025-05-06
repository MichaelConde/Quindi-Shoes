import { check, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express'; // Necesitas los tipos de Express

export const validatorParams: ValidationChain[] = [
    check('correo').isEmail().withMessage('Debe ser un correo válido'),
    check('contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  check('nombres').isLength({ min: 1, max: 255 }),
  check('direccion').isLength({ min: 1, max: 255 }),
  check('telefono').isLength({ min: 1, max: 255 }),
  check('apellidos').isLength({ min: 1, max: 255 })
];

export function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Errores de validación:", errors.array()); // 👈 esto imprime el detalle
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}