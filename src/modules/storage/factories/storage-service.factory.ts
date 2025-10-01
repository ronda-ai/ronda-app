import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { StorageService } from "../application/storage.service";
import { IStorageRepository } from "../domain/interfaces/storage-repository.interface";
import { IStorageService } from '../domain/interfaces/storage-service.interface';

let _storageServiceInstance: IStorageService;

export function createStorageService(): IStorageService {
    if(!_storageServiceInstance){
        const repository = container.resolve<IStorageRepository>(SERVICE_KEYS.StorageRepository);
        _storageServiceInstance = new StorageService(repository);
    }
    return _storageServiceInstance;
}
