
import { RelationshipRemediation } from "../../domain/relationship-remediation.entity";
import { RemediationStep, RelationshipRemediationDTO } from "../dtos/relationship-remediation.dto";

export class RelationshipRemediationMapper {
    public static toDTO(remediation: RelationshipRemediation): RelationshipRemediationDTO {
        return {
            id: remediation.id,
            studentIds: remediation.studentIds.map(id => id.toString()),
            focus: remediation.focus,
            customPrompt: remediation.customPrompt,
            strategyTitle: remediation.strategyTitle,
            steps: remediation.steps.map(s => {
                // The 's' object might be a Mongoose subdocument, so we extract its properties
                const stepData: RemediationStep = {
                    text: s.text,
                    status: s.status,
                    feedback: s.feedback,
                };
                return stepData;
            }),
            status: remediation.status,
            feedback: remediation.feedback,
            createdAt: remediation.createdAt.toISOString(),
        };
    }
}
