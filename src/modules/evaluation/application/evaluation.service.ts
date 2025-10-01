
import { IEvaluationService } from "../domain/interfaces/evaluation-service.interface";
import { EvaluateChallengeDTO } from "./dtos/evaluate-challenge.dto";
import { Evaluation } from "../domain/evaluation.entity";
import { IChallengeRepository } from "@/modules/challenge/domain/interfaces/challenge-repository.interface";

export class EvaluationService implements IEvaluationService {
    constructor(private readonly challengeRepository: IChallengeRepository) {}

    async evaluateChallenge(input: EvaluateChallengeDTO): Promise<void> {
        const evaluation = new Evaluation(input.rating, input.feedback, input.mood);

        const updateData = {
            status: 'evaluated' as const,
            rating: evaluation.rating,
            feedback: evaluation.feedback,
            mood: evaluation.mood,
        };
        
        await this.challengeRepository.update(input.challengeId, updateData);
    }
}
