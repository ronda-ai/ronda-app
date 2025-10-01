
import { ManualGroupActivity } from '../../domain/manual-group-activity.entity';

export type UpdateManualGroupActivityDTO = Partial<
  Omit<ManualGroupActivity, 'id' | 'memberIds' | 'createdAt' | 'updatedAt' | 'activity'>
> & {
  activities?: ManualGroupActivity['activities'];
};
