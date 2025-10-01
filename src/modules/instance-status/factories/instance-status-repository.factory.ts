
import { MongooseInstanceStatusRepository } from "../infrastructure/persistence/mongoose/instance-status.repository";
import { IInstanceStatusRepository } from '../domain/interfaces/instance-status-repository.interface';

let _instanceStatusRepository: IInstanceStatusRepository;

export function createInstanceStatusRepository(): IInstanceStatusRepository {
    if (!_instanceStatusRepository) {
        _instanceStatusRepository = new MongooseInstanceStatusRepository();
    }
    return _instanceStatusRepository;
}
