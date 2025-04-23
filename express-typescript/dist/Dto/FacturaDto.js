"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Factura {
    constructor(precio_total, fecha, id_cliente) {
        this._precio_total = precio_total;
        this._fecha = fecha;
        this._id_cliente = id_cliente;
    }
    get precio_total() {
        return this._precio_total;
    }
    get fecha() {
        return this._fecha;
    }
    get id_cliente() {
        return this._id_cliente;
    }
    set precio_total(precio_total) {
        this._precio_total = precio_total;
    }
    set fecha(fecha) {
        this._fecha = fecha;
    }
    set id_cliente(id_cliente) {
        this._id_cliente = id_cliente;
    }
}
exports.default = Factura;
