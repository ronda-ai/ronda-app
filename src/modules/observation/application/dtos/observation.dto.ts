
export type ObservationType = 'positive' | 'negative' | 'neutral' | 'academic' | 'social-emotional';

export interface ObservationDTO {
    id: string;
    studentId: string;
    observation: string;
    type: ObservationType;
    tags: string[];
    deepeningQuestion?: string;
    createdAt: string;
}
