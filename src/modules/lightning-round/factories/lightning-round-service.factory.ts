
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { LightningRoundService } from "../application/lightning-round.service";
import { ILightningRoundRepository } from "../domain/interfaces/lightning-round-repository.interface";
import { ILightningRoundService } from '../domain/interfaces/lightning-round-service.interface';

let _lightningRoundServiceInstance: ILightningRoundService;

export function createLightningRoundService(): ILightningRoundService {
    if(!_lightningRoundServiceInstance){
        const repository = container.resolve<ILightningRoundRepository>(SERVICE_KEYS.LightningRoundRepository);
        _lightningRoundServiceInstance = new LightningRoundService(repository);
    }
    return _lightningRoundServiceInstance;
}
