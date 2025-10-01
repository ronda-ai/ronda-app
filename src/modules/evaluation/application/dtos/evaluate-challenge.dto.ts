
import { ChallengeHistoryDTO } from "@/modules/challenge/application/dtos/challenge-history.dto";

export interface EvaluateChallengeDTO {
    challengeId: string;
    rating: NonNullable<ChallengeHistoryDTO['rating']>;
    feedback?: string;
    mood?: string;
}
