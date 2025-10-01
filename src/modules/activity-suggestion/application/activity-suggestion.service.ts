

import { generateActivitySuggestions } from "@/ai/flows/generate-activity-suggestions";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IActivitySuggestionRepository } from "../domain/interfaces/activity-suggestion-repository.interface";
import { IActivitySuggestionService } from "../domain/interfaces/activity-suggestion-service.interface";
import { ActivitySuggestionDTO } from "./dtos/activity-suggestion.dto";
import { CreateActivitySuggestionDTO } from "./dtos/create-activity-suggestion.dto";
import { ActivitySuggestionMapper } from "./mappers/activity-suggestion.mapper";

export class ActivitySuggestionService implements IActivitySuggestionService {
    constructor(private readonly repository: IActivitySuggestionRepository) {}

    async createSuggestion(dto: CreateActivitySuggestionDTO): Promise<ActivitySuggestionDTO> {
        const newSuggestion = await this.repository.create(dto);
        return ActivitySuggestionMapper.toDTO(newSuggestion);
    }

    async generateAndCreateSuggestion(student: StudentDTO, language: string): Promise<ActivitySuggestionDTO> {
        const result = await generateActivitySuggestions({
            student: {
                ...student,
                challengeHistory: student.challengeHistory || [], // ensure it's not undefined
            },
            language: language
        });

        const createdSuggestion = await this.createSuggestion({
            studentId: student.id,
            topics: result.topics,
            themes: result.themes
        });

        return { ...createdSuggestion, ...result };
    }
}
