

import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { IndividualRelationshipStrategyDTO, StrategyStepDTO, StrategyStatus } from "../../application/dtos/individual-relationship-strategy.dto";

export interface IIndividualRelationshipStrategyService {
    generateAndCreateStrategy(student: StudentDTO, allStudents: StudentDTO[], language: string, focus: string, customPrompt?: string): Promise<IndividualRelationshipStrategyDTO>;
    adjustStrategy(student: StudentDTO, allStudents: StudentDTO[], language: string, existingStrategy: IndividualRelationshipStrategyDTO, customPrompt: string): Promise<IndividualRelationshipStrategyDTO | null>;
    getStrategiesForStudent(studentId: string): Promise<IndividualRelationshipStrategyDTO[]>;
    updateStrategy(id: string, data: { feedback?: string, status?: StrategyStatus }): Promise<IndividualRelationshipStrategyDTO | null>;
    updateStepDetails(strategyId: string, stepIndex: number, details: Partial<StrategyStepDTO>): Promise<IndividualRelationshipStrategyDTO | null>;
    deleteStrategy(id: string): Promise<void>;
}
