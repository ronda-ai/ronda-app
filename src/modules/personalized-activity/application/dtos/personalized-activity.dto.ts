

export type PersonalizedActivityStepStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';

export interface PersonalizedActivityStepDTO {
    title: string;
    description: string;
    modality: "Cozy Corner" | "Center Stage" | "Power Duo";
    status: PersonalizedActivityStepStatus;
    feedback?: string;
}

export interface PersonalizedActivityDTO {
    id: string;
    studentId: string;
    topic: string;
    skills: string[];
    themes: string[];
    activities: PersonalizedActivityStepDTO[];
    feedback?: string;
    createdAt: string;
    updatedAt: string;
}
