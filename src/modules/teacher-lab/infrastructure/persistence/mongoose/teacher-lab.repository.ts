
import { dbConnect } from "@/lib/mongodb";
import { ITeacherLabRepository } from "../../../domain/interfaces/teacher-lab-repository.interface";
import { ClassroomPulse, PedagogicalMenu, QuestionAnalysisOutput, Reflection } from "../../../domain/teacher-lab.entity";
import ClassroomPulseModel from './classroom-pulse.schema';
import { getPedagogicalMenuModel } from './pedagogical-menu.schema';
import { getQuestionAnalysisModel } from './question-analysis.schema';
import ReflectionModel from './reflection.schema';

export class MongooseTeacherLabRepository implements ITeacherLabRepository {

    // --- ClassroomPulse ---
    async saveClassroomPulse(data: Omit<ClassroomPulse, 'id' | 'createdAt'>): Promise<ClassroomPulse> {
        await dbConnect();
        const doc = await ClassroomPulseModel.create(data);
        return { id: doc._id.toString(), ...doc.toObject() };
    }

    async findLatestClassroomPulse(): Promise<ClassroomPulse | null> {
        await dbConnect();
        const doc = await ClassroomPulseModel.findOne().sort({ createdAt: -1 }).exec();
        return doc ? { id: doc._id.toString(), ...doc.toObject() } : null;
    }

    // --- PedagogicalMenu ---
    async savePedagogicalMenu(data: Omit<PedagogicalMenu, 'id' | 'createdAt'>): Promise<PedagogicalMenu> {
        await dbConnect();
        const PedagogicalMenuModel = getPedagogicalMenuModel();
        const doc = await PedagogicalMenuModel.create(data);
        return { id: doc._id.toString(), ...doc.toObject() };
    }

    async findLatestPedagogicalMenu(): Promise<PedagogicalMenu | null> {
        await dbConnect();
        const PedagogicalMenuModel = getPedagogicalMenuModel();
        const doc = await PedagogicalMenuModel.findOne().sort({ createdAt: -1 }).exec();
        return doc ? { id: doc._id.toString(), ...doc.toObject() } : null;
    }
    
     // --- QuestionAnalysis ---
    async saveQuestionAnalysis(data: Omit<QuestionAnalysisOutput, 'id' | 'createdAt'>): Promise<QuestionAnalysisOutput> {
        await dbConnect();
        const QuestionAnalysisModel = getQuestionAnalysisModel();
        const doc = await QuestionAnalysisModel.create(data);
        return { id: doc._id.toString(), ...doc.toObject() };
    }

    async findLatestQuestionAnalysis(): Promise<QuestionAnalysisOutput | null> {
        await dbConnect();
        const QuestionAnalysisModel = getQuestionAnalysisModel();
        const doc = await QuestionAnalysisModel.findOne().sort({ createdAt: -1 }).exec();
        return doc ? { id: doc._id.toString(), ...doc.toObject() } : null;
    }
    
    // --- Reflection ---
    async saveReflection(data: Omit<Reflection, 'id' | 'createdAt'>): Promise<Reflection> {
        await dbConnect();
        const doc = await ReflectionModel.create(data);
        return { id: doc._id.toString(), ...doc.toObject() };
    }

    async findLatestReflection(): Promise<Reflection | null> {
        await dbConnect();
        const doc = await ReflectionModel.findOne().sort({ createdAt: -1 }).exec();
        return doc ? { id: doc._id.toString(), ...doc.toObject() } : null;
    }
}
