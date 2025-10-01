
export interface PblProjectDTO {
    id: string;
    topic: string;
    skills: string[];
    duration: string;
    essentialQuestion: string;
    phases: string;
    milestones: string;
    finalProductSuggestion: string;
    ageOrGrade?: string; // Added field
    createdAt: string;
    updatedAt: string;
}
