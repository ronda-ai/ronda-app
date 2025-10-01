
interface AdaptationSuggestion {
    title: string;
    description: string;
    reasoning: string;
}

export class ActivityAdaptation {
    constructor(
        public id: any,
        public originalActivity: string,
        public suggestions: AdaptationSuggestion[],
        public createdAt: Date,
        public updatedAt: Date,
        public ageOrGrade?: string,
        public country?: string,
        public subject?: string,
    ) {}
}
