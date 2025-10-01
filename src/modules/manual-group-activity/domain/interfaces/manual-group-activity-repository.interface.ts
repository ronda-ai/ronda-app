
import { CreateManualGroupActivityDTO } from '../../application/dtos/create-manual-group-activity.dto';
import { UpdateManualGroupActivityDTO } from '../../application/dtos/update-manual-group-activity.dto';
import { ManualGroupActivity } from '../manual-group-activity.entity';

export interface IManualGroupActivityRepository {
  create(data: CreateManualGroupActivityDTO): Promise<ManualGroupActivity>;
  findAll(): Promise<ManualGroupActivity[]>;
  findById(id: string): Promise<ManualGroupActivity | null>;
  update(
    id: string,
    data: UpdateManualGroupActivityDTO
  ): Promise<ManualGroupActivity | null>;
  delete(id: string): Promise<void>;
}
