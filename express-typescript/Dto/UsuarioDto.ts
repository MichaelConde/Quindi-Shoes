class Usuarios {
    private _nombres: string;
    private _apellidos: string;
    private _telefono: string;
    private _direction: string;
    private _email: string;
    private _password: string

    constructor(
        nombres: string, apellidos: string, telefono: string, direction: string, email: string, password: string
    ) {
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._direction = direction;
        this._email = email;
        this._password = password;
    }

    // Getters
    get nombres(): string {
        return this._nombres;
    }

    get apellidos(): string {
        return this._apellidos;
    }

    get telefono(): string {
        return this._telefono;
    }

    get direction(): string {
        return this._direction;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }


    // Setters
    set nombres(nombres: string) {
        this._nombres = nombres;
    }
    set apellidos(apellidos: string) {
        this._apellidos = apellidos;
    }
    set telefono(telefono: string) {
        this._telefono = telefono;
    }
    set direction(direction: string) {
        this._direction = direction;
    }
    set email(email: string) {
        this._email = email;
    }
    set password(password: string) {
        this._password = password;
    }







}

export default Usuarios;