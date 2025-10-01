
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'justified';

export interface AttendanceDTO {
    id: string;
    studentId: string;
    date: string;
    status: AttendanceStatus;
}
