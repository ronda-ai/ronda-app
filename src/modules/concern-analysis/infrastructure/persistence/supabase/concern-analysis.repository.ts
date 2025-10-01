import { IConcernAnalysisRepository } from "../../../domain/interfaces/concern-analysis-repository.interface";
import { CreateConcernAnalysisDTO } from "../../../application/dtos/create-concern-analysis.dto";
import { ConcernAnalysis } from "../../../domain/concern-analysis.entity";

export class SupabaseConcernAnalysisRepository implements IConcernAnalysisRepository {
    async create(data: CreateConcernAnalysisDTO): Promise<ConcernAnalysis> {
        throw new Error("Method not implemented.");
    }
    async findByStudentId(studentId: string): Promise<ConcernAnalysis[]> {
        throw new Error("Method not implemented.");
    }
}
