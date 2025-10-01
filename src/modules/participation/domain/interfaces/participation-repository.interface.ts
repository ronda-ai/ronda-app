
import { Participation } from "../participation.entity";

export interface IParticipationRepository {
    create(studentId: any): Promise<Participation>;
    findByStudentId(studentId: any): Promise<Participation[]>;
    countByStudentId(studentId: any): Promise<number>;
    delete(id: any): Promise<void>;
    deleteByStudentId(studentId: any): Promise<void>;
    countByDateRange(startDate: Date, endDate: Date, studentIds: string[]): Promise<{ id: string; count: number }[]>;
}
