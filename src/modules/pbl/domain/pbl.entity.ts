
import mongoose from "mongoose";

export class PblProject {
    constructor(
        public id: any,
        public topic: string,
        public skills: string[],
        public duration: string,
        public essentialQuestion: string,
        public phases: string,
        public milestones: string,
        public finalProductSuggestion: string,
        public createdAt: Date,
        public updatedAt: Date,
        public ageOrGrade?: string, // Added field
    ) {}
}

export interface TeamMember {
    studentId: string;
    name: string;
    role: string;
    justification: string;
}

export interface Team {
    teamName: string;
    members: TeamMember[];
    rationale: string;
}

export class TeamFormation {
    constructor(
        public id: any,
        public projectId: mongoose.Types.ObjectId,
        public criteria: string,
        public teams: Team[],
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
