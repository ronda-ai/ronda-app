
import { AIConfigurationDTO } from "@/modules/student/application/dtos/ai-configuration.dto";
import { SelectionMode } from "@/modules/student/domain/student.entity";

export interface CreateChallengeDTO {
    studentId: string;
    challenge: string;
    tip: string;
    status: 'pending' | 'evaluated' | 'rejected';
    rating?: 'needs-support' | 'met-expectations' | 'exceeded-expectations';
    feedback?: string;
    attempts?: number;
    aiConfiguration?: AIConfigurationDTO;
    mood?: string;
    selectionMode?: SelectionMode;
}
