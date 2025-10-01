
import { DigitalConflictScenario } from "../../domain/digital-conviviality.entity";

export type DigitalConflictScenarioDTO = Omit<DigitalConflictScenario, 'createdAt' | 'updatedAt'> & {
    id: string;
    createdAt: string;
    updatedAt: string;
};
