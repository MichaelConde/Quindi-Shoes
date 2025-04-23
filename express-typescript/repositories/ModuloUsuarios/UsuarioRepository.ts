import db from '../../config/config-db'
import Auth from '../../Dto/AuthDto';
import bcrypt from 'bcryptjs';
import Usuario from '../../Dto/UsuarioDto';



class UsuarioRepository {
    static async ActualizarContraseña(id: number, nuevaContraseña: string) {
        const sql = 'UPDATE users SET contraseña = ? WHERE id_usuario = ?';
        return await db.execute(sql, [nuevaContraseña, id]);
      }

    static async EncontrarCorreo(correo: string) {
        const sql = 'SELECT * FROM users WHERE correo = ? LIMIT 1';
        const [rows]: any = await db.execute(sql, [correo]);
      
        if (!rows || rows.length === 0) return null;
      
        const usuario = rows[0];
        return {
          id: usuario.id_usuario,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          correo: usuario.correo,
          contraseña: usuario.contraseña,
          // cualquier otro campo necesario
        };
      }

    static async addUser(usuario: Usuario){
        const sql = 'call Insertar_usuarios(?, ?, ?, ?, ?, ?);';
        const values = [usuario.nombres,usuario.apellidos,usuario.telefono,usuario.direccion,usuario.correo,usuario.contraseña];
        const result = await db.execute(sql, values);
        console.log('Resultado desde MySQL:', result);
        return result;
    }

    static async loginUser(auth: Auth) {
      const sql = 'SELECT id_usuario, contraseña FROM users WHERE correo=?;';
      const values = [auth.correo];
  
      try {
          const [result]: any = await db.execute(sql, values);
  
          if (!auth.contraseña) {
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
         
          const isPasswordValid = await bcrypt.compare(auth.contraseña, result[0].contraseña);
  
          if (isPasswordValid) {
              return { logged: true, status: "Successful authentication", id: result[0].id_usuario };
          }
  
          return { logged: false, status: "Invalid username or password" };
  
      } catch (error) {
          console.error("Error during login:", error);
          return { logged: false, status: "Server error" };
      }
  }
 
}


export default UsuarioRepository;