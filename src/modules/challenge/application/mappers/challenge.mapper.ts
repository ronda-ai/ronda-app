
import { Challenge } from "../../domain/challenge.entity";
import { ChallengeHistoryDTO } from "../dtos/challenge-history.dto";
import { GenerateChallengeForStudentOutput } from "../dtos/generate-challenge-for-student.dto";

export class ChallengeMapper {
    public static toDTO(challenge: Challenge): GenerateChallengeForStudentOutput {
        return {
            challenge: challenge.challenge,
            tip: challenge.tip,
        };
    }

    public static toHistoryDTO(challenge: Challenge): ChallengeHistoryDTO {
        return {
            id: challenge.id.toString(),
            studentId: challenge.studentId.toString(),
            challenge: {
                challenge: challenge.challenge,
                tip: challenge.tip,
                createdAt: challenge.createdAt.toISOString(),
            },
            status: challenge.status,
            rating: challenge.rating,
            feedback: challenge.feedback,
            attempts: challenge.attempts,
            aiConfiguration: challenge.aiConfiguration,
            mood: challenge.mood,
            selectionMode: challenge.selectionMode,
        };
    }
}
