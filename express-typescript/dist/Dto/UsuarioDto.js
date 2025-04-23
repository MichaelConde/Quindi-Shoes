"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(nombres, apellidos, telefono, direccion, correo, contraseña) {
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._direccion = direccion;
        this._correo = correo;
        this._contraseña = contraseña;
    }
    // Getters
    get nombres() {
        return this._nombres;
    }
    get apellidos() {
        return this._apellidos;
    }
    get telefono() {
        return this._telefono;
    }
    get direccion() {
        return this._direccion;
    }
    get correo() {
        return this._correo;
    }
    get contraseña() {
        return this._contraseña;
    }
    // Setters
    set nombres(nombres) {
        this._nombres = nombres;
    }
    set apellidos(apellidos) {
        this._apellidos = apellidos;
    }
    set telefono(telefono) {
        this._telefono = telefono;
    }
    set direccion(direccion) {
        this._direccion = direccion;
    }
    set correo(correo) {
        this._correo = correo;
    }
    set contraseña(contraseña) {
        this._contraseña = contraseña;
    }
}
exports.default = Usuario;
