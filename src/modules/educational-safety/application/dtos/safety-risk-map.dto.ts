

import { GenerateSafetyRiskMapOutput } from "@/ai/flows/generate-safety-risk-map";
import { AnalysisDepth } from '../educational-safety.service';

export interface SafetyRiskMapDTO {
    id: string;
    locationContext: string;
    infrastructureContext: string;
    socialContext: string;
    analysisDepth: AnalysisDepth;
    title: string;
    riskMap: GenerateSafetyRiskMapOutput["riskMap"];
    createdAt: string;
    updatedAt: string;
}
