
interface AdaptationSuggestion {
    title: string;
    description: string;
    reasoning: string;
}

export interface ActivityAdaptationDTO {
    id: string;
    originalActivity: string;
    suggestions: AdaptationSuggestion[];
    createdAt: string;
}
