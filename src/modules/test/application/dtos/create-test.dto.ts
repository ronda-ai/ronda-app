

import { RubricSuggestionDTO } from "@/modules/rubric-suggestion/application/dtos/rubric-suggestion.dto";
import { Test } from "../../domain/test.entity";

export type CreateTestDTO = Omit<Test, 'id' | 'createdAt' | 'updatedAt' | 'rubricId' | 'status' | 'liveId' | 'activeStudentIds'> & { rubricId: string, rubric: RubricSuggestionDTO };
