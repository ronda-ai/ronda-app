
import { MongooseCrisisScenarioRepository } from "../infrastructure/persistence/mongoose/crisis-scenario.repository";
import { ICrisisScenarioRepository } from "../domain/interfaces/crisis-scenario-repository.interface";

let _repositoryInstance: ICrisisScenarioRepository;

export function createCrisisScenarioRepository(): ICrisisScenarioRepository {
    if(!_repositoryInstance){
        _repositoryInstance = new MongooseCrisisScenarioRepository();
    }
    return _repositoryInstance;
}
