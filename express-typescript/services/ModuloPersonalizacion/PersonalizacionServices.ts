import PersonalizacionRepository from "../../repositories/ModuloPersonalizacion/PersonalizacionRepository";
import Materiales from "../../Dto/MaterialesDto";
import Colores from "../../Dto/ColoresDto"; 
import ZonaProducto from "../../Dto/ZonaProductosDto";

class PersonalizacionServices {
    static async addMateriales(materiales: Materiales) {
        return await PersonalizacionRepository.addMateriales(materiales);
    }
    
    static async deleteMateriales(materiales: Materiales) {
        return await PersonalizacionRepository.deleteMateriales(materiales);
    }

    static async addColores(colores: Colores) {
        return await PersonalizacionRepository.addColores(colores);
    }
    static async deleteColores(colores: Colores) {
        return await PersonalizacionRepository.deleteColores(colores);
    }
    static async addZonaProducto(zonaProducto: ZonaProducto) {
        return await PersonalizacionRepository.addZonaProducto(zonaProducto);
    }
    static async deleteZonaProducto(zonaProducto: ZonaProducto) {
        return await PersonalizacionRepository.deleteZonaProducto(zonaProducto);
    }       

}

export default PersonalizacionServices;