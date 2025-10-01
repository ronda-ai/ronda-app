
import { dbConnect } from "@/lib/mongodb";
import { ISupportPlanRepository } from "../../../domain/interfaces/support-plan-repository.interface";
import SupportPlanModel, { ISupportPlanDocument } from "./support-plan.schema";
import { SupportPlan } from "../../../domain/support-plan.entity";
import mongoose from "mongoose";
import { CreateSupportPlanDTO } from "@/modules/support-plan/application/dtos/create-support-plan.dto";

export class MongooseSupportPlanRepository implements ISupportPlanRepository {

    private toDomain(doc: ISupportPlanDocument): SupportPlan {
        return new SupportPlan(
            doc._id.toString(),
            doc.studentId,
            doc.steps.map(s => ({ text: s.text, status: s.status, feedback: s.feedback })),
            doc.createdAt,
            doc.updatedAt,
            doc.teacherFeedback
        );
    }

    async create(data: CreateSupportPlanDTO): Promise<SupportPlan> {
        await dbConnect();
        const newPlan = await SupportPlanModel.create({
            ...data,
            studentId: new mongoose.Types.ObjectId(data.studentId)
        });
        return this.toDomain(newPlan);
    }
    
    async findById(id: string): Promise<SupportPlan | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await SupportPlanModel.findById(id).exec();
        return doc ? this.toDomain(doc) : null;
    }

    async findByStudentId(studentId: string): Promise<SupportPlan[]> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(studentId)) return [];
        const plans = await SupportPlanModel.find({ studentId: new mongoose.Types.ObjectId(studentId) }).sort({ createdAt: -1 }).exec();
        return plans.map(this.toDomain);
    }

    async update(id: string, data: Partial<SupportPlan>): Promise<SupportPlan | null> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const updatedPlan = await SupportPlanModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updatedPlan) return null;
        return this.toDomain(updatedPlan);
    }

    async delete(id: string): Promise<void> {
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(id)) return;
        await SupportPlanModel.findByIdAndDelete(id).exec();
    }
}
