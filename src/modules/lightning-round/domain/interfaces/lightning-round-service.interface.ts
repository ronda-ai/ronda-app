
import { ChallengeCategory } from "../../application/lightning-round.service";
import { LightningRoundDTO } from "../../application/dtos/lightning-round.dto";
import { UpdateLightningRoundDTO } from "../../application/dtos/update-lightning-round.dto";

export interface ILightningRoundService {
    generateRound(input: {
        students: string[];
        duration: number;
        interval: number;
        category: ChallengeCategory;
        language: string;
        customPrompt?: string;
        negativePrompt?: string;
        history?: LightningRoundDTO[];
    }): Promise<LightningRoundDTO>;
    getAllRounds(): Promise<LightningRoundDTO[]>;
    updateRound(id: string, data: UpdateLightningRoundDTO): Promise<LightningRoundDTO | null>;
    deleteRound(id: string): Promise<void>;
}
