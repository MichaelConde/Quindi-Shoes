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
const config_db_1 = __importDefault(require("../../config/config-db"));
class BusquedaRepository {
    static buscarProductosConFiltros(filtros) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, categoria, precioMin, precioMax, marca, color, sexo, talla, tipo } = filtros;
            let sqlObj = { sql: "SELECT * FROM productoReal WHERE 1=1" };
            const values = [];
            // Utilidad para agregar condiciones dinámicamente
            function agregarFiltro(campo, condicion, isLike = false) {
                if (campo !== undefined && campo !== null && campo !== "") {
                    sqlObj.sql += condicion;
                    values.push(isLike ? `%${campo}%` : campo);
                }
            }
            // Aplicamos cada filtro con su respectiva condición
            agregarFiltro(nombre, " AND nombre_producto LIKE ?", true);
            agregarFiltro(categoria, " AND categoria_producto = ?");
            agregarFiltro(precioMin, " AND precio_producto >= ?");
            agregarFiltro(precioMax, " AND precio_producto <= ?");
            agregarFiltro(marca, " AND marca_producto = ?");
            agregarFiltro(color, " AND colores_producto = ?");
            agregarFiltro(sexo, " AND genero_producto = ?");
            agregarFiltro(talla, " AND tallas_producto = ?");
            agregarFiltro(tipo, " AND tipo_producto = ?");
            const [rows] = yield config_db_1.default.execute(sqlObj.sql, values);
            return rows;
        });
    }
    static obtenerSugerencias(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT nombre_producto FROM productoReal WHERE nombre_producto LIKE ? LIMIT 5`;
            const [sugerencias] = yield config_db_1.default.execute(sql, [`%${query}%`]);
            return sugerencias;
        });
    }
}
exports.default = BusquedaRepository;
