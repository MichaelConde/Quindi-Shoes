import { Request, Response } from "express";
import User from '../Dto/UsuarioDto';
import UserService from '../services/UserServices';


let register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      lastName,
      phoneNumber,
      Direction,
      email,
      password
    } = req.body;
    const registerUser = await UserService.register(new User(name,lastName, phoneNumber, Direction, email ,password, ))
    return res.status(201).json(
      { status: 'register ok'}
    );
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).json({ errorInfo: error.sqlMessage }
      );
    }
  }
}


export default register;