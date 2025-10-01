
import { SafetyProtocol } from "../../domain/educational-safety.entity";
import { SafetyProtocolDTO } from "../dtos/safety-protocol.dto";

export class SafetyProtocolMapper {
    public static toDTO(protocol: SafetyProtocol): SafetyProtocolDTO {
        return {
            id: protocol.id,
            risk: protocol.risk,
            title: protocol.title,
            beforeSteps: protocol.beforeSteps.map(s => ({...s, assignedBrigadeId: s.assignedBrigadeId?.toString() })),
            duringSteps: protocol.duringSteps.map(s => ({...s, assignedBrigadeId: s.assignedBrigadeId?.toString() })),
            afterSteps: protocol.afterSteps.map(s => ({...s, assignedBrigadeId: s.assignedBrigadeId?.toString() })),
            createdAt: protocol.createdAt.toISOString(),
            updatedAt: protocol.updatedAt.toISOString(),
        };
    }
}
