
import { MongooseLightningRoundRepository } from "../infrastructure/persistence/mongoose/lightning-round.repository";
import { ILightningRoundRepository } from '../domain/interfaces/lightning-round-repository.interface';

let _lightningRoundRepositoryInstance: ILightningRoundRepository;

export function createLightningRoundRepository(): ILightningRoundRepository {
    if(!_lightningRoundRepositoryInstance){
        _lightningRoundRepositoryInstance = new MongooseLightningRoundRepository();
    }
    return _lightningRoundRepositoryInstance;
}
