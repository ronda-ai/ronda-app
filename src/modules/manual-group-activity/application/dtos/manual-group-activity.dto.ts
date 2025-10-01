import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { ManualGroupActivityItem } from '../../domain/manual-group-activity.entity';

export interface ManualGroupActivityDTO {
  id: string;
  memberIds: string[];
  members: StudentDTO[];
  skills?: string[];
  themes?: string[];
  dynamicAnalysis?: string;
  activities?: ManualGroupActivityItem[];
  createdAt: string;
  updatedAt: string;
}
