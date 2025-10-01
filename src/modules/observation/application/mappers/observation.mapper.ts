
import { Observation } from "../../domain/observation.entity";
import { ObservationDTO } from "../dtos/observation.dto";


export class ObservationMapper {
    public static toDTO(observation: Observation): ObservationDTO {
        return {
            id: observation.id,
            studentId: observation.studentId.toString(),
            observation: observation.observation,
            type: observation.type,
            tags: observation.tags,
            deepeningQuestion: observation.deepeningQuestion,
            createdAt: observation.createdAt.toISOString(),
        };
    }
}
