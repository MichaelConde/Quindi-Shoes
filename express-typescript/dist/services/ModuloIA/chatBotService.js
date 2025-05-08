"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const ProductoRepository_1 = __importDefault(require("../../repositories/ModuloProductos/ProductoRepository"));
const axios_1 = __importDefault(require("axios"));
class ChatService {
    obtenerProductosPorIA(question, history) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtenemos todos los productos de la base de datos
            console.log("Obteniendo productos para el chatbot...");
            const rawProducts = yield ProductoRepository_1.default.obtenerTodos();
            // Mapeamos los datos crudos a objetos del tipo Producto
            const products = Array.isArray(rawProducts)
                ? rawProducts.map((p) => ({
                    nombre: p.nombre_producto,
                    precio: p.precio_producto,
                    tallas: String(p.tallas_producto)
                }))
                : [];
            console.log("Productos obtenidos:", products);
            // Generamos el string con los detalles
            const productDetails = products.map(product => `Producto: ${product.nombre}, Precio: ${product.precio}, Tallas disponibles: ${product.tallas}`).join('\n');
            // Llamamos al microservicio
            try {
                const response = yield axios_1.default.post('http://127.0.0.1:8000/chat', {
                    question,
                    history,
                    product_details: productDetails
                });
                console.log("Respuesta del microservicio:", response.data.reply);
                return response.data.reply;
            }
            catch (error) {
                console.error("Error en microservicio IA:", error);
                return { error: "Error al comunicarse con el microservicio FastAPI." };
            }
        });
    }
}
exports.ChatService = ChatService;
