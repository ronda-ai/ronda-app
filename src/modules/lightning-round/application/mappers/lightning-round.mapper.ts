
import { LightningRound } from "../../domain/lightning-round.entity";
import { LightningRoundDTO } from "../dtos/lightning-round.dto";

export class LightningRoundMapper {
    public static toDTO(round: LightningRound): LightningRoundDTO {
        return {
            id: round.id,
            duration: round.duration,
            interval: round.interval,
            category: round.category,
            plan: round.plan,
            feedback: round.feedback,
            createdAt: round.createdAt.toISOString(),
        };
    }
}
