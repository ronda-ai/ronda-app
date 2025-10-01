
import { SetAttendanceDTO } from "../../application/dtos/set-attendance.dto";
import { Attendance } from "../attendance.entity";

export interface IAttendanceRepository {
    set(data: SetAttendanceDTO): Promise<Attendance>;
    setBulk(data: SetAttendanceDTO[]): Promise<void>;
    findByDate(date: Date): Promise<Attendance[]>;
    findByStudentAndDate(studentId: string, date: Date): Promise<Attendance | null>;
    findByMonth(month: number, year: number): Promise<Attendance[]>;
    findByDateRange(startDate: Date, endDate: Date, studentIds?: string[]): Promise<Attendance[]>;
}
