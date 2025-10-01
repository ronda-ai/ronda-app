import { GridFSStorageRepository } from "../infrastructure/persistence/gridfs.storage.repository";
import { IStorageRepository } from '../domain/interfaces/storage-repository.interface';

let _storageRepositoryInstance: IStorageRepository;

export function createStorageRepository(): IStorageRepository {
    if(!_storageRepositoryInstance){
        // Default to GridFS for now. Could be made configurable later.
        _storageRepositoryInstance = new GridFSStorageRepository();
    }
    return _storageRepositoryInstance;
}
