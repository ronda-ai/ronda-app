
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { ConcernAnalysisDTO } from "../../application/dtos/concern-analysis.dto";
import { CreateConcernAnalysisDTO } from "../../application/dtos/create-concern-analysis.dto";

export interface IConcernAnalysisService {
    createConcernAnalysis(dto: CreateConcernAnalysisDTO): Promise<ConcernAnalysisDTO>;
    getConcernAnalysesForStudent(studentId: string): Promise<ConcernAnalysisDTO[]>;
    generateAndCreateAnalysis(input: { student: StudentDTO; allStudents: StudentDTO[]; observations: ObservationDTO[]; language: string; }): Promise<ConcernAnalysisDTO>;
}
