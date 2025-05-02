import CarritoRepository from "../../repositories/ModuloCarritoCompras/CarritoRepository";

class CarritoServices{

static async agregarCarrito(id: number) {
return await CarritoRepository.agregarCarrito(id)

}

}
export default CarritoServices;