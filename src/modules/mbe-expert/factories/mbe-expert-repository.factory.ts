
import { MongooseMbeExpertRepository } from "../infrastructure/persistence/mongoose/mbe-expert.repository";
import { IMbeExpertRepository } from '../domain/interfaces/mbe-expert-repository.interface';

let _repositoryInstance: IMbeExpertRepository;

export function createMbeExpertRepository(): IMbeExpertRepository {
    if (!_repositoryInstance) {
        _repositoryInstance = new MongooseMbeExpertRepository();
    }
    return _repositoryInstance;
}
