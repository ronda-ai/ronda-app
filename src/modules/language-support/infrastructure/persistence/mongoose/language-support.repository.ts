

import { dbConnect } from "@/lib/mongodb";
import { ILanguageSupportRepository } from "../../../domain/interfaces/language-support-repository.interface";
import { CreateLanguageSupportDTO } from "../../../application/dtos/create-language-support.dto";
import { LanguageSupport } from "../../../domain/language-support.entity";
import LanguageSupportModel, { ILanguageSupportDocument } from "./language-support.schema";
import mongoose from "mongoose";

export class MongooseLanguageSupportRepository implements ILanguageSupportRepository {

    private toDomain(doc: ILanguageSupportDocument): LanguageSupport {
        return new LanguageSupport(
            doc._id.toString(),
            doc.studentId,
            doc.nativeLanguage,
            doc.focusAreas,
            doc.teacherGuide,
            doc.studentMaterial,
            doc.studentMaterialTranslation,
            doc.createdAt,
            doc.updatedAt,
            doc.materialType,
            doc.feedback,
            doc.audioUrl
        );
    }
    
    async create(data: CreateLanguageSupportDTO): Promise<LanguageSupport> {
        await dbConnect();
        const newSupport = await LanguageSupportModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newSupport);
    }

    async findByStudentId(studentId: string): Promise<LanguageSupport[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const supports = await LanguageSupportModel.find({ studentId: new mongoose.Types.ObjectId(studentId) })
            .sort({ createdAt: -1 })
            .exec();
        return supports.map(this.toDomain);
    }

    async findById(id: string): Promise<LanguageSupport | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await LanguageSupportModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }
    
    async update(id: string, data: Partial<LanguageSupport>): Promise<LanguageSupport | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedDoc = await LanguageSupportModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedDoc) return null;
        return this.toDomain(updatedDoc);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await LanguageSupportModel.findByIdAndDelete(id).exec();
    }
}
