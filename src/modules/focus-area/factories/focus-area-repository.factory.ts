
import { MongooseFocusAreaRepository } from "../infrastructure/persistence/mongoose/focus-area.repository";
import { IFocusAreaRepository } from '../domain/interfaces/focus-area-repository.interface';

let _focusAreaRepositoryInstance: IFocusAreaRepository;

export function createFocusAreaRepository(): IFocusAreaRepository {
    if(!_focusAreaRepositoryInstance){
        _focusAreaRepositoryInstance = new MongooseFocusAreaRepository();
    }
    return _focusAreaRepositoryInstance;
}
