
import { MongooseDigitalPactRepository } from "../infrastructure/persistence/mongoose/digital-pact.repository";
import { IDigitalPactRepository } from "../domain/interfaces/digital-pact-repository.interface";
import { EncryptionService } from "@/services/encryption.service";
import { DigitalPactEncryptionRepository } from "../infrastructure/persistence/mongoose/digital-pact-encryption.repository";

let _repositoryInstance: IDigitalPactRepository;

export function createDigitalPactRepository(): IDigitalPactRepository {
    if(!_repositoryInstance){
        const mongooseRepository = new MongooseDigitalPactRepository();
        const encryptionService = new EncryptionService();
        _repositoryInstance = new DigitalPactEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _repositoryInstance;
}
