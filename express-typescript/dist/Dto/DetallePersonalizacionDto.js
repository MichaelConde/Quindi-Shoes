"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DetallePersonalizacion {
    constructor(idPersonalizacionCalzado, idMaterial, idColor, idZonaProducto) {
        this._idPersonalizacionCalzado = idPersonalizacionCalzado;
        this._idMaterial = idMaterial;
        this._idColor = idColor;
        this._idZonaProducto = idZonaProducto;
    }
    get idPersonalizacionCalzado() {
        return this._idPersonalizacionCalzado;
    }
    get idMaterial() {
        return this._idMaterial;
    }
    get idColor() {
        return this._idColor;
    }
    get idZonaProducto() {
        return this._idZonaProducto;
    }
    set idPersonalizacionCalzado(idPersonalizacionCalzado) {
        this._idPersonalizacionCalzado = idPersonalizacionCalzado;
    }
    set idMaterial(idMaterial) {
        this._idMaterial = idMaterial;
    }
    set idColor(idColor) {
        this._idColor = idColor;
    }
    set idZonaProducto(idZonaProducto) {
        this._idZonaProducto = idZonaProducto;
    }
}
exports.default = DetallePersonalizacion;
