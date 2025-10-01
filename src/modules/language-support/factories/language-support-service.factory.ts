

import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { LanguageSupportService } from "../application/language-support.service";
import { ILanguageSupportRepository } from "../domain/interfaces/language-support-repository.interface";
import { ILanguageSupportService } from '../domain/interfaces/language-support-service.interface';
import { IStorageService } from "@/modules/storage/domain/interfaces/storage-service.interface";

let _languageSupportServiceInstance: ILanguageSupportService;

export function createLanguageSupportService(): ILanguageSupportService {
    if(!_languageSupportServiceInstance){
        const repository = container.resolve<ILanguageSupportRepository>(SERVICE_KEYS.LanguageSupportRepository);
        const storageService = container.resolve<IStorageService>(SERVICE_KEYS.StorageService);
        _languageSupportServiceInstance = new LanguageSupportService(repository, storageService);
    }
    return _languageSupportServiceInstance;
}
