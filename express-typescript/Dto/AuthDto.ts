class Auth {
    private _correo: string;
    private _contraseña: string
    constructor(
        correo: string,
        contraseña: string
    ) {
        this._correo = correo;
        this._contraseña = contraseña
    }
    // Getters
    get correo(): string {
        return this._correo;
    }

    get contraseña(): string {
        return this._contraseña;
    }

    // Setters
    set correo(correo: string) {
        this._correo = correo;
    }

    set contraseña(contraseña: string) {
        this._contraseña = contraseña;
    }

}

export default Auth;