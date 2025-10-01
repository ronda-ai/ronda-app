
import { GenerateCrisisScenarioOutput } from '@/ai/flows/generate-crisis-scenario';
import { GenerateSafetyRiskMapOutput } from '@/ai/flows/generate-safety-risk-map';
import { Student } from '@/modules/student/domain/student.entity';
import { AnalysisDepth } from '../application/educational-safety.service';
import mongoose from 'mongoose';

export class SafetyRiskMap {
    constructor(
        public id: any,
        public locationContext: string,
        public infrastructureContext: string,
        public socialContext: string,
        public analysisDepth: AnalysisDepth,
        public title: string,
        public riskMap: GenerateSafetyRiskMapOutput["riskMap"],
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}

export interface ProtocolStep {
    text: string;
    assignedBrigadeId?: string | mongoose.Types.ObjectId;
    assignedBrigadeName?: string;
}

export class SafetyProtocol {
    constructor(
        public id: any,
        public risk: string,
        public title: string,
        public beforeSteps: ProtocolStep[],
        public duringSteps: ProtocolStep[],
        public afterSteps: ProtocolStep[],
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}

export class CrisisScenario {
    constructor(
        public id: any,
        public crisisType: string,
        public initialScenario: GenerateCrisisScenarioOutput,
        public createdAt: Date,
        public updatedAt: Date,
        public simulationLength?: 'short' | 'medium' | 'complex',
        public studentIds?: string[],
        public students?: Partial<Student>[], // for population
    ) {}
}

    
