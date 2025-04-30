"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auth {
    constructor(correo, contraseña, rol) {
        this._rol = rol;
        this._correo = correo;
        this._contraseña = contraseña;
    }
    // Getters
    get correo() {
        return this._correo;
    }
    get rol() {
        return this._rol;
    }
    get contraseña() {
        return this._contraseña;
    }
    // Setters
    set correo(correo) {
        this._correo = correo;
    }
    set rol(rol) {
        this._rol = rol;
    }
    set contraseña(contraseña) {
        this._contraseña = contraseña;
    }
}
exports.default = Auth;
