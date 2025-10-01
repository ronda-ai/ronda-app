
import { ChallengeHistoryDTO } from "../../application/dtos/challenge-history.dto";
import { CreateChallengeDTO } from "../../application/dtos/create-challenge.dto";
import { GenerateChallengeForStudentInput, GenerateChallengeForStudentOutput } from "../../application/dtos/generate-challenge-for-student.dto";

export interface IChallengeService {
    createChallenge(dto: CreateChallengeDTO): Promise<ChallengeHistoryDTO>;
    getChallengesByStudentId(studentId: string): Promise<ChallengeHistoryDTO[]>;
    getAllChallenges(): Promise<ChallengeHistoryDTO[]>;
    deleteChallengesForStudent(studentId: string): Promise<void>;
    generateChallengeForStudent(input: GenerateChallengeForStudentInput): Promise<GenerateChallengeForStudentOutput>;
}
