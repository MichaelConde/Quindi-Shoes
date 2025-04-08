import db from '../../config/config-db';
import User from '../../Dto/UsuarioDto';
import Auth from '../../Dto/AuthDto';
import bcrypt from 'bcryptjs';



class UsuarioRepository {

    static async addUser(user: User){
        const sql = 'call Insertar_usuarios(?, ?, ?, ?, ?, ?);';
        const values = [user.nombres,user.apellidos,user.telefono,user.direction,user.email,user.password];
        return db.execute(sql, values);
    }

    static async loginUser(auth: Auth) {
      const sql = 'SELECT id, contraseña FROM users WHERE correo=?;';
      const values = [auth.email];
  
      try {
          const [result]: any = await db.execute(sql, values);
  
          if (!auth.password) {
              return { logged: false, status: "Password is required" };
          }
  
          if (!result || result.length === 0 || !result[0]) {
              console.log("Usuario no encontrado en la base de datos.");
              return { logged: false, status: "Invalid username or password" };
          }
  
          if (!result[0].contraseña) {
              console.log("Error: la contraseña en la base de datos es NULL o undefined.");
              return { logged: false, status: "Invalid username or password" };
          }
         
          const isPasswordValid = await bcrypt.compare(auth.password, result[0].contraseña);
  
          if (isPasswordValid) {
              return { logged: true, status: "Successful authentication", id: result[0].id };
          }
  
          return { logged: false, status: "Invalid username or password" };
  
      } catch (error) {
          console.error("Error during login:", error);
          return { logged: false, status: "Server error" };
      }
  }
 
}


export default UsuarioRepository;