import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Configuración de variables de entorno
dotenv.config();

// Inicializar express
const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
    exposedHeaders: ["x-renewed-token"], 
  }));
  
app.use(express.json()); // Alternativa moderna (también funciona)

// Importar rutas
import register from "./routes/register";
import auth from "./routes/auth";
import profile from "./routes/profile";
import recuperarContrasena from "./routes/RecuperarContrasena";
import reiniciarContrasena from "./routes/reiniciarContrasena"; // ✅
import materialRouter from "./routes/material";
import colorRouter from "./routes/color";
import zonaRouter from "./routes/zonaProductos";
import productoRouter from "./routes/producto";
import empleadoRouter from "./routes/empleado";
import carrioRouter from "./routes/carrito_compras"; // ✅
import buscadorProductosRouter from "./routes/buscadorProducto"; // ✅
import cambiarContrasenaRouter from "./routes/cambiarContrasena";
import verificarCorreoRoute from './routes/verificarCorreo'
import chatRoutes from "./routes/chatBot"; // ✅



app.use("/register", register);  
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/RecuperarContrasena", recuperarContrasena); // // ✅
app.use("/reiniciarContrasena", reiniciarContrasena);  // ✅
app.use("/RecuperarContrasena", recuperarContrasena); 
app.use("/reiniciarContrasena", reiniciarContrasena); 
app.use("/cambiarContrasenaR", cambiarContrasenaRouter); // ✅
app.use("/producto", productoRouter);
app.use("/empleado", empleadoRouter);
app.use("/carrito",carrioRouter)    
app.use("/material", materialRouter);
app.use("/color", colorRouter);
app.use("/zonaProducto", zonaRouter);
app.use("/buscadorProducto", buscadorProductosRouter);
app.use(verificarCorreoRoute);
app.use('/api', chatRoutes);


app.use("/buscadorProducto", buscadorProductosRouter); // ✅

// Rutas de reseñas
import reseña from "./routes/reseña"; // ✅
app.use("/reseña", reseña); // ✅

// Dettalle de producto
import productoDetalleRouter from "./routes/productoDetalle";
app.use("/productoDetalle", productoDetalleRouter);



// Puerto

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto:", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});