
import { CommitteeMission } from "../../domain/safety-committee.entity";

export interface CreateSafetyCommitteeDTO {
    name: string;
    members?: {
        studentId: string;
        role: string;
    }[];
    missions?: CommitteeMission[];
}
