import { ILightningRoundRepository } from "../../../domain/interfaces/lightning-round-repository.interface";
import { CreateLightningRoundDTO } from "../../../application/dtos/create-lightning-round.dto";
import { LightningRound } from "../../../domain/lightning-round.entity";
import { UpdateLightningRoundDTO } from "@/modules/lightning-round/application/dtos/update-lightning-round.dto";

export class SupabaseLightningRoundRepository implements ILightningRoundRepository {
    findAll(): Promise<LightningRound[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateLightningRoundDTO): Promise<LightningRound | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateLightningRoundDTO): Promise<LightningRound> {
        throw new Error("Method not implemented.");
    }
}
