
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { IAttendanceRepository } from "../../../domain/interfaces/attendance-repository.interface";
import { Attendance } from "../../../domain/attendance.entity";
import AttendanceModel, { IAttendanceDocument } from "./attendance.schema";
import { SetAttendanceDTO } from "../../../application/dtos/set-attendance.dto";

export class MongooseAttendanceRepository implements IAttendanceRepository {

    private toDomain(doc: IAttendanceDocument): Attendance {
        return new Attendance(
            doc._id.toString(),
            doc.studentId,
            doc.date,
            doc.status,
            doc.createdAt,
            doc.updatedAt
        );
    }

    async set(data: SetAttendanceDTO): Promise<Attendance> {
        await dbConnect();
        const date = new Date(data.date);
        date.setUTCHours(0, 0, 0, 0); // Normalize date to start of day UTC

        const record = await AttendanceModel.findOneAndUpdate(
            {
                studentId: new mongoose.Types.ObjectId(data.studentId),
                date: date
            },
            { status: data.status },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).exec();

        return this.toDomain(record);
    }

    async setBulk(data: SetAttendanceDTO[]): Promise<void> {
        await dbConnect();
        const operations = data.map(item => {
            const date = new Date(item.date);
            date.setUTCHours(0, 0, 0, 0); // Normalize date
            return {
                updateOne: {
                    filter: {
                        studentId: new mongoose.Types.ObjectId(item.studentId),
                        date: date
                    },
                    update: { $set: { status: item.status } },
                    upsert: true
                }
            };
        });
        
        if (operations.length > 0) {
            await AttendanceModel.bulkWrite(operations);
        }
    }

    async findByDate(date: Date): Promise<Attendance[]> {
        await dbConnect();
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const records = await AttendanceModel.find({
            date: { $gte: startOfDay, $lte: endOfDay }
        }).exec();
        return records.map(this.toDomain);
    }

    async findByMonth(month: number, year: number): Promise<Attendance[]> {
        await dbConnect();
        const startDate = new Date(Date.UTC(year, month, 1));
        const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

        const records = await AttendanceModel.find({
            date: { $gte: startDate, $lte: endDate }
        }).exec();

        return records.map(this.toDomain);
    }
    
    async findByDateRange(startDate: Date, endDate: Date, studentIds?: string[]): Promise<Attendance[]> {
        await dbConnect();
        const query: any = {
            date: { $gte: startDate, $lte: endDate }
        };
        if (studentIds && studentIds.length > 0) {
            query.studentId = { $in: studentIds.map(id => new mongoose.Types.ObjectId(id)) };
        }
        const records = await AttendanceModel.find(query).exec();
        return records.map(this.toDomain);
    }


    async findByStudentAndDate(studentId: string, date: Date): Promise<Attendance | null> {
        await dbConnect();
         const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const record = await AttendanceModel.findOne({
            studentId: new mongoose.Types.ObjectId(studentId),
            date: { $gte: startOfDay, $lte: endOfDay }
        }).exec();

        return record ? this.toDomain(record) : null;
    }
}
