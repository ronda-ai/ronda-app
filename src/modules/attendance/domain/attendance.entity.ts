
import mongoose from "mongoose";
import { AttendanceStatus } from "../application/dtos/attendance.dto";

export class Attendance {
    constructor(
        public id: any,
        public studentId: mongoose.Types.ObjectId,
        public date: Date,
        public status: AttendanceStatus,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
