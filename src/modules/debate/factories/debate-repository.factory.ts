
import { MongooseDebateRepository } from "../infrastructure/persistence/mongoose/debate.repository";
import { IDebateRepository } from '../domain/interfaces/debate-repository.interface';

let _debateRepositoryInstance: IDebateRepository;

export function createDebateRepository(): IDebateRepository {
    if(!_debateRepositoryInstance){
        _debateRepositoryInstance = new MongooseDebateRepository();
    }
    return _debateRepositoryInstance;
}
