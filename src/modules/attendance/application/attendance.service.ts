
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IAttendanceRepository } from "../domain/interfaces/attendance-repository.interface";
import { IAttendanceService } from "../domain/interfaces/attendance-service.interface";
import { AttendanceDTO } from "./dtos/attendance.dto";
import { SetAttendanceDTO } from "./dtos/set-attendance.dto";
import { AttendanceMapper } from "./mappers/attendance.mapper";

export class AttendanceService implements IAttendanceService {
    constructor(
        private readonly attendanceRepository: IAttendanceRepository,
        private readonly studentService: IStudentService,
    ) {}

    async setAttendance(dto: SetAttendanceDTO): Promise<AttendanceDTO> {
        const attendance = await this.attendanceRepository.set(dto);

        const today = new Date().toISOString().split('T')[0];
        // If the attendance is for today, update the student's isAbsent status
        if (dto.date === today) {
            const isAbsent = dto.status === 'absent';
            await this.studentService.updateStudent(dto.studentId, { isAbsent });
        }

        return AttendanceMapper.toDTO(attendance);
    }
    
    async setBulkAttendance(dtos: SetAttendanceDTO[]): Promise<void> {
        await this.attendanceRepository.setBulk(dtos);

        const today = new Date().toISOString().split('T')[0];
        for (const dto of dtos) {
             if (dto.date === today) {
                const isAbsent = dto.status === 'absent';
                await this.studentService.updateStudent(dto.studentId, { isAbsent });
            }
        }
    }

    async getAttendanceByDate(date: string): Promise<AttendanceDTO[]> {
        const attendanceRecords = await this.attendanceRepository.findByDate(new Date(date));
        return attendanceRecords.map(AttendanceMapper.toDTO);
    }

    async getAttendanceByMonth(month: number, year: number): Promise<AttendanceDTO[]> {
        const attendanceRecords = await this.attendanceRepository.findByMonth(month, year);
        return attendanceRecords.map(AttendanceMapper.toDTO);
    }

    async getAttendanceByDateRange(startDate: string, endDate: string, studentIds: string[]): Promise<AttendanceDTO[]> {
        const records = await this.attendanceRepository.findByDateRange(new Date(startDate), new Date(endDate), studentIds);
        return records.map(AttendanceMapper.toDTO);
    }
}
