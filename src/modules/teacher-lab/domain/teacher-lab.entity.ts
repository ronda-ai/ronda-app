

import { QuestionAnalysisOutput } from '../application/dtos/question-analysis.dto';

export class ClassroomPulse {
    constructor(
        public id: any,
        public strengths: { mbeCriterion: string; description: string; }[],
        public challenges: { mbeCriterion: string; description: string; }[],
        public createdAt: Date
    ) {}
}

export class PedagogicalMenu {
     constructor(
        public id: any,
        public objective: string,
        public approaches: {
            title: string;
            activities: {
                start: string;
                development: string;
                closure: string;
            };
            mbeJustification: string;
            adaptationSuggestion: string;
        }[],
        public createdAt: Date
    ) {}
}

export type { QuestionAnalysisOutput }; // Re-exporting for simplicity

export class Reflection {
    constructor(
        public id: any,
        public history: {
            role: 'user' | 'model';
            text: string;
        }[],
        public createdAt: Date
    ) {}
}
