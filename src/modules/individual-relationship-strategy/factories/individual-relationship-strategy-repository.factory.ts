
import { MongooseIndividualRelationshipStrategyRepository } from "../infrastructure/persistence/mongoose/individual-relationship-strategy.repository";
import { IIndividualRelationshipStrategyRepository } from '../domain/interfaces/individual-relationship-strategy-repository.interface';
import { IndividualRelationshipStrategyEncryptionRepository } from "../infrastructure/persistence/mongoose/individual-relationship-strategy-encryption.repository";
import { EncryptionService } from "@/modules/shared/application/encryption.service";

let _repositoryInstance: IIndividualRelationshipStrategyRepository;

export function createIndividualRelationshipStrategyRepository(): IIndividualRelationshipStrategyRepository {
    if(!_repositoryInstance){
        const mongooseRepository = new MongooseIndividualRelationshipStrategyRepository();
        const encryptionService = new EncryptionService();
        _repositoryInstance = new IndividualRelationshipStrategyEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _repositoryInstance;
}
