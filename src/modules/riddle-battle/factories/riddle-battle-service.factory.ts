
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { RiddleBattleService } from "../application/riddle-battle.service";
import { IRiddleBattleRepository } from "../domain/interfaces/riddle-battle-repository.interface";
import { IRiddleBattleService } from '../domain/interfaces/riddle-battle-service.interface';

let _riddleBattleServiceInstance: IRiddleBattleService;

export function createRiddleBattleService(): IRiddleBattleService {
    if(!_riddleBattleServiceInstance){
        const repository = container.resolve<IRiddleBattleRepository>(SERVICE_KEYS.RiddleBattleRepository);
        _riddleBattleServiceInstance = new RiddleBattleService(repository);
    }
    return _riddleBattleServiceInstance;
}
