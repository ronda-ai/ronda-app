
import { MongooseParticipationRepository } from "../infrastructure/persistence/mongoose/participation.repository";
import { IParticipationRepository } from '../domain/interfaces/participation-repository.interface';

let _participationRepositoryInstance: IParticipationRepository;

export function createParticipationRepository(): IParticipationRepository {
    if(!_participationRepositoryInstance){
        _participationRepositoryInstance = new MongooseParticipationRepository();
    }
    return _participationRepositoryInstance;
}
