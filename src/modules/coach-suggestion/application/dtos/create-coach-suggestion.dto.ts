
export interface CreateCoachSuggestionDTO {
    studentId: string;
    title: string;
    positiveAspects: string[];
    areasForImprovement: string[];
    suggestion: string;
    deepeningQuestion: string;
}
