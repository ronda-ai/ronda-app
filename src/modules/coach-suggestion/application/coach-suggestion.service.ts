

import { generateCoachSuggestion } from "@/ai/flows/generate-coach-suggestion";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { ICoachSuggestionRepository } from "../domain/interfaces/coach-suggestion-repository.interface";
import { ICoachSuggestionService } from "../domain/interfaces/coach-suggestion-service.interface";
import { CoachSuggestionDTO } from "./dtos/coach-suggestion.dto";
import { CreateCoachSuggestionDTO } from "./dtos/create-coach-suggestion.dto";
import { CoachSuggestionMapper } from "./mappers/coach-suggestion.mapper";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';

export class CoachSuggestionService implements ICoachSuggestionService {
    constructor(
        private readonly coachSuggestionRepository: ICoachSuggestionRepository,
        private readonly anonymizationService: IAnonymizationService
    ) {}

    async createCoachSuggestion(dto: CreateCoachSuggestionDTO): Promise<CoachSuggestionDTO> {
        const newSuggestion = await this.coachSuggestionRepository.create(dto);
        return CoachSuggestionMapper.toDTO(newSuggestion);
    }

    async getCoachSuggestionsForStudent(studentId: string): Promise<CoachSuggestionDTO[]> {
        const suggestions = await this.coachSuggestionRepository.findByStudentId(studentId);
        return suggestions.map(CoachSuggestionMapper.toDTO);
    }

    async deleteSuggestion(id: string): Promise<void> {
        await this.coachSuggestionRepository.delete(id);
    }

    async generateAndCreateSuggestion(input: {
        student: StudentDTO,
        allStudents: StudentDTO[],
        observations: ObservationDTO[],
        language: string
    }): Promise<CoachSuggestionDTO> {
        const { student, allStudents, observations, language } = input;

        // Anonymize all students to create a comprehensive mapping
        const { anonymizedData: _, mapping } = this.anonymizationService.anonymize(allStudents, allStudents);
        
        // Anonymize the main student object separately to pass to the flow
        const { anonymizedData: anonymizedStudent } = this.anonymizationService.anonymize(student, allStudents);

        // Transform challengeHistory to match the flow's expected structure
        const transformedAnonymizedStudent = {
            ...anonymizedStudent,
            challengeHistory: (anonymizedStudent.challengeHistory || []).map(h => ({
                challenge: h.challenge.challenge,
                tip: h.challenge.tip,
                status: h.status,
                rating: h.rating,
                feedback: h.feedback,
                attempts: h.attempts,
                aiConfiguration: h.aiConfiguration,
            }))
        };


        const result = await generateCoachSuggestion({
            student: transformedAnonymizedStudent,
            observations: observations,
            language: language
        });
        
        // De-anonymize all text fields in the structured response
        const deAnonymize = (text: string) => this.anonymizationService.deAnonymizeText(text, mapping);

        const finalSuggestion = {
            title: deAnonymize(result.title),
            positiveAspects: result.positiveAspects.map(deAnonymize),
            areasForImprovement: result.areasForImprovement.map(deAnonymize),
            suggestion: deAnonymize(result.suggestion),
            deepeningQuestion: deAnonymize(result.deepeningQuestion)
        };
        
        const createdSuggestion = await this.createCoachSuggestion({
            studentId: student.id,
            ...finalSuggestion
        });

        return createdSuggestion;
    }
}
