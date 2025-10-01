

import { ClassroomPulse } from '../teacher-lab.entity';
import { PedagogicalMenu } from '../teacher-lab.entity';
import { QuestionAnalysisOutput, Reflection } from '../teacher-lab.entity';

export interface ITeacherLabRepository {
    saveClassroomPulse(data: Omit<ClassroomPulse, 'id' | 'createdAt'>): Promise<ClassroomPulse>;
    findLatestClassroomPulse(): Promise<ClassroomPulse | null>;
    
    savePedagogicalMenu(data: Omit<PedagogicalMenu, 'id' | 'createdAt'>): Promise<PedagogicalMenu>;
    findLatestPedagogicalMenu(): Promise<PedagogicalMenu | null>;
    
    saveQuestionAnalysis(data: Omit<QuestionAnalysisOutput, 'id' | 'createdAt'>): Promise<QuestionAnalysisOutput>;
    findLatestQuestionAnalysis(): Promise<QuestionAnalysisOutput | null>;
    
    saveReflection(data: Omit<Reflection, 'id' | 'createdAt'>): Promise<Reflection>;
    findLatestReflection(): Promise<Reflection | null>;
}
