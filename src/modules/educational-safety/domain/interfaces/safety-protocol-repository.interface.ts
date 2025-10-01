
import { SafetyProtocol } from "../educational-safety.entity";

export interface ISafetyProtocolRepository {
    create(data: Omit<SafetyProtocol, 'id' | 'createdAt' | 'updatedAt'>): Promise<SafetyProtocol>;
    findAll(): Promise<SafetyProtocol[]>;
    findById(id: string): Promise<SafetyProtocol | null>;
    update(id: string, data: Partial<SafetyProtocol>): Promise<SafetyProtocol | null>;
    delete(id: string): Promise<void>;
}
