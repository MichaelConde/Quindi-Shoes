import ProductoRepository from '../../repositories/ModuloProductos/ProductoRepository';
import axios from 'axios';

// Definimos el tipo que vamos a usar
interface Producto {
    nombre: string;
    precio: number;
    tallas: string;
}

export class ChatService {
    
    async obtenerProductosPorIA(question: string, history: any[]) {
        // Obtenemos todos los productos de la base de datos
        console.log("Obteniendo productos para el chatbot...");
        const rawProducts = await ProductoRepository.obtenerTodos();

        // Mapeamos los datos crudos a objetos del tipo Producto
        const products: Producto[] = Array.isArray(rawProducts)
    ? rawProducts.map((p: any) => ({
        nombre: p.nombre_producto,
        precio: p.precio_producto,
        tallas: String(p.tallas_producto)
    }))
    : [];

    console.log("Productos obtenidos:", products);

        // Generamos el string con los detalles
        const productDetails = products.map(product =>
            `Producto: ${product.nombre}, Precio: ${product.precio}, Tallas disponibles: ${product.tallas}`
        ).join('\n');

        // Llamamos al microservicio
        try {
            const response = await axios.post('http://127.0.0.1:8000/chat', {
                question,
                history,
                product_details: productDetails
            });
            console.log("Respuesta del microservicio:", response.data.reply);
            return response.data.reply;
        } catch (error) {
            console.error("Error en microservicio IA:", error);
            return { error: "Error al comunicarse con el microservicio FastAPI." };
        }
    }
}
