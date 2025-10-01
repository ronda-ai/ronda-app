
import { CreateLightningRoundDTO } from "../../application/dtos/create-lightning-round.dto";
import { UpdateLightningRoundDTO } from "../../application/dtos/update-lightning-round.dto";
import { LightningRound } from "../lightning-round.entity";

export interface ILightningRoundRepository {
    create(data: CreateLightningRoundDTO): Promise<LightningRound>;
    findAll(): Promise<LightningRound[]>;
    update(id: string, data: UpdateLightningRoundDTO): Promise<LightningRound | null>;
    delete(id: string): Promise<void>;
}
