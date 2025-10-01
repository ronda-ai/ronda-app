

import { CreateIndividualRelationshipStrategyDTO } from "../../application/dtos/create-individual-relationship-strategy.dto";
import { IndividualRelationshipStrategy } from "../individual-relationship-strategy.entity";

export interface IIndividualRelationshipStrategyRepository {
    create(data: CreateIndividualRelationshipStrategyDTO): Promise<IndividualRelationshipStrategy>;
    findByStudentId(studentId: string): Promise<IndividualRelationshipStrategy[]>;
    findById(id: string): Promise<IndividualRelationshipStrategy | null>;
    update(id: string, data: Partial<Omit<IndividualRelationshipStrategy, 'id' | 'createdAt' | 'studentId'>>): Promise<IndividualRelationshipStrategy | null>;
    delete(id: string): Promise<void>;
}
