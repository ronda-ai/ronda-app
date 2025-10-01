
import { MongooseImprovedObservationRepository } from "../infrastructure/persistence/mongoose/improved-observation.repository";
import { IImprovedObservationRepository } from '../domain/interfaces/improved-observation-repository.interface';

let _improvedObservationRepositoryInstance: IImprovedObservationRepository;

export function createImprovedObservationRepository(): IImprovedObservationRepository {
    if(!_improvedObservationRepositoryInstance){
        _improvedObservationRepositoryInstance = new MongooseImprovedObservationRepository();
    }
    return _improvedObservationRepositoryInstance;
}
