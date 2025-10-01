
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { AnalyticsService } from "../application/analytics.service";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IAttendanceService } from "@/modules/attendance/domain/interfaces/attendance-service.interface";
import { IAnalyticsService } from '../domain/interfaces/analytics-service.interface';

let _analyticsServiceInstance: IAnalyticsService;

export function createAnalyticsService(): IAnalyticsService {
    if(!_analyticsServiceInstance){
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        const attendanceService = container.resolve<IAttendanceService>(SERVICE_KEYS.AttendanceService);
        _analyticsServiceInstance = new AnalyticsService(studentService, attendanceService);
    }
    return _analyticsServiceInstance;
}
