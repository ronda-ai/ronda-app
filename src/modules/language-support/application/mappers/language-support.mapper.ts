
import { LanguageSupport } from "../../domain/language-support.entity";
import { LanguageSupportDTO } from "../dtos/language-support.dto";


export class LanguageSupportMapper {
    public static toDTO(support: LanguageSupport): LanguageSupportDTO {
        return {
            id: support.id,
            studentId: support.studentId.toString(),
            nativeLanguage: support.nativeLanguage,
            focusAreas: support.focusAreas,
            teacherGuide: support.teacherGuide,
            studentMaterial: support.studentMaterial,
            studentMaterialTranslation: support.studentMaterialTranslation,
            materialType: support.materialType,
            feedback: support.feedback,
            audioUrl: support.audioUrl,
            createdAt: support.createdAt.toISOString(),
            updatedAt: support.updatedAt.toISOString(),
        };
    }
}
