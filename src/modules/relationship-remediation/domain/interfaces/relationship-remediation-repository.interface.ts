
import { CreateRelationshipRemediationDTO } from "../../application/dtos/create-relationship-remediation.dto";
import { RelationshipRemediation } from "../relationship-remediation.entity";

export interface IRelationshipRemediationRepository {
    create(data: CreateRelationshipRemediationDTO): Promise<RelationshipRemediation>;
    findByStudentIds(studentIds: string[]): Promise<RelationshipRemediation[]>;
    findById(id: string): Promise<RelationshipRemediation | null>;
    update(id: string, data: Partial<RelationshipRemediation>): Promise<RelationshipRemediation | null>;
    delete(id: string): Promise<void>;
}
