

import { generateSafetyRiskMap, GenerateSafetyRiskMapInput, GenerateSafetyRiskMapOutput } from '@/ai/flows/generate-safety-risk-map';
import { IEducationalSafetyService } from '../domain/interfaces/educational-safety-service.interface';
import { GenerateSafetyProtocolInput, GenerateSafetyProtocolOutput, generateSafetyProtocol } from '@/ai/flows/generate-safety-protocol';
import { GenerateCrisisScenarioInput, generateCrisisScenario, GenerateCrisisScenarioOutput } from '@/ai/flows/generate-crisis-scenario';
import { ISafetyRiskMapRepository } from '../domain/interfaces/safety-risk-map-repository.interface';
import { SafetyRiskMapDTO } from './dtos/safety-risk-map.dto';
import { SafetyRiskMapMapper } from './mappers/safety-risk-map.mapper';
import { ISafetyProtocolRepository } from '../domain/interfaces/safety-protocol-repository.interface';
import { SafetyProtocolDTO } from './dtos/safety-protocol.dto';
import { SafetyProtocolMapper } from './mappers/safety-protocol.mapper';
import { ICrisisScenarioRepository } from '../domain/interfaces/crisis-scenario-repository.interface';
import { CrisisScenarioDTO } from './dtos/crisis-scenario.dto';
import { CrisisScenarioMapper } from './mappers/crisis-scenario.mapper';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { ProtocolStep } from '../domain/educational-safety.entity';

export type SimulationLength = 'short' | 'medium' | 'complex';
export type AnalysisDepth = 'concise' | 'moderate' | 'exhaustive';

export class EducationalSafetyService implements IEducationalSafetyService {
    constructor(
        private readonly riskMapRepository: ISafetyRiskMapRepository,
        private readonly protocolRepository: ISafetyProtocolRepository,
        private readonly scenarioRepository: ICrisisScenarioRepository,
        private readonly anonymizationService: IAnonymizationService,
    ) {}

    // --- Risk Maps ---
    async generateAndSaveRiskMap(input: GenerateSafetyRiskMapInput): Promise<SafetyRiskMapDTO> {
        const result = await generateSafetyRiskMap(input);
        const savedMap = await this.riskMapRepository.create({ ...input, ...result });
        return SafetyRiskMapMapper.toDTO(savedMap);
    }
    async getAllRiskMaps(): Promise<SafetyRiskMapDTO[]> {
        const maps = await this.riskMapRepository.findAll();
        return maps.map(SafetyRiskMapMapper.toDTO);
    }
    async deleteRiskMap(id: string): Promise<void> {
        await this.riskMapRepository.delete(id);
    }

    // --- Protocols ---
    async generateAndSaveProtocol(input: GenerateSafetyProtocolInput): Promise<SafetyProtocolDTO> {
        const result = await generateSafetyProtocol(input);
        const savedProtocol = await this.protocolRepository.create({ ...input, ...result });
        return SafetyProtocolMapper.toDTO(savedProtocol);
    }
    async getAllProtocols(): Promise<SafetyProtocolDTO[]> {
        const protocols = await this.protocolRepository.findAll();
        return protocols.map(SafetyProtocolMapper.toDTO);
    }
    async deleteProtocol(id: string): Promise<void> {
        await this.protocolRepository.delete(id);
    }
    
    async updateProtocolStep(protocolId: string, stepType: 'beforeSteps' | 'duringSteps' | 'afterSteps', stepIndex: number, stepData: Partial<ProtocolStep>): Promise<SafetyProtocolDTO | null> {
        const protocol = await this.protocolRepository.findById(protocolId);
        if (!protocol) return null;

        const steps = protocol[stepType];
        if (stepIndex < 0 || stepIndex >= steps.length) {
            throw new Error("Step index out of bounds");
        }

        steps[stepIndex] = { ...steps[stepIndex], ...stepData };

        const updatedProtocol = await this.protocolRepository.update(protocolId, { [stepType]: steps });
        if (!updatedProtocol) return null;

        return SafetyProtocolMapper.toDTO(updatedProtocol);
    }

    // --- Scenarios ---
    async generateCrisisScenario(input: GenerateCrisisScenarioInput): Promise<GenerateCrisisScenarioOutput> {
        
        let anonymizedStudents: Partial<StudentDTO>[] | undefined = undefined;
        let mapping: Map<string, string> = new Map();

        if (input.students && input.students.length > 0) {
            const anonymizationResult = this.anonymizationService.anonymize(input.students, input.students);
            anonymizedStudents = anonymizationResult.anonymizedData;
            mapping = anonymizationResult.mapping;
        }
        
        const flowInput = {
            ...input,
            students: anonymizedStudents,
        };

        const result = await generateCrisisScenario(flowInput);

        // De-anonymize narrative and choices before sending to the client
        const deAnonymize = (text: string) => this.anonymizationService.deAnonymizeText(text, mapping);
        
        return {
            ...result,
            narrative: deAnonymize(result.narrative),
            choices: result.choices.map(choice => ({ ...choice, text: deAnonymize(choice.text) })),
            evaluation: result.evaluation ? {
                ...result.evaluation,
                feedback: deAnonymize(result.evaluation.feedback),
            } : undefined,
            finalSummary: result.finalSummary ? deAnonymize(result.finalSummary) : undefined,
        };
    }
    
    async generateAndSaveCrisisScenario(input: GenerateCrisisScenarioInput): Promise<CrisisScenarioDTO> {
        const result = await this.generateCrisisScenario(input); // Use the already anonymizing method
        const savedScenario = await this.scenarioRepository.create({
            crisisType: input.crisisType,
            simulationLength: input.simulationLength,
            studentIds: input.students?.map(s => s.id) as string[],
            initialScenario: {
                narrative: result.narrative,
                choices: result.choices,
                isFinalStep: result.isFinalStep,
            }
        });
        const populatedScenario = await this.scenarioRepository.findById(savedScenario.id);
        return CrisisScenarioMapper.toDTO(populatedScenario!);
    }

    async getAllCrisisScenarios(): Promise<CrisisScenarioDTO[]> {
        const scenarios = await this.scenarioRepository.findAll();
        return scenarios.map(CrisisScenarioMapper.toDTO);
    }

    async deleteCrisisScenario(id: string): Promise<void> {
        await this.scenarioRepository.delete(id);
    }
}

    
