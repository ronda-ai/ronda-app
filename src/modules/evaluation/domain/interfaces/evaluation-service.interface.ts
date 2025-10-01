
import { EvaluateChallengeDTO } from "../../application/dtos/evaluate-challenge.dto";

export interface IEvaluationService {
    evaluateChallenge(input: EvaluateChallengeDTO): Promise<void>;
}
