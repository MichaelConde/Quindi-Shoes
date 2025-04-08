class ZonaProducto{
    _nombreZona: string;

    constructor(_nombreZona:string) {
        this._nombreZona = _nombreZona;
    }

    get nombreZona(): string {
        return this._nombreZona;
    }

    set nombreZona(nombreZona: string) {
        this._nombreZona = nombreZona;
    }
}
export default ZonaProducto;