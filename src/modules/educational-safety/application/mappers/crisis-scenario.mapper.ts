
import { CrisisScenario } from "../../domain/educational-safety.entity";
import { CrisisScenarioDTO } from "../dtos/crisis-scenario.dto";
import { StudentMapper } from '@/modules/student/application/mappers/student.mapper';

export class CrisisScenarioMapper {
    public static toDTO(scenario: CrisisScenario): CrisisScenarioDTO {
        return {
            id: scenario.id,
            crisisType: scenario.crisisType,
            simulationLength: scenario.simulationLength || 'medium',
            students: (scenario.students || []).map(s => StudentMapper.toDTO(s as any)),
            initialScenario: scenario.initialScenario,
            createdAt: scenario.createdAt.toISOString(),
            updatedAt: scenario.updatedAt.toISOString(),
        };
    }
}
