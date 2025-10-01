import { IIndividualRelationshipStrategyRepository } from "../../../domain/interfaces/individual-relationship-strategy-repository.interface";
import { CreateIndividualRelationshipStrategyDTO } from "../../../application/dtos/create-individual-relationship-strategy.dto";
import { IndividualRelationshipStrategy } from "../../../domain/individual-relationship-strategy.entity";

export class SupabaseIndividualRelationshipStrategyRepository implements IIndividualRelationshipStrategyRepository {
    findById(id: string): Promise<IndividualRelationshipStrategy | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Partial<Omit<IndividualRelationshipStrategy, "id" | "createdAt" | "studentId">>): Promise<IndividualRelationshipStrategy | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateIndividualRelationshipStrategyDTO): Promise<IndividualRelationshipStrategy> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<IndividualRelationshipStrategy[]> {
        throw new Error("Method not implemented.");
    }
}
