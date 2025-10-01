

import { RubricSuggestionDTO } from "@/modules/rubric-suggestion/application/dtos/rubric-suggestion.dto";
import { TestStatus } from "../../domain/test.entity";
import { TestSubmissionDTO } from "@/modules/test-submission/application/dtos/test-submission.dto";

export type TestBlockType = 'multiple-choice' | 'true-false' | 'open-ended';

export interface MultipleChoiceOption {
    text: string;
}

export interface Question {
    id: string;
    text: string;
    type: TestBlockType;
    options?: MultipleChoiceOption[];
    answer?: string | number | boolean;
}

export interface TestBlock {
    id: string;
    type: TestBlockType;
    title: string;
    questions: Question[];
}

export interface TestDTO {
    id: string;
    storyId: string;
    storyTitle: string;
    title: string;
    blocks: TestBlock[];
    rubricId: string;
    rubric?: RubricSuggestionDTO; // Populated field
    status: TestStatus;
    liveId?: string;
    activeStudentIds?: string[];
    submissions?: TestSubmissionDTO[];
    createdAt: string;
}
