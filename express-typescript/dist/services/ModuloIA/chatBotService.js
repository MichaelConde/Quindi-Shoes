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
exports.getChatResponse = void 0;
const axios_1 = __importDefault(require("axios"));
const CHAT_API_URL = 'http://127.0.0.1:8000/chat'; // URL de tu microservicio
const getChatResponse = (question, history) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Pregunta enviada al microservicio:', question);
        // Recorta historial a los últimos 4 mensajes (opcional pero recomendado)
        const lastMessages = history.slice(-4);
        const formattedRequest = {
            inputs: [
                ...lastMessages,
                { role: "user", content: question } // Añades la pregunta actual
            ]
        };
        const response = yield axios_1.default.post(CHAT_API_URL, formattedRequest);
        console.log('Respuesta del microservicio:', response.data);
        return response.data.reply;
    }
    catch (error) {
        console.error('Error al comunicarse con el microservicio:', error);
        throw new Error('Error al procesar la respuesta del microservicio');
    }
});
exports.getChatResponse = getChatResponse;
