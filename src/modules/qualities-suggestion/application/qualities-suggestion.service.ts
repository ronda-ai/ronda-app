
import { generateQualitiesSuggestion } from "@/ai/flows/generate-qualities-suggestion";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IQualitiesSuggestionRepository } from "../domain/interfaces/qualities-suggestion-repository.interface";
import { IQualitiesSuggestionService } from "../domain/interfaces/qualities-suggestion-service.interface";
import { QualitiesSuggestionDTO } from "./dtos/qualities-suggestion.dto";
import { CreateQualitiesSuggestionDTO } from "./dtos/create-qualities-suggestion.dto";
import { QualitiesSuggestionMapper } from "./mappers/qualities-suggestion.mapper";

export class QualitiesSuggestionService implements IQualitiesSuggestionService {
    constructor(private readonly qualitiesSuggestionRepository: IQualitiesSuggestionRepository) {}

    async createQualitiesSuggestion(dto: CreateQualitiesSuggestionDTO): Promise<QualitiesSuggestionDTO> {
        const newSuggestion = await this.qualitiesSuggestionRepository.create(dto);
        return QualitiesSuggestionMapper.toDTO(newSuggestion);
    }

    async getQualitiesSuggestionsForStudent(studentId: string): Promise<QualitiesSuggestionDTO[]> {
        const suggestions = await this.qualitiesSuggestionRepository.findByStudentId(studentId);
        return suggestions.map(QualitiesSuggestionMapper.toDTO);
    }

    async generateAndCreateSuggestion(student: StudentDTO, language: string): Promise<{ suggestions: string[] }> {
        const transformedHistory = (student.challengeHistory || [])
            .filter(h => h.status === 'pending' || h.status === 'evaluated')
            .map(h => ({
                challenge: h.challenge.challenge,
                tip: h.challenge.tip,
                status: h.status as 'pending' | 'evaluated',
                rating: h.rating,
                feedback: h.feedback,
            }));

        const result = await generateQualitiesSuggestion({
            student: {
                ...student,
                challengeHistory: transformedHistory,
            },
            language,
        });

        const suggestions = result.suggestions.split(',').map(s => s.trim()).filter(Boolean);

        if (suggestions.length > 0) {
            await this.createQualitiesSuggestion({
                studentId: student.id,
                suggestions: suggestions,
            });
        }
        
        return { suggestions };
    }
}
