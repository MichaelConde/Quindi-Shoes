"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ZonaProducto {
    constructor(_nombre_zona) {
        this._nombre_zona = _nombre_zona;
    }
    get nombre_zona() {
        return this._nombre_zona;
    }
    set nombreZona(nombre_zona) {
        this._nombre_zona = nombre_zona;
    }
}
exports.default = ZonaProducto;
