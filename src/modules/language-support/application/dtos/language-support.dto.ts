
export type MaterialType = 'story' | 'worksheet' | 'vocabulary-list' | 'dialogue-script';

export interface LanguageSupportDTO {
    id: string;
    studentId: string;
    nativeLanguage: string;
    focusAreas: string[];
    teacherGuide: string;
    studentMaterial: string;
    studentMaterialTranslation: string;
    materialType?: MaterialType;
    feedback?: string;
    audioUrl?: string;
    createdAt: string;
    updatedAt: string;
}
