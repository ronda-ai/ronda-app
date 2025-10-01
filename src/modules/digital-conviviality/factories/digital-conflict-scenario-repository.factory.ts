
import { MongooseDigitalConflictScenarioRepository } from "../infrastructure/persistence/mongoose/digital-conflict-scenario.repository";
import { IDigitalConflictScenarioRepository } from "../domain/interfaces/digital-conflict-scenario-repository.interface";
import { EncryptionService } from "@/modules/shared/application/encryption.service";
import { DigitalConflictScenarioEncryptionRepository } from '../infrastructure/persistence/mongoose/digital-conflict-scenario-encryption.repository';

let _repositoryInstance: IDigitalConflictScenarioRepository;

export function createDigitalConflictScenarioRepository(): IDigitalConflictScenarioRepository {
    if(!_repositoryInstance){
        const mongooseRepository = new MongooseDigitalConflictScenarioRepository();
        const encryptionService = new EncryptionService();
        _repositoryInstance = new DigitalConflictScenarioEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _repositoryInstance;
}
