
import { container } from "@/lib/dependency-container";
import { SERVICE_KEYS } from "@/config/service-keys";
import { ExportService } from "../application/export.service";
import { IStudentService } from "@/modules/student/domain/interfaces/student-service.interface";
import { IChallengeService } from "@/modules/challenge/domain/interfaces/challenge-service.interface";
import { IAttendanceService } from "@/modules/attendance/domain/interfaces/attendance-service.interface";
import { IExportService } from '../domain/interfaces/export-service.interface';

let _exportServiceInstance: IExportService;

export function createExportService(): IExportService {
    if(!_exportServiceInstance){
        const studentService = container.resolve<IStudentService>(SERVICE_KEYS.StudentService);
        const challengeService = container.resolve<IChallengeService>(SERVICE_KEYS.ChallengeService);
        const attendanceService = container.resolve<IAttendanceService>(SERVICE_KEYS.AttendanceService);
        _exportServiceInstance = new ExportService(studentService, challengeService, attendanceService);
    }
    return _exportServiceInstance;
}
