"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Personalizaion {
    constructor(idProducto) {
        this._idProducto = idProducto;
    }
    get idProducto() {
        return this._idProducto;
    }
    set idProducto(idProducto) {
        this._idProducto = idProducto;
    }
}
exports.default = Personalizaion;
