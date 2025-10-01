
import { SafetyRiskMap } from "../educational-safety.entity";

export interface ISafetyRiskMapRepository {
    create(data: Omit<SafetyRiskMap, 'id' | 'createdAt' | 'updatedAt'>): Promise<SafetyRiskMap>;
    findAll(): Promise<SafetyRiskMap[]>;
    delete(id: string): Promise<void>;
}

    