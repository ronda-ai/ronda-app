
export interface CoachSuggestionDTO {
    id: string;
    studentId: string;
    title: string;
    positiveAspects: string[];
    areasForImprovement: string[];
    suggestion: string;
    deepeningQuestion: string;
    createdAt: string;
}
