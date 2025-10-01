
import { AIConfigurationDTO } from "@/modules/ai-configuration/application/dtos/ai-configuration.dto";
import { SelectionMode } from "@/modules/student/domain/student.entity";

export interface ChallengeHistoryDTO {
    id: string;
    studentId: string;
    challenge: {
        challenge: string;
        tip: string;
        createdAt: string;
    };
    status: 'pending' | 'evaluated' | 'rejected';
    rating?: 'needs-support' | 'met-expectations' | 'exceeded-expectations';
    feedback?: string;
    attempts?: number;
    aiConfiguration?: Partial<AIConfigurationDTO>;
    mood?: string;
    selectionMode?: SelectionMode;
}
