
import { SafetyCommittee } from "../../domain/safety-committee.entity";
import { SafetyCommitteeDTO } from "../dtos/safety-committee.dto";

export class SafetyCommitteeMapper {
    public static toDTO(committee: SafetyCommittee): Omit<SafetyCommitteeDTO, 'members'> {
        return {
            id: committee.id,
            name: committee.name,
            missions: committee.missions,
        };
    }
}
