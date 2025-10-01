import type { ClassroomPulseDTO } from "../../application/dtos/classroom-pulse.dto";
import type { PedagogicalMenuDTO } from "../../application/dtos/pedagogical-menu.dto";
import type { ClassroomClimateScenarioInput, ClassroomClimateScenarioOutput } from '@/modules/teacher-lab/application/dtos/classroom-climate-scenario.dto';
import type { QuestionAnalysisInput, QuestionAnalysisOutput } from '../../application/dtos/question-analysis.dto';
import type { ReflectionGuidanceInput, ReflectionGuidanceOutput } from '../../application/dtos/reflection-guidance.dto';
import type { ClassAnalysisFromAudioDTO } from '../../application/dtos/class-analysis-from-audio.dto';
import type { ClassAnalysisFromAudioInput } from '@/ai/flows/generate-class-analysis-from-audio';


export interface ITeacherLabService {
    generateClassroomPulse(language: string): Promise<ClassroomPulseDTO>;
    generatePedagogicalMenu(input: {
        objective: string;
        language: string;
    }): Promise<PedagogicalMenuDTO>;
    generateClassroomClimateScenario(input: ClassroomClimateScenarioInput): Promise<ClassroomClimateScenarioOutput>;
    generateQuestionAnalysis(input: QuestionAnalysisInput): Promise<QuestionAnalysisOutput>;
    generateClassAnalysisFromAudio(input: ClassAnalysisFromAudioInput): Promise<ReadableStream<Uint8Array>>;
    generateReflectionGuidance(input: ReflectionGuidanceInput): Promise<ReflectionGuidanceOutput>;
    getLatestClassroomPulse(): Promise<ClassroomPulseDTO | null>;
    getLatestPedagogicalMenu(): Promise<PedagogicalMenuDTO | null>;
    getLatestQuestionAnalysis(): Promise<QuestionAnalysisOutput | null>;
    getLatestReflection(): Promise<{ role: 'user' | 'model'; text: string; }[] | null>;
}
