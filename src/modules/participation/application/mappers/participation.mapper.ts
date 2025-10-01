
import { Participation } from "../../domain/participation.entity";
import { ParticipationDTO } from "../dtos/participation.dto";

export class ParticipationMapper {
    public static toDTO(participation: Participation): ParticipationDTO {
        return {
            id: participation.id,
            studentId: participation.studentId,
            date: participation.date,
        };
    }
}
