

import { MongoosePblRepository, MongooseTeamFormationRepository } from "../infrastructure/persistence/mongoose/pbl.repository";
import { IPblRepository, ITeamFormationRepository } from '../domain/interfaces/pbl-repository.interface';
import { PblProjectEncryptionRepository, TeamFormationEncryptionRepository } from '../infrastructure/persistence/mongoose/pbl-encryption.repository';
import { EncryptionService } from '@/services/encryption.service';

let _projectRepositoryInstance: IPblRepository;
let _teamFormationRepositoryInstance: ITeamFormationRepository;

export function createPblRepository(): IPblRepository {
    if(!_projectRepositoryInstance){
        const mongooseRepository = new MongoosePblRepository();
        const encryptionService = new EncryptionService();
        _projectRepositoryInstance = new PblProjectEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _projectRepositoryInstance;
}
    
export function createTeamFormationRepository(): ITeamFormationRepository {
    if (!_teamFormationRepositoryInstance) {
        const mongooseRepository = new MongooseTeamFormationRepository();
        const encryptionService = new EncryptionService();
        _teamFormationRepositoryInstance = new TeamFormationEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _teamFormationRepositoryInstance;
}

