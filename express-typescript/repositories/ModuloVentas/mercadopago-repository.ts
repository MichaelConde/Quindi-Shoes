// Ejemplo de un repositorio para guardar preferencias en una base de datos (usando una interfaz genérica)
interface IRepository<T> {
    save(entity: T): Promise<void>;
    // Otros métodos como getById, getAll, etc.
}

export class MercadoPagoRepository implements IRepository<any> { // Reemplaza 'any' con el tipo de tu entidad de preferencia
    async save(preference: any): Promise<void> {
        // Aquí iría la lógica para guardar en la base de datos
        console.log('Guardando preferencia en la base de datos:', preference);
        // Por ejemplo, si estás usando TypeORM:
        // await this.preferenceRepository.save(preference);
    }
    //Implementa los metodos de la interface
}