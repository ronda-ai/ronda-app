
import mongoose, { Schema, Document, Model } from 'mongoose';
import { AttendanceStatus } from '@/modules/attendance/application/dtos/attendance.dto';

const attendanceStatuses: AttendanceStatus[] = ['present', 'absent', 'late', 'justified'];

const AttendanceSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: attendanceStatuses, required: true },
}, { timestamps: true });

// Compound index to ensure only one entry per student per day
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export interface IAttendanceDocument extends Document {
    _id: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    date: Date;
    status: AttendanceStatus;
    createdAt: Date;
    updatedAt: Date;
}

const AttendanceModel: Model<IAttendanceDocument> = mongoose.models.Attendance || mongoose.model<IAttendanceDocument>('Attendance', AttendanceSchema);

export default AttendanceModel;
