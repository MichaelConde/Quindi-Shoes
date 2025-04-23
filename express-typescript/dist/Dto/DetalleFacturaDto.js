"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DetalleFactura {
    constructor(idFactura, idProducto, precioUnitario, subtotal, cantidad) {
        this._idFactura = idFactura;
        this._idProducto = idProducto;
        this._precioUnitario = precioUnitario;
        this._subtotal = subtotal;
        this._cantidad = cantidad;
    }
    get idFactura() {
        return this._idFactura;
    }
    get idProducto() {
        return this._idProducto;
    }
    get precioUnitario() {
        return this._precioUnitario;
    }
    get subtotal() {
        return this._subtotal;
    }
    get cantidad() {
        return this._cantidad;
    }
    set idFactura(idFactura) {
        this._idFactura = idFactura;
    }
    set idProducto(idProducto) {
        this._idProducto = idProducto;
    }
    set precioUnitario(precioUnitario) {
        this._precioUnitario = precioUnitario;
    }
    set subtotal(subtotal) {
        this._subtotal = subtotal;
    }
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }
}
exports.default = DetalleFactura;
