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
// Middlewares
app.use((0, cors_1.default)()); // Permitir conexiones desde otros orígenes (como el frontend)
app.use(body_parser_1.default.json()); // Leer cuerpos JSON
app.use(express_1.default.json()); // Alternativa moderna (también funciona)
// Importar rutas
const register_1 = __importDefault(require("./routes/register"));
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const RecuperarContrasena_1 = __importDefault(require("./routes/RecuperarContrasena"));
const reiniciarContrasena_1 = __importDefault(require("./routes/reiniciarContrasena"));
const producto_1 = __importDefault(require("./routes/producto"));
// import producto from "./routes/producto";
// Usar rutas
app.use("/register", register_1.default);
app.use("/auth", auth_1.default);
app.use("/profile", profile_1.default);
app.use("/RecuperarContrasena", RecuperarContrasena_1.default);
app.use("/reiniciarContrasena", reiniciarContrasena_1.default);
app.use("/producto", producto_1.default);
// Puerto
const PORT = process.env.PORT || 3000;
// Iniciar servidor
app.listen(PORT, () => {
    console.log("Servidor ejecutándose en el puerto:", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
