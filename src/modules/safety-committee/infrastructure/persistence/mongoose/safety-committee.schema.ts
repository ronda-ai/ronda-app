
import mongoose, { Schema, Document, Model } from 'mongoose';

const CommitteeMemberSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    role: { type: String, required: true, default: 'Member' },
}, { _id: false });

const MissionSchema = new Schema({
    text: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, { _id: false });

const SafetyCommitteeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    members: [CommitteeMemberSchema],
    missions: [MissionSchema],
}, { timestamps: true });

export interface ISafetyCommitteeDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    members: {
        studentId: mongoose.Types.ObjectId;
        role: string;
    }[];
    missions: {
        text: string;
        status: 'pending' | 'completed';
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const SafetyCommitteeModel: Model<ISafetyCommitteeDocument> = mongoose.models.SafetyCommittee || mongoose.model<ISafetyCommitteeDocument>('SafetyCommittee', SafetyCommitteeSchema);

export default SafetyCommitteeModel;
