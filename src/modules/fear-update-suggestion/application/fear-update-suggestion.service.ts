
import { generateFearUpdateSuggestion } from "@/ai/flows/generate-fear-update-suggestion";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IFearUpdateSuggestionRepository } from "../domain/interfaces/fear-update-suggestion-repository.interface";
import { IFearUpdateSuggestionService } from "../domain/interfaces/fear-update-suggestion-service.interface";
import { CreateFearUpdateSuggestionDTO } from "./dtos/create-fear-update-suggestion.dto";
import { FearUpdateSuggestionDTO } from "./dtos/fear-update-suggestion.dto";
import { FearUpdateSuggestionMapper } from "./mappers/fear-update-suggestion.mapper";

export class FearUpdateSuggestionService implements IFearUpdateSuggestionService {
    constructor(private readonly repository: IFearUpdateSuggestionRepository) {}

    async createSuggestion(dto: CreateFearUpdateSuggestionDTO): Promise<FearUpdateSuggestionDTO> {
        const newSuggestion = await this.repository.create(dto);
        // The DTO needs hasUpdate to be true to match the expected return type from the API route.
        // The service layer itself doesn't need to know about this, but we add it for API consistency.
        return { ...FearUpdateSuggestionMapper.toDTO(newSuggestion), hasUpdate: true };
    }

    async processTeacherFeedback(input: { student: Pick<StudentDTO, "name" | "fears">; originalSuggestion: string; teacherFeedback: string; language: string; originalSuggestionId: string; }): Promise<Partial<FearUpdateSuggestionDTO> & { hasUpdate: boolean; }> {
        const result = await generateFearUpdateSuggestion({
            student: {
                ...input.student,
                fears: input.student.fears || [],
            },
            originalSuggestion: input.originalSuggestion,
            teacherFeedback: input.teacherFeedback,
            language: input.language
        });

        if (result.hasUpdate && result.fearToUpdate && result.updateProposal) {
            // We don't save the update suggestion to the database, as it's a transient proposal for the UI
            return { 
                hasUpdate: true, 
                fearToUpdate: result.fearToUpdate, 
                updateProposal: result.updateProposal 
            };
        }
        
        return { hasUpdate: false };
    }
}
