

import { generateFearManagementSuggestion } from "@/ai/flows/generate-fear-management-suggestion";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IFearManagementSuggestionRepository } from "../domain/interfaces/fear-management-suggestion-repository.interface";
import { IFearManagementSuggestionService } from "../domain/interfaces/fear-management-suggestion-service.interface";
import { CreateFearManagementSuggestionDTO } from "./dtos/create-fear-management-suggestion.dto";
import { FearManagementSuggestionDTO, FearManagementStepDTO } from "./dtos/fear-management-suggestion.dto";
import { FearManagementSuggestionMapper } from "./mappers/fear-management-suggestion.mapper";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";

export class FearManagementSuggestionService implements IFearManagementSuggestionService {
    constructor(
        private readonly repository: IFearManagementSuggestionRepository,
        private readonly anonymizationService: IAnonymizationService
        ) {}

    async createSuggestion(dto: CreateFearManagementSuggestionDTO): Promise<FearManagementSuggestionDTO> {
        const newSuggestion = await this.repository.create(dto);
        return FearManagementSuggestionMapper.toDTO(newSuggestion);
    }

    async getSuggestionsForStudent(studentId: string): Promise<FearManagementSuggestionDTO[]> {
        const suggestions = await this.repository.findByStudentId(studentId);
        return suggestions.map(FearManagementSuggestionMapper.toDTO);
    }

    async deleteSuggestion(suggestionId: string): Promise<void> {
        await this.repository.delete(suggestionId);
    }
    
    async addFeedback(suggestionId: string, feedback: string): Promise<FearManagementSuggestionDTO | null> {
        const updatedSuggestion = await this.repository.update(suggestionId, { teacherFeedback: feedback });
        return updatedSuggestion ? FearManagementSuggestionMapper.toDTO(updatedSuggestion) : null;
    }

    async generateAndCreateSuggestion(student: StudentDTO, language: string, targetedFear?: string): Promise<FearManagementSuggestionDTO> {
        
        const { anonymizedData: anonymizedStudent, mapping } = this.anonymizationService.anonymize(student, [student]);

        const result = await generateFearManagementSuggestion({
            student: {
                ...anonymizedStudent,
                fears: anonymizedStudent.fears || [],
            },
            language,
            targetedFear
        });
        
        const deAnonymize = (text: string) => this.anonymizationService.deAnonymizeText(text, mapping);

        const dto: CreateFearManagementSuggestionDTO = {
            studentId: student.id,
            targetedFear: result.targetedFear,
            title: deAnonymize(result.title),
            rationale: deAnonymize(result.rationale),
            steps: result.steps.map(step => ({
                text: deAnonymize(step.text),
                status: 'pending' as const 
            })),
            deepeningQuestion: deAnonymize(result.deepeningQuestion)
        };

        const createdSuggestion = await this.createSuggestion(dto);

        return createdSuggestion;
    }

    async updateStepDetails(suggestionId: string, stepIndex: number, details: Partial<FearManagementStepDTO>): Promise<FearManagementSuggestionDTO | null> {
        const suggestion = await this.repository.findById(suggestionId);
        if (!suggestion) return null;

        if (stepIndex < 0 || stepIndex >= suggestion.steps.length) {
            throw new Error("Step index out of bounds");
        }
        
        const updatedSteps = [...suggestion.steps];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], ...details };

        const updatedSuggestion = await this.repository.update(suggestionId, { steps: updatedSteps });
        return updatedSuggestion ? FearManagementSuggestionMapper.toDTO(updatedSuggestion) : null;
    }
}
