"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producto {
    constructor(tipoProducto, nombreProducto, generoProducto, stockProducto, tallaProducto, precioProducto, colorProducto, imagenProducto) {
        this._tipoProducto = tipoProducto;
        this._nombreProducto = nombreProducto;
        this._generoProducto = generoProducto;
        this._stockProducto = stockProducto;
        this._tallaProducto = tallaProducto;
        this._precioProducto = precioProducto;
        this._colorProducto = colorProducto;
        this._imagenProducto = imagenProducto;
    }
    // Getters
    get tipoProducto() {
        return this._tipoProducto;
    }
    get nombreProducto() {
        return this._nombreProducto;
    }
    // get reseñaProducto(): string {
    //     return this._reseñaProducto;
    // }   
    get generoProducto() {
        return this._generoProducto;
    }
    get stockProducto() {
        return this._stockProducto;
    }
    get tallaProducto() {
        return this._tallaProducto;
    }
    get precioProducto() {
        return this._precioProducto;
    }
    get colorProducto() {
        return this._colorProducto;
    }
    get imagenProducto() {
        return this._imagenProducto;
    }
    // Setters
    set tipoProducto(tipoProducto) {
        this._tipoProducto = tipoProducto;
    }
    set nombreProducto(nombreProducto) {
        this._nombreProducto = nombreProducto;
    }
    // set reseñaProducto(reseñaProducto: string) {
    //     this._reseñaProducto = reseñaProducto;
    // }
    set generoProducto(generoProducto) {
        this._generoProducto = generoProducto;
    }
    set stockProducto(stockProducto) {
        this._stockProducto = stockProducto;
    }
    set tallaProducto(tallaProducto) {
        this._tallaProducto = tallaProducto;
    }
    set precioProducto(precioProducto) {
        this._precioProducto = precioProducto;
    }
    set colorProducto(colorProducto) {
        this._colorProducto = colorProducto;
    }
    set imagenProducto(imagenProducto) {
        this._imagenProducto = imagenProducto;
    }
}
exports.default = Producto;
