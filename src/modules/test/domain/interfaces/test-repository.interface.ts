

import { CreateTestDTO } from "../../application/dtos/create-test.dto";
import { TestDTO } from "../../application/dtos/test.dto";
import { Test } from "../test.entity";
import { RubricSuggestion } from '@/modules/rubric-suggestion/domain/rubric-suggestion.entity';

export interface ITestRepository {
    create(data: CreateTestDTO): Promise<Test>;
    findAll(): Promise<(Test & { rubricId: RubricSuggestion })[]>;
    findById(id: string): Promise<(Test & { rubricId: RubricSuggestion }) | null>;
    findByLiveId(liveId: string): Promise<(Test & { rubricId: RubricSuggestion }) | null>;
    update(id: string, data: Partial<TestDTO>): Promise<(Test & { rubricId: RubricSuggestion }) | null>;
    delete(id: string): Promise<void>;
}
