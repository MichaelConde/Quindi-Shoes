import Factura from "../Dto/FacturaDto";
import FacturaRepository from "../repositories/FacturaRepository";

class FacturaService{

    
    static async addFactura(Factura: Factura){
        return await FacturaRepository.addFactura(Factura)
    }

}