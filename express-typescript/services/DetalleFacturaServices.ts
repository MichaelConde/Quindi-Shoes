import DetalleFacturaRepository from "../repositories/DetalleFacturaRepository";
import DetalleFactura from "../Dto/DetalleFacturaDto";

class DetalleFacturaServices {
   
    static async addDetalleFactura(DetalleFactura: DetalleFactura) {
        return await DetalleFacturaRepository.addDetalleFactura(DetalleFactura);
    }

}