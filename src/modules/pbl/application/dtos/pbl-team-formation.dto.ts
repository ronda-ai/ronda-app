

interface TeamMember {
    studentId: string;
    name: string;
    role: string;
    justification: string;
}

interface Team {
    teamName: string;
    members: TeamMember[];
    rationale: string;
}

export interface TeamFormationResult {
    teams: Team[];
}

export interface TeamFormationWithId extends TeamFormationResult {
    id: string;
    projectId: string;
    criteria: string;
    createdAt: string;
}

export interface CreateTeamFormationDTO {
    projectId: string;
    criteria: 'balanced' | 'social-remediation' | 'synergy';
    teams: Team[];
}
