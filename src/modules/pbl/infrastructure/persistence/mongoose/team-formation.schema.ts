

import mongoose, { Schema, Document, Model } from 'mongoose';

const TeamMemberSchema = new Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    justification: { type: String, required: true },
}, { _id: false });

const TeamSchema = new Schema({
    teamName: { type: String, required: true },
    members: { type: [TeamMemberSchema], required: true },
    rationale: { type: String, required: true },
}, { _id: false });

const TeamFormationSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'PblProject', required: true },
    criteria: { type: String, required: true },
    teams: { type: [TeamSchema], required: true },
}, { timestamps: true });

export interface ITeamFormationDocument extends Document {
    _id: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    criteria: string;
    teams: {
        teamName: string;
        members: {
            studentId: string;
            name: string;
            role: string;
            justification: string;
        }[];
        rationale: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const TeamFormationModel: Model<ITeamFormationDocument> = mongoose.models.TeamFormation || mongoose.model<ITeamFormationDocument>('TeamFormation', TeamFormationSchema);

export default TeamFormationModel;
