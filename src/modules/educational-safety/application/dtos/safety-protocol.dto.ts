
import { ProtocolStep } from "../../domain/educational-safety.entity";

export interface SafetyProtocolDTO {
    id: string;
    risk: string;
    title: string;
    beforeSteps: ProtocolStep[];
    duringSteps: ProtocolStep[];
    afterSteps: ProtocolStep[];
    createdAt: string;
    updatedAt: string;
}
