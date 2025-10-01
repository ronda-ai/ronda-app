import { MongooseDigitalConvivialityActivityRepository } from "../infrastructure/persistence/mongoose/digital-conviviality-activity.repository";
import { IDigitalConvivialityActivityRepository } from "../domain/interfaces/digital-conviviality-activity-repository.interface";

let _repositoryInstance: IDigitalConvivialityActivityRepository;

export function createDigitalConvivialityActivityRepository(): IDigitalConvivialityActivityRepository {
    if(!_repositoryInstance){
        _repositoryInstance = new MongooseDigitalConvivialityActivityRepository();
    }
    return _repositoryInstance;
}
