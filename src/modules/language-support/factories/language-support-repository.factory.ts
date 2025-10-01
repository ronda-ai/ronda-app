
import { MongooseLanguageSupportRepository } from "../infrastructure/persistence/mongoose/language-support.repository";
import { ILanguageSupportRepository } from '../domain/interfaces/language-support-repository.interface';

let _languageSupportRepositoryInstance: ILanguageSupportRepository;

export function createLanguageSupportRepository(): ILanguageSupportRepository {
    if(!_languageSupportRepositoryInstance){
        _languageSupportRepositoryInstance = new MongooseLanguageSupportRepository();
    }
    return _languageSupportRepositoryInstance;
}
