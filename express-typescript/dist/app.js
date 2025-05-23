"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configuración de variables de entorno
dotenv_1.default.config();
// Inicializar express
const app = (0, express_1.default)();
const app2 = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["x-renewed-token"],
}));
// Middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.json()); // Alternativa moderna (también funciona)
// Importar rutas
const register_1 = __importDefault(require("./routes/register"));
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const RecuperarContrasena_1 = __importDefault(require("./routes/RecuperarContrasena"));
const reiniciarContrasena_1 = __importDefault(require("./routes/reiniciarContrasena")); // ✅
const material_1 = __importDefault(require("./routes/material"));
const color_1 = __importDefault(require("./routes/color"));
const zonaProductos_1 = __importDefault(require("./routes/zonaProductos"));
const producto_1 = __importDefault(require("./routes/producto"));
const empleado_1 = __importDefault(require("./routes/empleado"));
const carrito_compras_1 = __importDefault(require("./routes/carrito_compras")); // ✅
const buscadorProducto_1 = __importDefault(require("./routes/buscadorProducto")); // ✅
const cambiarContrasena_1 = __importDefault(require("./routes/cambiarContrasena"));
const verificarCorreo_1 = __importDefault(require("./routes/verificarCorreo"));
const chatBot_1 = __importDefault(require("./routes/chatBot")); // ✅
const pago_routes_1 = __importDefault(require("./routes/pago-routes"));
app.use((req, res, next) => {
    console.log("🛰 Nueva solicitud recibida:");
    console.log("Método:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Headers:", req.headers);
    next();
});
app.use("/api", pago_routes_1.default);
app.use(body_parser_1.default.json());
// import producto from "./routes/producto";
// Usar rutas
app.use("/register", register_1.default);
app.use("/register", register_1.default);
app.use("/auth", auth_1.default);
app.use("/profile", profile_1.default);
app.use("/RecuperarContrasena", RecuperarContrasena_1.default); // // ✅
app.use("/reiniciarContrasena", reiniciarContrasena_1.default); // ✅
// ✅ activa /api/pagos/confirmacion
// app.use("/producto", producto);
app.use("/RecuperarContrasena", RecuperarContrasena_1.default);
app.use("/reiniciarContrasena", reiniciarContrasena_1.default);
app.use("/cambiarContrasenaR", cambiarContrasena_1.default); // ✅
app.use("/producto", producto_1.default);
app.use("/empleado", empleado_1.default);
app.use("/carrito", carrito_compras_1.default);
app.use("/material", material_1.default);
app.use("/color", color_1.default);
app.use("/zonaProducto", zonaProductos_1.default);
app.use("/buscadorProducto", buscadorProducto_1.default);
app.use(verificarCorreo_1.default);
app.use('/api', chatBot_1.default);
app.use("/buscadorProducto", buscadorProducto_1.default); // ✅
// pagos
// Rutas de reseñas
const rese_a_1 = __importDefault(require("./routes/rese\u00F1a")); // ✅
app.use("/reseña", rese_a_1.default); // ✅
// Dettalle de producto
const productoDetalle_1 = __importDefault(require("./routes/productoDetalle"));
app.use("/productoDetalle", productoDetalle_1.default);
// Variantes
const variantes_1 = __importDefault(require("./routes/variantes"));
app.use("/variantes", variantes_1.default);
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor ejecutándose en el puerto:", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
