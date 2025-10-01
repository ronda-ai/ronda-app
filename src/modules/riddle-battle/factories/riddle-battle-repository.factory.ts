
import { MongooseRiddleBattleRepository } from "../infrastructure/persistence/mongoose/riddle-battle.repository";
import { IRiddleBattleRepository } from '../domain/interfaces/riddle-battle-repository.interface';

let _riddleBattleRepositoryInstance: IRiddleBattleRepository;

export function createRiddleBattleRepository(): IRiddleBattleRepository {
    if(!_riddleBattleRepositoryInstance){
        _riddleBattleRepositoryInstance = new MongooseRiddleBattleRepository();
    }
    return _riddleBattleRepositoryInstance;
}
