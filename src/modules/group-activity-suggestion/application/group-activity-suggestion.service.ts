import { generateGroupActivitySuggestion } from "@/ai/flows/generate-group-activity-suggestion";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IGroupActivitySuggestionRepository } from "../domain/interfaces/group-activity-suggestion-repository.interface";
import { IGroupActivitySuggestionService } from "../domain/interfaces/group-activity-suggestion-service.interface";
import { GroupActivitySuggestionDTO } from "./dtos/group-activity-suggestion.dto";
import { CreateGroupActivitySuggestionDTO } from "./dtos/create-group-activity-suggestion.dto";
import { GroupActivitySuggestionMapper } from "./mappers/group-activity-suggestion.mapper";

export class GroupActivitySuggestionService implements IGroupActivitySuggestionService {
    constructor(private readonly repository: IGroupActivitySuggestionRepository) {}

    async createSuggestion(dto: CreateGroupActivitySuggestionDTO): Promise<GroupActivitySuggestionDTO> {
        const newSuggestion = await this.repository.create(dto);
        return GroupActivitySuggestionMapper.toDTO(newSuggestion);
    }
    
    async getAllSuggestions(): Promise<GroupActivitySuggestionDTO[]> {
        const suggestions = await this.repository.findAll();
        return suggestions.map(GroupActivitySuggestionMapper.toDTO);
    }

    async deleteSuggestion(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async generateAndCreateSuggestion(students: StudentDTO[], language: string): Promise<GroupActivitySuggestionDTO> {
        const transformedStudents = students.map(student => ({
            ...student,
            challengeHistory: student.challengeHistory.map(h => ({
                ...h,
                challenge: h.challenge.challenge,
            })),
        }));

        const result = await generateGroupActivitySuggestion({
            students: transformedStudents,
            language
        });
        
        const createdSuggestion = await this.createSuggestion({
            teacherTip: result.teacherTip,
            suggestedGroups: result.suggestedGroups,
            suggestedSkills: result.suggestedSkills,
            suggestedThemes: result.suggestedThemes,
        });

        return createdSuggestion;
    }
    
    async generateSuggestionForManualGroup(students: StudentDTO[], language: string): Promise<GroupActivitySuggestionDTO> {
        const transformedStudents = students.map(student => ({
            ...student,
            challengeHistory: student.challengeHistory.map(h => ({
                ...h,
                challenge: h.challenge.challenge,
            })),
        }));

        const result = await generateGroupActivitySuggestion({
            students: transformedStudents,
            language
        });
        
        // This method only generates the suggestion without saving it
        return {
            id: 'temp', // Temporary ID, not saved
            createdAt: new Date().toISOString(),
            ...result
        };
    }
}
