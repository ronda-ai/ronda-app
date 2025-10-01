import { ITestRepository } from "../../../domain/interfaces/test-repository.interface";
import { CreateTestDTO } from "../../../application/dtos/create-test.dto";
import { Test } from "../../../domain/test.entity";
import { TestDTO } from "../../../application/dtos/test.dto";
import { RubricSuggestion } from "@/modules/rubric-suggestion/domain/rubric-suggestion.entity";

export class SupabaseTestRepository implements ITestRepository {
    async create(data: CreateTestDTO): Promise<Test> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<(Test & { rubricId: RubricSuggestion; })[]> {
        throw new Error("Method not implemented.");
    }
     async findById(id: string): Promise<(Test & { rubricId: RubricSuggestion; }) | null> {
        throw new Error("Method not implemented.");
    }
    async findByLiveId(liveId: string): Promise<(Test & { rubricId: RubricSuggestion; }) | null> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: Partial<TestDTO>): Promise<(Test & { rubricId: RubricSuggestion; }) | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
