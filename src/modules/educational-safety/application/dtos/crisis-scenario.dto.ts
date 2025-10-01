
import { CrisisScenario } from "../../domain/educational-safety.entity";
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { SimulationLength } from '../educational-safety.service';


export type CrisisScenarioDTO = Omit<CrisisScenario, 'createdAt' | 'updatedAt' | 'studentIds'> & {
    id: string;
    createdAt: string;
    updatedAt: string;
    students: Partial<StudentDTO>[];
    simulationLength: SimulationLength;
};
