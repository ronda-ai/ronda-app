
import mongoose from "mongoose";

export interface CommitteeMember {
    studentId: mongoose.Types.ObjectId;
    role: string;
}

export interface CommitteeMission {
    text: string;
    status: 'pending' | 'completed';
}

export class SafetyCommittee {
    constructor(
        public id: any,
        public name: string,
        public members: CommitteeMember[],
        public missions: CommitteeMission[],
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
