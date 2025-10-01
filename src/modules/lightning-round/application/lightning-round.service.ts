
import { ILightningRoundRepository } from "../domain/interfaces/lightning-round-repository.interface";
import { ILightningRoundService } from "../domain/interfaces/lightning-round-service.interface";
import { LightningRoundDTO } from "./dtos/lightning-round.dto";
import { generateLightningRound } from "@/ai/flows/generate-lightning-round";
import { LightningRoundMapper } from "./mappers/lightning-round.mapper";
import { UpdateLightningRoundDTO } from "./dtos/update-lightning-round.dto";

export type ChallengeCategory = 'sound' | 'face' | 'gesture' | 'imitation';

export class LightningRoundService implements ILightningRoundService {
    constructor(private readonly repository: ILightningRoundRepository) {}

    async generateRound(input: {
        students: string[];
        duration: number;
        interval: number;
        category: ChallengeCategory;
        language: string;
        customPrompt?: string;
        negativePrompt?: string;
        history?: LightningRoundDTO[];
    }): Promise<LightningRoundDTO> {
        const result = await generateLightningRound({
            ...input,
            roundHistory: input.history,
        });

        const newRound = await this.repository.create({
            duration: input.duration,
            interval: input.interval,
            category: input.category,
            plan: result.plan,
        });

        return LightningRoundMapper.toDTO(newRound);
    }

    async getAllRounds(): Promise<LightningRoundDTO[]> {
        const rounds = await this.repository.findAll();
        return rounds.map(LightningRoundMapper.toDTO);
    }

    async updateRound(id: string, data: UpdateLightningRoundDTO): Promise<LightningRoundDTO | null> {
        const updatedRound = await this.repository.update(id, data);
        return updatedRound ? LightningRoundMapper.toDTO(updatedRound) : null;
    }

    async deleteRound(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
