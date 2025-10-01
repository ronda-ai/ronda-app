
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CreateRelationshipRemediationDTO } from "../../application/dtos/create-relationship-remediation.dto";
import { RelationshipRemediationDTO, RemediationStatus, RemediationStep } from "../../application/dtos/relationship-remediation.dto";

export interface IRelationshipRemediationService {
    createRemediation(dto: CreateRelationshipRemediationDTO): Promise<RelationshipRemediationDTO>;
    getRemediationsByStudentIds(studentIds: string[]): Promise<RelationshipRemediationDTO[]>;
    updateRemediation(id: string, data: { status?: RemediationStatus; feedback?: string; }): Promise<RelationshipRemediationDTO | null>;
    updateStepDetails(remediationId: string, stepIndex: number, details: Partial<RemediationStep>): Promise<RelationshipRemediationDTO | null>;
    deleteRemediation(id: string): Promise<void>;
    generateAndCreateRemediation(input: {
        students: StudentDTO[],
        focus: string,
        customPrompt?: string,
        language: string,
        existingStrategy?: RelationshipRemediationDTO | null,
    }): Promise<RelationshipRemediationDTO>;
    generateSuggestion(students: StudentDTO[], language: string): Promise<{
        suggestedStudentNames: string[];
        suggestedFocus: string;
        suggestedCustomPrompt: string;
    }>;
}
