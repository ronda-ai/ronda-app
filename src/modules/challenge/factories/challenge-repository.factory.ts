
import { MongooseChallengeRepository } from "../infrastructure/persistence/mongoose/challenge.repository";
import { IChallengeRepository } from '../domain/interfaces/challenge-repository.interface';
import { ChallengeEncryptionRepository } from '../infrastructure/persistence/mongoose/challenge-encryption.repository';
import { EncryptionService } from '@/services/encryption.service';

let _challengeRepositoryInstance: IChallengeRepository;

export function createChallengeRepository(): IChallengeRepository {
    if(!_challengeRepositoryInstance){
        const mongooseRepository = new MongooseChallengeRepository();
        const encryptionService = new EncryptionService();
        _challengeRepositoryInstance = new ChallengeEncryptionRepository(mongooseRepository, encryptionService);
    }
    return _challengeRepositoryInstance;
}
