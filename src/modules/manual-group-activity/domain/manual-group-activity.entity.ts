import mongoose from 'mongoose';

export type ActivityModality = "Cozy Corner" | "Center Stage" | "Power Duo";

export interface ManualGroupActivityItem {
  title: string;
  description: string;
  modality: ActivityModality;
}

export class ManualGroupActivity {
  constructor(
    public id: any,
    public memberIds: mongoose.Types.ObjectId[],
    public createdAt: Date,
    public updatedAt: Date,
    public skills?: string[],
    public themes?: string[],
    public dynamicAnalysis?: string,
    public activities?: ManualGroupActivityItem[]
  ) {}
}
