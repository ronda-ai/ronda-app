
import { CreateQualitiesSuggestionDTO } from "../../application/dtos/create-qualities-suggestion.dto";
import { QualitiesSuggestion } from "../qualities-suggestion.entity";

export interface IQualitiesSuggestionRepository {
    create(data: CreateQualitiesSuggestionDTO): Promise<QualitiesSuggestion>;
    findByStudentId(studentId: string): Promise<QualitiesSuggestion[]>;
}
