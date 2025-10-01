
interface PulseItem {
    mbeCriterion: string;
    description: string;
}

export interface ClassroomPulseDTO {
    strengths: PulseItem[];
    challenges: PulseItem[];
}
