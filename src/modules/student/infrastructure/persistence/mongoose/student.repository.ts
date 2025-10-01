

import { dbConnect } from "@/lib/mongodb";
import { UpdateStudentDTO } from '../../../application/dtos/update-student.dto';
import { IStudentRepository } from '../../../domain/interfaces/student-repository.interface';
import { Student } from '../../../domain/student.entity';
import StudentModel, { IStudentDocument } from './student.schema';
import mongoose from 'mongoose';

export class MongooseStudentRepository implements IStudentRepository {
    
    private toDomain(doc: IStudentDocument): Student {
        const student = new Student(
             doc._id.toString(),
             doc.name,
             doc.qualities,
             doc.age,
             doc.notes,
             doc.fears,
             doc.disability,
             doc.neurodiversity,
             (doc.goodRelations || []).map(id => id.toString()),
             (doc.badRelations || []).map(id => id.toString()),
             doc.isAbsent,
             doc.gender,
             doc.publicId,
             doc.publicIdExpiresAt,
             doc.publicIdViewed,
             doc.isUniqueViewActive,
             doc.publicTheme,
             0 // participation is calculated in the service
        );
        return student;
    }

    async findAll(): Promise<Student[]> {
        await dbConnect();
        const studentDocs = await StudentModel.find().sort({ name: 1 }).exec();
        return studentDocs.map(doc => this.toDomain(doc));
    }

    async findById(id: string): Promise<Student | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const studentDoc = await StudentModel.findById(id).exec();
        if (!studentDoc) return null;
        return this.toDomain(studentDoc);
    }
    
    async findByPublicId(publicId: string): Promise<Student | null> {
        await dbConnect();
        const studentDoc = await StudentModel.findOne({ publicId }).exec();
        if (!studentDoc) return null;
        return this.toDomain(studentDoc);
    }

    async findByName(name: string): Promise<Student | null> {
        await dbConnect();
        const studentDoc = await StudentModel.findOne({ name }).exec();
        if (!studentDoc) return null;
        return this.toDomain(studentDoc);
    }

    async create(studentData: Omit<Student, 'id' | 'participation'>): Promise<Student> {
        await dbConnect();
        const studentDoc = await StudentModel.create(studentData);
        return this.toDomain(studentDoc);
    }

    async update(id: string, studentData: UpdateStudentDTO): Promise<Student | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        const updatePayload: any = { ...studentData };

        // Ensure relations are converted to ObjectIds for update, filtering out invalid values
        if (studentData.goodRelations) {
            updatePayload.goodRelations = studentData.goodRelations
                .filter(relId => typeof relId === 'string' && mongoose.Types.ObjectId.isValid(relId))
                .map(relId => new mongoose.Types.ObjectId(relId));
        }
        if (studentData.badRelations) {
            updatePayload.badRelations = studentData.badRelations
                .filter(relId => typeof relId === 'string' && mongoose.Types.ObjectId.isValid(relId))
                .map(relId => new mongoose.Types.ObjectId(relId));
        }

        const studentDoc = await StudentModel.findByIdAndUpdate(id, { $set: updatePayload }, { new: true }).exec();
        
        if (!studentDoc) return null;

        return this.toDomain(studentDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await StudentModel.findByIdAndDelete(id).exec();
    }
}
