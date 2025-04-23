"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Materiales {
    constructor(nombre_material) {
        this._nombre_material = nombre_material;
    }
    get nombre_material() {
        return this._nombre_material;
    }
    set nombre_material(nombre_material) {
        this._nombre_material = nombre_material;
    }
}
exports.default = Materiales;
