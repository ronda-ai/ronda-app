
import { IndividualRelationshipStrategy } from "../../domain/individual-relationship-strategy.entity";
import { IndividualRelationshipStrategyDTO } from "../dtos/individual-relationship-strategy.dto";

export class IndividualRelationshipStrategyMapper {
    public static toDTO(strategy: IndividualRelationshipStrategy): IndividualRelationshipStrategyDTO {
        return {
            id: strategy.id,
            studentId: strategy.studentId.toString(),
            title: strategy.title,
            rationale: strategy.rationale,
            steps: strategy.steps.map(s => ({
                text: s.text,
                status: s.status,
                feedback: s.feedback,
            })),
            focus: strategy.focus,
            customPrompt: strategy.customPrompt,
            status: strategy.status,
            feedback: strategy.feedback,
            createdAt: strategy.createdAt.toISOString(),
        };
    }
}
