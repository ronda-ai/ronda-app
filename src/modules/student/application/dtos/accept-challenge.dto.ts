
import { AIConfigurationDTO } from "./ai-configuration.dto";
import { SelectionMode } from "../../domain/student.entity";


export interface AcceptChallengeDTO {
    studentIds: string[];
    challenge: string;
    tip: string;
    attempts: number;
    aiConfiguration: AIConfigurationDTO;
    selectionMode: SelectionMode;
}
