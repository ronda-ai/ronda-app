
import { AIConfigurationDTO } from "@/modules/ai-configuration/application/dtos/ai-configuration.dto";
import { SelectionMode } from "@/modules/student/domain/student.entity";
import mongoose from "mongoose";

export class Challenge {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public challenge: string,
        public tip: string,
        public createdAt: Date,
        public status: 'pending' | 'evaluated' | 'rejected' = 'pending',
        public rating?: 'needs-support' | 'met-expectations' | 'exceeded-expectations',
        public feedback?: string,
        public attempts?: number,
        public aiConfiguration?: Partial<AIConfigurationDTO>,
        public mood?: string,
        public selectionMode?: SelectionMode,
    ) {}
}
