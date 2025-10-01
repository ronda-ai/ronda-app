import mongoose, { Schema, Document, Model } from 'mongoose';
import { ActivityModality } from '../../../domain/manual-group-activity.entity';

const activityModalities: ActivityModality[] = ["Cozy Corner", "Center Stage", "Power Duo"];

const ActivitySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    modality: { type: String, enum: activityModalities, required: true },
  },
  { _id: false }
);

const ManualGroupActivitySchema = new Schema(
  {
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }],
    skills: { type: [String] },
    themes: { type: [String] },
    dynamicAnalysis: { type: String },
    activities: { type: [ActivitySchema] },
  },
  { timestamps: true }
);

export interface IManualGroupActivityDocument extends Document {
  _id: mongoose.Types.ObjectId;
  memberIds: mongoose.Types.ObjectId[];
  skills?: string[];
  themes?: string[];
  dynamicAnalysis?: string;
  activities?: {
    title: string;
    description: string;
    modality: ActivityModality;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ManualGroupActivityModel: Model<IManualGroupActivityDocument> =
  mongoose.models.ManualGroupActivity ||
  mongoose.model<IManualGroupActivityDocument>(
    'ManualGroupActivity',
    ManualGroupActivitySchema
  );

export default ManualGroupActivityModel;
