

interface ThemeColors {
    name?: string;
    primary?: string;
    background?: string;
    accent?: string;
}

export class AIConfiguration {
    constructor(
        public id: any,
        public subject: string,
        public ageOrGrade: string,
        public country: string,
        public challengeLocation: string,
        public createdAt: Date,
        public updatedAt: Date,
        public className?: string,
        public classInterests?: string[],
        public customPrompt?: string,
        public negativePrompt?: string,
        public plugin?: string,
        public modelName?: string,
        public ollamaBaseUrl?: string,
        public analysisLevel?: 'low' | 'medium' | 'high',
        public theme?: ThemeColors
    ) {}
}
