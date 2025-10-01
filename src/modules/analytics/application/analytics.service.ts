
import { eachDayOfInterval, format } from "date-fns";
import { IAttendanceService } from "../../attendance/domain/interfaces/attendance-service.interface";
import { IStudentService } from "../../student/domain/interfaces/student-service.interface";
import { IAnalyticsService } from "../domain/interfaces/analytics-service.interface";
import { AnalyticsDTO } from "./dtos/analytics.dto";

export class AnalyticsService implements IAnalyticsService {
    constructor(
        private readonly studentService: IStudentService,
        private readonly attendanceService: IAttendanceService
    ) {}

    async getAnalytics(startDate: string, endDate: string, studentIds: string[]): Promise<AnalyticsDTO> {
        const allStudents = await this.studentService.getAllStudents();
        const totalStudents = allStudents.length;

        // Attendance Data
        const attendanceRecords = await this.attendanceService.getAttendanceByDateRange(startDate, endDate, []); // Fetch for all students always
        
        const attendanceByDate: { [key: string]: { present: number; absent: number } } = {};
        const interval = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });

        interval.forEach(day => {
            const dateKey = format(day, 'yyyy-MM-dd');
            attendanceByDate[dateKey] = { present: 0, absent: totalStudents };
        });

        attendanceRecords.forEach(record => {
            const dateKey = format(new Date(record.date), 'yyyy-MM-dd');
            if (attendanceByDate[dateKey]) {
                if (record.status === 'present' || record.status === 'late') {
                    attendanceByDate[dateKey].present++;
                }
            }
        });
        
        Object.keys(attendanceByDate).forEach(dateKey => {
             attendanceByDate[dateKey].absent = totalStudents - attendanceByDate[dateKey].present;
        });

        const attendanceData = Object.entries(attendanceByDate).map(([date, counts]) => ({
            date,
            ...counts
        }));
        
        // Participation Data
        const participationData = await this.studentService.getParticipationInRange(startDate, endDate, studentIds);

        return {
            attendance: attendanceData,
            participation: participationData,
        };
    }
}
