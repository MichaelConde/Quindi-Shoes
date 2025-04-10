import Materiales from "../../Dto/MaterialesDto";
import Colores from "../../Dto/ColoresDto";
import ZonaProducto from "../../Dto/ZonaProductosDto";
import db from '../../config/config-db';


class PersonalizacionRepository {   
    static async addMateriales(materiales: Materiales) {
        const sql = 'call Insertar_materiales(?, ?, ?, ?, ?, ?, ?);';
        const values = [materiales.nombre_material];
        return db.execute(sql, values);
    }
    
    static async deleteMateriales(materiales: Materiales) {
        const sql = 'BorrarMateriales';
        const values = [materiales.nombre_material];
        return db.execute(sql, values);
    }

    static async addColores(colores: Colores) {
        const sql = 'call Insertar_colores(?, ?, ?, ?, ?, ?, ?);';
        const values = [colores.nombreColor, colores.codigoHax];
        return db.execute(sql, values);
    }   

    static async deleteColores(colores: Colores) {
        const sql = 'BorrarColores';
        const values = [colores.nombreColor, colores.codigoHax];
        return db.execute(sql, values);
    }   

    static async addZonaProducto(zonaProducto: ZonaProducto) {
        const sql = 'call Insertar_zonaProducto(?, ?, ?, ?, ?, ?, ?);';
        const values = [zonaProducto.nombreZona];
        return db.execute(sql, values);
    }

    static async deleteZonaProducto(zonaProducto: ZonaProducto) {
        const sql = 'BorrarZonaProducto';
        const values = [zonaProducto.nombreZona];
        return db.execute(sql, values);
    }   

}

export default PersonalizacionRepository;
