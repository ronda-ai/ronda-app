
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { AttendanceService } from "../application/attendance.service";
import { IAttendanceRepository } from "../domain/interfaces/attendance-repository.interface";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IAttendanceService } from '../domain/interfaces/attendance-service.interface';

let _attendanceServiceInstance: IAttendanceService;

export function createAttendanceService(): IAttendanceService {
    if(!_attendanceServiceInstance){
        const attendanceRepository = container.resolve<IAttendanceRepository>(SERVICE_KEYS.AttendanceRepository);
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        _attendanceServiceInstance = new AttendanceService(attendanceRepository, studentService);
    }
    return _attendanceServiceInstance;
}
