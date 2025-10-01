
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { AttendanceDTO } from "../../application/dtos/attendance.dto";
import { SetAttendanceDTO } from "../../application/dtos/set-attendance.dto";

export interface IAttendanceService {
    setAttendance(dto: SetAttendanceDTO): Promise<AttendanceDTO>;
    setBulkAttendance(dtos: SetAttendanceDTO[]): Promise<void>;
    getAttendanceByDate(date: string): Promise<AttendanceDTO[]>;
    getAttendanceByMonth(month: number, year: number): Promise<AttendanceDTO[]>;
    getAttendanceByDateRange(startDate: string, endDate: string, studentIds: string[]): Promise<AttendanceDTO[]>;
}
