"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vista {
    constructor(nombreVista) {
        this._nombreVista = nombreVista;
    }
    get nombreVista() {
        return this._nombreVista;
    }
    set nombreVista(nombreVista) {
        this._nombreVista = nombreVista;
    }
}
exports.default = Vista;
