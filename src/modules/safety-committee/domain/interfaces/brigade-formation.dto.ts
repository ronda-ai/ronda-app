
interface BrigadeMember {
    studentId: string;
    studentName: string;
    role: string;
    justification: string;
}

interface Brigade {
    name: string;
    members: BrigadeMember[];
    rationale: string;
}

export interface BrigadeFormationResult {
    brigade: Brigade;
}
