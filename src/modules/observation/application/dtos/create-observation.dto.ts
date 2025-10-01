
import { ObservationType } from "./observation.dto";

export interface CreateObservationDTO {
    studentId: string;
    observation: string;
    type: ObservationType;
    tags?: string[];
    deepeningQuestion?: string;
}
