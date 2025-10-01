

import { Student } from '@/modules/student/domain/student.entity';
import mongoose, { Schema, Document, Model } from 'mongoose';

const StudentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    qualities: { type: [String], default: [] },
    age: { type: mongoose.Schema.Types.Mixed }, // Storing as mixed to allow for encrypted strings
    notes: { type: String },
    fears: { type: [String], default: [] },
    disability: { type: String },
    neurodiversity: { type: String },
    goodRelations: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    badRelations: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    isAbsent: { type: mongoose.Schema.Types.Mixed }, // Storing as mixed for encrypted boolean
    gender: { type: String }, // Storing as encrypted string
    publicId: { type: String, unique: true, sparse: true, default: undefined },
    publicIdExpiresAt: { type: Date, default: null },
    publicIdViewed: { type: Boolean, default: false },
    isUniqueViewActive: { type: Boolean, default: false },
    publicTheme: { type: String },
}, { timestamps: true });

// This interface is needed for correct typing with Mongoose
export interface IStudentDocument extends Omit<Student, 'id' | 'participation' | 'goodRelations' | 'badRelations' | 'challengeHistory'>, Document {
    _id: mongoose.Types.ObjectId; // Explicitly type _id
    id: string; // Mongoose uses 'id' as a virtual getter for '_id'
    goodRelations: mongoose.Types.ObjectId[];
    badRelations: mongoose.Types.ObjectId[];
}


// Check if the model is already defined before defining it
const StudentModel: Model<IStudentDocument> = mongoose.models.Student || mongoose.model<IStudentDocument>('Student', StudentSchema);

export default StudentModel;
