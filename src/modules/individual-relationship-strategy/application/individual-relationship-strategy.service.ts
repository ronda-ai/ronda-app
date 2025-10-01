

import { generateIndividualRelationshipStrategy } from "@/ai/flows/generate-individual-relationship-strategy";
import { generateAdjustedIndividualStrategy } from "@/ai/flows/generate-adjusted-individual-strategy";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IIndividualRelationshipStrategyRepository } from "../domain/interfaces/individual-relationship-strategy-repository.interface";
import { IIndividualRelationshipStrategyService } from "../domain/interfaces/individual-relationship-strategy-service.interface";
import { CreateIndividualRelationshipStrategyDTO } from "./dtos/create-individual-relationship-strategy.dto";
import { IndividualRelationshipStrategyDTO, StrategyStepDTO, StrategyStatus } from "./dtos/individual-relationship-strategy.dto";
import { IndividualRelationshipStrategyMapper } from "./mappers/individual-relationship-strategy.mapper";
import { IAnonymizationService } from "@/modules/shared/domain-types/anonymization-service.interface";


export class IndividualRelationshipStrategyService implements IIndividualRelationshipStrategyService {
    constructor(
        private readonly repository: IIndividualRelationshipStrategyRepository,
        private readonly anonymizationService: IAnonymizationService
        ) {}

    async generateAndCreateStrategy(student: StudentDTO, allStudents: StudentDTO[], language: string, focus: string, customPrompt?: string): Promise<IndividualRelationshipStrategyDTO> {
        
        const { anonymizedData: anonymizedStudent, mapping } = this.anonymizationService.anonymize(student, allStudents);

        const result = await generateIndividualRelationshipStrategy({
            student: anonymizedStudent,
            language: language,
            focus,
            customPrompt
        });

        const finalTitle = this.anonymizationService.deAnonymizeText(result.title, mapping);
        const finalRationale = this.anonymizationService.deAnonymizeText(result.rationale, mapping);
        const finalSteps = result.steps.map(step => ({ 
            text: this.anonymizationService.deAnonymizeText(step.text, mapping),
            status: 'pending' as const 
        }));

        const dto: CreateIndividualRelationshipStrategyDTO = {
            studentId: student.id,
            title: finalTitle,
            rationale: finalRationale,
            steps: finalSteps,
            focus,
            customPrompt,
        };

        const newStrategy = await this.repository.create(dto);
        return IndividualRelationshipStrategyMapper.toDTO(newStrategy);
    }
    
    async adjustStrategy(
        student: StudentDTO, 
        allStudents: StudentDTO[], 
        language: string, 
        existingStrategy: IndividualRelationshipStrategyDTO, 
        customPrompt: string
    ): Promise<IndividualRelationshipStrategyDTO | null> {
        
        const { anonymizedData: anonymizedStudent, mapping } = this.anonymizationService.anonymize(student, allStudents);

        const result = await generateAdjustedIndividualStrategy({
            student: anonymizedStudent,
            language,
            focus: existingStrategy.focus,
            existingStrategy,
            customPrompt
        });

        const finalTitle = this.anonymizationService.deAnonymizeText(result.title, mapping);
        const finalRationale = this.anonymizationService.deAnonymizeText(result.rationale, mapping);
        const finalSteps = result.steps.map(step => ({ 
            text: this.anonymizationService.deAnonymizeText(step.text, mapping),
            status: 'pending' as const 
        }));

        const updatedStrategy = await this.repository.update(existingStrategy.id, {
            title: finalTitle,
            rationale: finalRationale,
            steps: finalSteps,
            customPrompt: customPrompt,
            status: 'needs_adjustment'
        });

        return updatedStrategy ? IndividualRelationshipStrategyMapper.toDTO(updatedStrategy) : null;
    }
    
    async getStrategiesForStudent(studentId: string): Promise<IndividualRelationshipStrategyDTO[]> {
        const strategies = await this.repository.findByStudentId(studentId);
        return strategies.map(IndividualRelationshipStrategyMapper.toDTO);
    }
    
    async updateStrategy(id: string, data: { feedback?: string, status?: StrategyStatus }): Promise<IndividualRelationshipStrategyDTO | null> {
        const updatedStrategy = await this.repository.update(id, data);
        return updatedStrategy ? IndividualRelationshipStrategyMapper.toDTO(updatedStrategy) : null;
    }

    async updateStepDetails(strategyId: string, stepIndex: number, details: Partial<StrategyStepDTO>): Promise<IndividualRelationshipStrategyDTO | null> {
        const strategy = await this.repository.findById(strategyId);
        if (!strategy) return null;

        if (stepIndex < 0 || stepIndex >= strategy.steps.length) {
            throw new Error("Step index out of bounds");
        }
        
        const updatedSteps = [...strategy.steps];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], ...details };

        const updatedStrategy = await this.repository.update(strategyId, { steps: updatedSteps });
        return updatedStrategy ? IndividualRelationshipStrategyMapper.toDTO(updatedStrategy) : null;
    }

    async deleteStrategy(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
