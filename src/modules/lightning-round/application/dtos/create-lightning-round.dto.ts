
import { Challenge } from "./lightning-round.dto";

export interface CreateLightningRoundDTO {
    duration: number;
    interval: number;
    category: string;
    plan: Challenge[];
    feedback?: string;
}
