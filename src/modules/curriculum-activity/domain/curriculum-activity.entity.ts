

interface Activity {
    title: string;
    description: string;
    modality: "Cozy Corner" | "Center Stage" | "Power Duo";
}

export class CurriculumActivity {
    constructor(
        public id: any,
        public topic: string,
        public skills: string[],
        public language: string,
        public activities: Activity[],
        public createdAt: Date,
        public updatedAt: Date,
        public ageOrGrade?: string,
        public country?: string,
        public subject?: string,
        public feedback?: string,
        public complexity?: 'beginner' | 'intermediate' | 'advanced',
        public duration?: 'short' | 'medium' | 'long',
        public learningModality?: string,
        public socialDynamic?: string,
        public bloomLevel?: string,
        public resourceConstraints?: string[],
    ) {}
}