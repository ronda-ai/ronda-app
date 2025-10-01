
import { CrisisScenario } from "../educational-safety.entity";

export interface ICrisisScenarioRepository {
    create(data: Omit<CrisisScenario, 'id' | 'createdAt' | 'updatedAt'>): Promise<CrisisScenario>;
    findAll(): Promise<CrisisScenario[]>;
    findById(id: string): Promise<CrisisScenario | null>;
    delete(id: string): Promise<void>;
}
