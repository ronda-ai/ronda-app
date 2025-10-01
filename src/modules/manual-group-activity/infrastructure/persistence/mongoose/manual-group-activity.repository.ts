
import { dbConnect } from "@/lib/mongodb";
import { IManualGroupActivityRepository } from '../../../domain/interfaces/manual-group-activity-repository.interface';
import { CreateManualGroupActivityDTO } from '../../../application/dtos/create-manual-group-activity.dto';
import { ManualGroupActivity } from '../../../domain/manual-group-activity.entity';
import ManualGroupActivityModel, {
  IManualGroupActivityDocument,
} from './manual-group-activity.schema';
import mongoose from 'mongoose';
import { UpdateManualGroupActivityDTO } from '@/modules/manual-group-activity/application/dtos/update-manual-group-activity.dto';

export class MongooseManualGroupActivityRepository
  implements IManualGroupActivityRepository
{
  private toDomain(
    doc: IManualGroupActivityDocument
  ): ManualGroupActivity {
    return new ManualGroupActivity(
      doc._id.toString(),
      doc.memberIds,
      doc.createdAt,
      doc.updatedAt,
      doc.skills,
      doc.themes,
      doc.dynamicAnalysis,
      doc.activities
    );
  }

  async create(
    data: CreateManualGroupActivityDTO
  ): Promise<ManualGroupActivity> {
    await dbConnect();
    const newGroup = await ManualGroupActivityModel.create({
      ...data,
      memberIds: data.memberIds.map(id => new mongoose.Types.ObjectId(id)),
    });
    return this.toDomain(newGroup);
  }

  async findAll(): Promise<ManualGroupActivity[]> {
    await dbConnect();
    const groups = await ManualGroupActivityModel.find()
      .sort({ createdAt: -1 })
      .exec();
    return groups.map(this.toDomain);
  }

  async findById(id: string): Promise<ManualGroupActivity | null> {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const groupDoc = await ManualGroupActivityModel.findById(id).exec();
    return groupDoc ? this.toDomain(groupDoc) : null;
  }

  async update(
    id: string,
    data: UpdateManualGroupActivityDTO
  ): Promise<ManualGroupActivity | null> {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const updatedDoc = await ManualGroupActivityModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    ).exec();
    if (!updatedDoc) return null;
    return this.toDomain(updatedDoc);
  }

  async delete(id: string): Promise<void> {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(id)) return;
    await ManualGroupActivityModel.findByIdAndDelete(id).exec();
  }
}
