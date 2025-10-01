

import mongoose from "mongoose";
import { RubricSuggestion } from "@/modules/rubric-suggestion/domain/rubric-suggestion.entity";
import { Test } from "../../domain/test.entity";
import { TestDTO } from "../dtos/test.dto";
import { RubricSuggestionMapper } from "@/modules/rubric-suggestion/application/mappers/rubric-suggestion.mapper";

export class TestMapper {
    public static toDTO(test: Test): TestDTO {
        // Check if rubricId is a populated object
        const isRubricPopulated = test.rubricId && typeof test.rubricId === 'object' && !(test.rubricId instanceof mongoose.Types.ObjectId);
        const rubricIdValue = isRubricPopulated ? (test.rubricId as RubricSuggestion).id : test.rubricId?.toString();

        return {
            id: test.id,
            storyId: test.storyId.toString(),
            storyTitle: test.storyTitle,
            title: test.title,
            blocks: test.blocks.map(block => ({
                id: block.id,
                type: block.type,
                title: block.title,
                questions: block.questions.map(q => ({
                    id: q.id,
                    text: q.text,
                    options: q.options?.map(opt => ({ text: opt.text })),
                    answer: q.answer,
                    type: block.type // Inherit type from parent block
                }))
            })),
            rubricId: rubricIdValue,
            status: test.status,
            liveId: test.liveId,
            activeStudentIds: test.activeStudentIds,
            createdAt: test.createdAt.toISOString(),
        };
    }
    
    public static toDTOWithPopulatedRubric(test: Test & { rubricId: RubricSuggestion }): TestDTO {
        const dto = this.toDTO(test);
        // Ensure that rubricId is a populated object before trying to map it
        if (test.rubricId && typeof test.rubricId === 'object' && test.rubricId.id) {
            dto.rubric = RubricSuggestionMapper.toDTO(test.rubricId);
        }
        return dto;
    }
}
