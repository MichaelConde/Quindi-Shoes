"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ZonaProducto {
    constructor(_nombreZona) {
        this._nombreZona = _nombreZona;
    }
    get nombreZona() {
        return this._nombreZona;
    }
    set nombreZona(nombreZona) {
        this._nombreZona = nombreZona;
    }
}
exports.default = ZonaProducto;
