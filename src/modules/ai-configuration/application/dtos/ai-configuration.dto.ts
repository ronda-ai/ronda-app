

export interface ThemeColors {
    name?: string;
    primary?: string;
    background?: string;
    accent?: string;
}

export interface AIConfigurationDTO {
    id: string;
    className?: string;
    classInterests?: string[];
    subject: string;
    ageOrGrade: string;
    country: string;
    challengeLocation: string;
    customPrompt?: string;
    negativePrompt?: string;
    plugin?: string;
    modelName?: string;
    ollamaBaseUrl?: string;
    analysisLevel?: 'low' | 'medium' | 'high';
    theme?: ThemeColors;
    createdAt: string;
    updatedAt: string;
}
