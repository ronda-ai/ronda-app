
import { generateStudentChallenge as generateStudentChallengeFlow } from '@/ai/flows/generate-student-challenge';
import { GenerateChallengeForStudentInput, GenerateChallengeForStudentOutput } from './dtos/generate-challenge-for-student.dto';
import { ChallengeMapper } from './mappers/challenge.mapper';
import { IChallengeService } from '../domain/interfaces/challenge-service.interface';
import {
    GENERAL_CHALLENGES_EN,
    GENERAL_CHALLENGES_ES,
    LIGHTNING_CHALLENGES_EN,
    LIGHTNING_CHALLENGES_ES
} from '@/config/challenges';
import { IChallengeRepository } from '../domain/interfaces/challenge-repository.interface';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { ChallengeHistoryDTO } from './dtos/challenge-history.dto';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';


export class ChallengeService implements IChallengeService {
    constructor(private readonly challengeRepository: IChallengeRepository) {}

    async createChallenge(dto: CreateChallengeDTO): Promise<ChallengeHistoryDTO> {
        const newChallenge = await this.challengeRepository.create(dto);
        return ChallengeMapper.toHistoryDTO(newChallenge);
    }
    
    async getChallengesByStudentId(studentId: string): Promise<ChallengeHistoryDTO[]> {
        const challenges = await this.challengeRepository.findByStudentId(studentId);
        return challenges.map(ChallengeMapper.toHistoryDTO);
    }
    
    async getAllChallenges(): Promise<ChallengeHistoryDTO[]> {
        const challenges = await this.challengeRepository.findAll();
        return challenges.map(ChallengeMapper.toHistoryDTO);
    }

    async deleteChallengesForStudent(studentId: string): Promise<void> {
        await this.challengeRepository.deleteByStudentId(studentId);
    }

    async generateChallengeForStudent(input: GenerateChallengeForStudentInput): Promise<GenerateChallengeForStudentOutput> {
        try {
            const { students, ...restOfBody } = input;
            
            const nameToAlias: Record<string, string> = {};
            const aliasToName: Record<string, string> = {};
            students.forEach((s: any, index: number) => {
                const alias = `Student ${String.fromCharCode(65 + index)}`;
                nameToAlias[s.name] = alias;
                aliasToName[alias] = s.name;
            });

             const anonymizedStudents = students.map((s: any) => ({
                ...s,
                name: nameToAlias[s.name],
                goodRelations: (s.goodRelations || []).map((name: string) => nameToAlias[name]).filter(Boolean),
                badRelations: (s.badRelations || []).map((name: string) => nameToAlias[name]).filter(Boolean),
            }));

            const anonymizedInput = {
                ...restOfBody,
                students: anonymizedStudents,
            };

            const result = await generateStudentChallengeFlow(anonymizedInput);

            if (!result.challenge) {
                return this.getFallbackChallenge(input.selectionMode, input.language);
            }
            
            let finalChallenge = result.challenge;
            for (const alias in aliasToName) {
                finalChallenge = finalChallenge.replace(new RegExp(alias, 'g'), aliasToName[alias]);
            }
            
            return {
                challenge: finalChallenge,
                tip: result.tip,
            };

        } catch (error) {
            console.error('Failed to generate AI challenge, falling back to static challenges.', error);
            return this.getFallbackChallenge(input.selectionMode, input.language);
        }
    }

    private getFallbackChallenge(mode: string, language: string): GenerateChallengeForStudentOutput {
        const generalChallenges = language === 'es' ? GENERAL_CHALLENGES_ES : GENERAL_CHALLENGES_EN;
        const lightningChallenges = language === 'es' ? LIGHTNING_CHALLENGES_ES : LIGHTNING_CHALLENGES_EN;

        const tip = language === 'es' ? "Por ejemplo, podrías decir 'Entonces, lo que entendí es que... '" : "For example, you could say 'So, what I understood is that... '";
        let challengeText = '';

        switch (mode) {
            case 'lightning':
                challengeText = lightningChallenges[Math.floor(Math.random() * lightningChallenges.length)];
                break;
            default:
                challengeText = generalChallenges[Math.floor(Math.random() * generalChallenges.length)];
                break;
        }

        return {
            challenge: challengeText,
            tip: tip,
        };
    }
}
