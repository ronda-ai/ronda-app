

import { IAIConfigurationService } from "@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface";
import { IRubricSuggestionRepository } from "../domain/interfaces/rubric-suggestion-repository.interface";
import { IRubricSuggestionService } from "../domain/interfaces/rubric-suggestion-service.interface";
import { RubricSuggestionDTO } from "./dtos/rubric-suggestion.dto";
import { CreateRubricSuggestionDTO } from "./dtos/create-rubric-suggestion.dto";
import { RubricSuggestionMapper } from "./mappers/rubric-suggestion.mapper";
import { generateRubric } from "@/ai/flows/generate-rubric";
import { TestBlock } from "@/modules/test/domain/test.entity";
import { ScoringSection } from "./dtos/rubric-suggestion.dto";

export class RubricSuggestionService implements IRubricSuggestionService {
    constructor(
        private readonly repository: IRubricSuggestionRepository,
        private readonly aiConfigurationService: IAIConfigurationService,
    ) {}

    async createSuggestion(dto: CreateRubricSuggestionDTO, language: string, blocks?: TestBlock[]): Promise<RubricSuggestionDTO> {
        const aiConfig = await this.aiConfigurationService.getConfiguration();

        if (!dto.activityDescription) {
            throw new Error("Activity description is required to generate a rubric.");
        }

        const result = await generateRubric({
            activityDescription: dto.activityDescription,
            language: language,
            ageOrGrade: aiConfig?.ageOrGrade,
            subject: aiConfig?.subject,
            blocks,
            existingRubric: (dto.criteria && dto.criteria.length > 0) ? {
                criteria: dto.criteria,
                suggestedScoring: dto.suggestedScoring || []
            } : undefined
        });

        const dbPayload: CreateRubricSuggestionDTO = {
            activityDescription: dto.activityDescription,
            criteria: result.criteria,
            suggestedScoring: result.suggestedScoring,
        };
        
        if (dto.id) {
            const updatedRubric = await this.repository.update(dto.id, dbPayload);
             if (!updatedRubric) {
                throw new Error("Rubric not found for update");
            }
            return RubricSuggestionMapper.toDTO(updatedRubric);

        } else {
            const savedRubric = await this.repository.create(dbPayload);
            return RubricSuggestionMapper.toDTO(savedRubric);
        }
    }
    
    async getAllSuggestions(): Promise<RubricSuggestionDTO[]> {
        const suggestions = await this.repository.findAll();
        return suggestions.map(RubricSuggestionMapper.toDTO);
    }

    async deleteSuggestion(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
