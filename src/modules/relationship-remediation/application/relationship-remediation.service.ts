
import { generateRelationshipRemediation } from "@/ai/flows/generate-relationship-remediation";
import { generateRelationshipSuggestion } from "@/ai/flows/generate-relationship-suggestion";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IRelationshipRemediationRepository } from "../domain/interfaces/relationship-remediation-repository.interface";
import { IRelationshipRemediationService } from "../domain/interfaces/relationship-remediation-service.interface";
import { CreateRelationshipRemediationDTO } from "./dtos/create-relationship-remediation.dto";
import { RelationshipRemediationDTO, RemediationStatus, RemediationStep } from "./dtos/relationship-remediation.dto";
import { RelationshipRemediationMapper } from "./mappers/relationship-remediation.mapper";
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';

export class RelationshipRemediationService implements IRelationshipRemediationService {
    constructor(
        private readonly repository: IRelationshipRemediationRepository,
        private readonly anonymizationService: IAnonymizationService,
    ) {}

    async createRemediation(dto: CreateRelationshipRemediationDTO): Promise<RelationshipRemediationDTO> {
        const newRemediation = await this.repository.create(dto);
        return RelationshipRemediationMapper.toDTO(newRemediation);
    }

    async getRemediationsByStudentIds(studentIds: string[]): Promise<RelationshipRemediationDTO[]> {
        const remediations = await this.repository.findByStudentIds(studentIds);
        return remediations.map(RelationshipRemediationMapper.toDTO);
    }
    
    async updateRemediation(id: string, data: { status?: RemediationStatus; feedback?: string; }): Promise<RelationshipRemediationDTO | null> {
        const updatedRemediation = await this.repository.update(id, data);
        return updatedRemediation ? RelationshipRemediationMapper.toDTO(updatedRemediation) : null;
    }
    
    async updateStepDetails(remediationId: string, stepIndex: number, details: Partial<RemediationStep>): Promise<RelationshipRemediationDTO | null> {
        const remediation = await this.repository.findById(remediationId);
        if (!remediation) return null;

        if (stepIndex < 0 || stepIndex >= remediation.steps.length) {
            throw new Error("Step index out of bounds");
        }

        const updatedSteps = [...remediation.steps];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], ...details };

        const updatedRemediation = await this.repository.update(remediationId, { steps: updatedSteps });
        return updatedRemediation ? RelationshipRemediationMapper.toDTO(updatedRemediation) : null;
    }
    
    async deleteRemediation(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async generateAndCreateRemediation(input: {
        students: StudentDTO[],
        focus: string,
        customPrompt?: string,
        language: string,
        existingStrategy?: RelationshipRemediationDTO | null
    }): Promise<RelationshipRemediationDTO> {
        const { students, focus, customPrompt, language, existingStrategy } = input;

        const { anonymizedData: anonymizedStudents, mapping } = this.anonymizationService.anonymize(students, students);

        const result = await generateRelationshipRemediation({
            students: anonymizedStudents,
            focus: focus,
            customPrompt: customPrompt,
            language: language,
            existingStrategy: existingStrategy ?? undefined,
        });
        
        const finalTitle = this.anonymizationService.deAnonymizeText(result.strategyTitle, mapping);
        const finalSteps = result.steps.map(step => ({ 
            text: this.anonymizationService.deAnonymizeText(step.text, mapping),
            status: 'pending' as const 
        }));

        const createdRemediation = await this.createRemediation({
            studentIds: students.map(s => s.id),
            focus: focus,
            customPrompt: customPrompt,
            strategyTitle: finalTitle,
            steps: finalSteps,
        });
        
        return createdRemediation;
    }

    async generateSuggestion(students: StudentDTO[], language: string) {
        const { anonymizedData: anonymizedStudents, mapping } = this.anonymizationService.anonymize(students, students);
        
        const result = await generateRelationshipSuggestion({
            students: anonymizedStudents,
            language: language,
        });

        // De-anonymize the result
        const finalStudentNames = result.suggestedStudentNames.map(alias => mapping.get(alias) || alias);
        const finalCustomPrompt = this.anonymizationService.deAnonymizeText(result.suggestedCustomPrompt, mapping);

        return {
            ...result,
            suggestedStudentNames: finalStudentNames,
            suggestedCustomPrompt: finalCustomPrompt,
        };
    }
}
