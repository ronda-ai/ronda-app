
import { CreateManualGroupActivityDTO } from '../../application/dtos/create-manual-group-activity.dto';
import { ManualGroupActivityDTO } from '../../application/dtos/manual-group-activity.dto';
import { UpdateManualGroupActivityDTO } from '../../application/dtos/update-manual-group-activity.dto';
import { IStudentService } from '@/modules/student/domain/interfaces/student-service.interface';

export interface IManualGroupActivityService {
  createManualGroupActivity(
    dto: CreateManualGroupActivityDTO
  ): Promise<ManualGroupActivityDTO>;
  getAllManualGroupActivities(): Promise<ManualGroupActivityDTO[]>;
  updateManualGroupActivity(
    id: string,
    dto: UpdateManualGroupActivityDTO
  ): Promise<ManualGroupActivityDTO | null>;
  deleteManualGroupActivity(id: string): Promise<void>;
  generateActivitiesForGroup(groupId: string, language: string): Promise<ManualGroupActivityDTO | null>;
}
