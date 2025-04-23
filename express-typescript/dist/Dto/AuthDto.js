"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auth {
    constructor(correo, contraseña) {
        this._correo = correo;
        this._contraseña = contraseña;
    }
    // Getters
    get correo() {
        return this._correo;
    }
    get contraseña() {
        return this._contraseña;
    }
    // Setters
    set correo(correo) {
        this._correo = correo;
    }
    set contraseña(contraseña) {
        this._contraseña = contraseña;
    }
}
exports.default = Auth;
