

import { GenerateSafetyProtocolInput, GenerateSafetyProtocolOutput } from '@/ai/flows/generate-safety-protocol';
import { GenerateSafetyRiskMapInput, GenerateSafetyRiskMapOutput } from '@/ai/flows/generate-safety-risk-map';
import { GenerateCrisisScenarioInput, GenerateCrisisScenarioOutput } from '@/ai/flows/generate-crisis-scenario';
import { SafetyRiskMapDTO } from '../../application/dtos/safety-risk-map.dto';
import { SafetyProtocolDTO } from '../../application/dtos/safety-protocol.dto';
import { CrisisScenarioDTO } from '../../application/dtos/crisis-scenario.dto';
import { ProtocolStep } from '../educational-safety.entity';

export type SimulationLength = 'short' | 'medium' | 'complex';
export type AnalysisDepth = 'concise' | 'moderate' | 'exhaustive';

export interface IEducationalSafetyService {
    // Risk Maps
    generateAndSaveRiskMap(input: GenerateSafetyRiskMapInput): Promise<SafetyRiskMapDTO>;
    getAllRiskMaps(): Promise<SafetyRiskMapDTO[]>;
    deleteRiskMap(id: string): Promise<void>;

    // Protocols
    generateAndSaveProtocol(input: GenerateSafetyProtocolInput): Promise<SafetyProtocolDTO>;
    getAllProtocols(): Promise<SafetyProtocolDTO[]>;
    deleteProtocol(id: string): Promise<void>;
    updateProtocolStep(protocolId: string, stepType: 'beforeSteps' | 'duringSteps' | 'afterSteps', stepIndex: number, stepData: Partial<ProtocolStep>): Promise<SafetyProtocolDTO | null>;
    
    // Scenarios
    generateAndSaveCrisisScenario(input: GenerateCrisisScenarioInput): Promise<CrisisScenarioDTO>;
    getAllCrisisScenarios(): Promise<CrisisScenarioDTO[]>;
    deleteCrisisScenario(id: string): Promise<void>;

    // Interactive part remains transient
    generateCrisisScenario(input: GenerateCrisisScenarioInput): Promise<GenerateCrisisScenarioOutput>;
}

    
