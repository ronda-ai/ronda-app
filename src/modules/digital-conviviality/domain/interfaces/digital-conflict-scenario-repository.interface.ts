
import { GenerateDigitalConflictScenarioOutput } from "@/ai/flows/generate-digital-conflict-scenario";
import { DigitalConflictScenario } from "../digital-conviviality.entity";

export interface IDigitalConflictScenarioRepository {
    create(data: GenerateDigitalConflictScenarioOutput & { topics?: string[] }): Promise<DigitalConflictScenario>;
    findAll(): Promise<DigitalConflictScenario[]>;
    delete(id: string): Promise<void>;
}
