"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoRepository = void 0;
class MercadoPagoRepository {
    save(preference) {
        return __awaiter(this, void 0, void 0, function* () {
            // Aquí iría la lógica para guardar en la base de datos
            console.log('Guardando preferencia en la base de datos:', preference);
            // Por ejemplo, si estás usando TypeORM:
            // await this.preferenceRepository.save(preference);
        });
    }
}
exports.MercadoPagoRepository = MercadoPagoRepository;
