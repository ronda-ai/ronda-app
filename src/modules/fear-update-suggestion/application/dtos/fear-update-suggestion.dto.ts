
export interface FearUpdateSuggestionDTO {
    id: string;
    studentId: string;
    fearToUpdate: string;
    updateProposal: string;
    originalSuggestionId: string;
    hasUpdate: boolean; // We'll add this to conform to the expected return type
    createdAt: string;
}
