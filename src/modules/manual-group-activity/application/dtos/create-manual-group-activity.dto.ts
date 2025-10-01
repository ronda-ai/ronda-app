import { ManualGroupActivityItem } from '../../domain/manual-group-activity.entity';

export interface CreateManualGroupActivityDTO {
  memberIds: string[];
  skills?: string[];
  themes?: string[];
  dynamicAnalysis?: string;
  activities?: ManualGroupActivityItem[];
}
