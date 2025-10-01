

import { RubricSuggestion } from "@/modules/rubric-suggestion/domain/rubric-suggestion.entity";
import mongoose from "mongoose";

export type TestStatus = 'draft' | 'live' | 'closed';

export interface MultipleChoiceOption {
    text: string;
}

export interface Question {
    id: string;
    text: string;
    options?: MultipleChoiceOption[];
    answer?: string | number | boolean;
}

export interface TestBlock {
    id: string;
    type: 'multiple-choice' | 'true-false' | 'open-ended';
    title: string;
    questions: Question[];
}

export class Test {
    constructor(
        public id: any,
        public storyId: string,
        public storyTitle: string,
        public title: string,
        public blocks: TestBlock[],
        public rubricId: mongoose.Types.ObjectId | RubricSuggestion,
        public createdAt: Date,
        public updatedAt: Date,
        public status: TestStatus = 'draft',
        public liveId?: string,
        public activeStudentIds: string[] = [], // Changed from optional to required with default
    ) {}
}
