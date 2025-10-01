
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";
import { CommitteeMission } from "../../domain/safety-committee.entity";

export interface CommitteeMemberDTO {
    student: StudentDTO;
    role: string;
}

export interface SafetyCommitteeDTO {
    id: string;
    name: string;
    members: CommitteeMemberDTO[];
    missions: CommitteeMission[];
}
