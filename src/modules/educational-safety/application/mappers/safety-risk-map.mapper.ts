
import { SafetyRiskMap } from "../../domain/educational-safety.entity";
import { SafetyRiskMapDTO } from "../dtos/safety-risk-map.dto";

export class SafetyRiskMapMapper {
    public static toDTO(map: SafetyRiskMap): SafetyRiskMapDTO {
        return {
            id: map.id,
            locationContext: map.locationContext,
            infrastructureContext: map.infrastructureContext,
            socialContext: map.socialContext,
            analysisDepth: map.analysisDepth,
            title: map.title,
            riskMap: map.riskMap,
            createdAt: map.createdAt.toISOString(),
            updatedAt: map.updatedAt.toISOString(),
        };
    }
}

    