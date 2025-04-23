"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Colores {
    constructor(_nombreColor, _codigoHax) {
        this._nombreColor = _nombreColor;
        this._codigoHax = _codigoHax;
    }
    get nombreColor() {
        return this._nombreColor;
    }
    get codigoHax() {
        return this._codigoHax;
    }
    set nombreColor(nombreColor) {
        this._nombreColor = nombreColor;
    }
    set codigoHax(codigoHax) {
        this._codigoHax = codigoHax;
    }
}
exports.default = Colores;
