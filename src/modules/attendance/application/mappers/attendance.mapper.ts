
import { Attendance } from "../../domain/attendance.entity";
import { AttendanceDTO } from "../dtos/attendance.dto";

export class AttendanceMapper {
    public static toDTO(attendance: Attendance): AttendanceDTO {
        return {
            id: attendance.id,
            studentId: attendance.studentId.toString(),
            date: attendance.date.toISOString().split('T')[0], // Return date as YYYY-MM-DD
            status: attendance.status,
        };
    }
}
