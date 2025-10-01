

interface Activity {
    title: string;
    description: string;
    modality: "Cozy Corner" | "Center Stage" | "Power Duo";
}

export interface CurriculumActivityDTO {
    id: string;
    topic: string;
    skills: string[];
    language: string;
    ageOrGrade?: string;
    country?: string;
    subject?: string;
    activities: Activity[];
    feedback?: string;
    complexity?: 'beginner' | 'intermediate' | 'advanced';
    duration?: 'short' | 'medium' | 'long';
    learningModality?: string;
    socialDynamic?: string;
    bloomLevel?: string;
    resourceConstraints?: string[];
    createdAt: string;
    updatedAt: string;
}