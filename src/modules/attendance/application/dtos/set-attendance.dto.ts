
import { AttendanceStatus } from "./attendance.dto";

export interface SetAttendanceDTO {
    studentId: string;
    date: string; // ISO date string
    status: AttendanceStatus;
}
