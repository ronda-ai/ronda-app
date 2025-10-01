
import { AIConfigurationDTO } from "./ai-configuration.dto";

export interface StudentChallengeDTO {
    challenge: string;
    tip: string;
    status: 'pending' | 'evaluated';
    rating?: 'needs-support' | 'met-expectations' | 'exceeded-expectations';
    feedback?: string;
    attempts?: number;
    aiConfiguration?: AIConfigurationDTO;
    mood?: string;
}
