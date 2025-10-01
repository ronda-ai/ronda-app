
import { DigitalConflictScenario } from "../../domain/digital-conviviality.entity";

export type CreateDigitalConflictScenarioDTO = Omit<DigitalConflictScenario, 'id' | 'createdAt' | 'updatedAt'>;
