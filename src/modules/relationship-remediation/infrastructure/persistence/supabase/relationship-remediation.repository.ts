import { IRelationshipRemediationRepository } from "../../../domain/interfaces/relationship-remediation-repository.interface";
import { CreateRelationshipRemediationDTO } from "../../../application/dtos/create-relationship-remediation.dto";
import { RelationshipRemediation } from "../../../domain/relationship-remediation.entity";

export class SupabaseRelationshipRemediationRepository implements IRelationshipRemediationRepository {
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateRelationshipRemediationDTO): Promise<RelationshipRemediation> {
        throw new Error("Method not implemented.");
    }
    async findByStudentIds(studentIds: string[]): Promise<RelationshipRemediation[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<RelationshipRemediation | null> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: Partial<RelationshipRemediation>): Promise<RelationshipRemediation | null> {
        throw new Error("Method not implemented.");
    }
}
