
export interface Insight {
    title: string;
    description: string;
    studentsInvolved?: string[];
    suggestion?: string;
    tags?: string[];
}

export interface MoodTrendAnalysisDTO {
    id: string;
    studentId?: string;
    analysis: Insight[];
    isClassroomLevel: boolean;
    createdAt: string;
}
