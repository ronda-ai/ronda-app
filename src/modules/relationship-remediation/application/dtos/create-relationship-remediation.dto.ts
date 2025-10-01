import { RemediationStep } from "./relationship-remediation.dto";

export interface CreateRelationshipRemediationDTO {
    studentIds: string[];
    focus: string;
    customPrompt?: string;
    strategyTitle: string;
    steps: RemediationStep[];
    feedback?: string;
}
