
import { ParticipationDTO } from "../../application/dtos/participation.dto";

export interface IParticipationService {
    addParticipation(studentId: any): Promise<ParticipationDTO>;
    removeLastParticipation(studentId: any): Promise<void>;
    getParticipations(studentId: any): Promise<ParticipationDTO[]>;
    getParticipationCount(studentId: any): Promise<number>;
    deleteParticipationsForStudent(studentId: any): Promise<void>;
    getParticipationCountByDateRange(startDate: string, endDate: string, studentIds: string[]): Promise<{ id: string; name: string; count: number }[]>;
}
