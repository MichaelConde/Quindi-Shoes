import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Configuración de variables de entorno
dotenv.config();

// Inicializar express
const app = express();

// Middlewares
app.use(cors()); // Permitir conexiones desde otros orígenes (como el frontend)
app.use(bodyParser.json()); // Leer cuerpos JSON
app.use(express.json()); // Alternativa moderna (también funciona)

// Importar rutas
import register from "./routes/register";
import auth from "./routes/auth";
import profile from "./routes/profile";
import recuperarContrasena from "./routes/RecuperarContrasena";
import reiniciarContrasena from "./routes/reiniciarContrasena"; // ✅
import material_register from "./routes/material_register"; // ✅
import color_register from "./routes/color_register";
import zona_register from "./routes/zona_register"

// import producto from "./routes/producto";

// Usar rutas
app.use("/register", register);
app.use("/auth", auth);
app.use("/profile", profile);

app.use("/RecuperarContrasena", recuperarContrasena); // // ✅
app.use("/reiniciarContrasena", reiniciarContrasena);  // ✅

app.use("/material_register", material_register); // ✅
app.use("/color_register", color_register);
app.use("/zona_register", zona_register);
// app.use("/producto", producto);

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto:", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});