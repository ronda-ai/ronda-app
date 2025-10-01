import { ITeacherLabService } from '../domain/interfaces/teacher-lab-service.interface';
import type { ClassroomPulseDTO } from './dtos/classroom-pulse.dto';
import type { PedagogicalMenuDTO } from './dtos/pedagogical-menu.dto';
import { IStudentService } from '@/modules/student/domain/interfaces/student-service.interface';
import { IAnonymizationService } from '@/modules/shared/domain-types/anonymization-service.interface';
import { IAIConfigurationService } from '@/modules/ai-configuration/domain/interfaces/ai-configuration-service.interface';
import { generateClassroomPulse } from '@/ai/flows/generate-classroom-pulse';
import { generatePedagogicalMenu } from '@/ai/flows/generate-pedagogical-menu';
import { generateClassroomClimateScenario } from '@/ai/flows/generate-classroom-climate-scenario';
import { generateQuestionAnalysis } from '@/ai/flows/generate-question-analysis';
import type { ClassroomClimateScenarioInput, ClassroomClimateScenarioOutput } from '@/modules/teacher-lab/application/dtos/classroom-climate-scenario.dto';
import type { QuestionAnalysisInput, QuestionAnalysisOutput } from '@/modules/teacher-lab/application/dtos/question-analysis.dto';
import { generateReflectionGuidance } from '@/ai/flows/generate-reflection-guidance';
import type { ReflectionGuidanceInput, ReflectionGuidanceOutput } from '@/modules/teacher-lab/application/dtos/reflection-guidance.dto';
import { generateClassAnalysisFromAudio, ClassAnalysisFromAudioInput } from '@/ai/flows/generate-class-analysis-from-audio';
import { ITeacherLabRepository } from '../domain/interfaces/teacher-lab-repository.interface';
import { TeacherLabMapper } from './mappers/teacher-lab.mapper';

export class TeacherLabService implements ITeacherLabService {
    constructor(
        private readonly repository: ITeacherLabRepository,
        private readonly studentService: IStudentService,
        private readonly aiConfigService: IAIConfigurationService,
        private readonly anonymizationService: IAnonymizationService,
    ) {}

    async generateClassroomPulse(language: string): Promise<ClassroomPulseDTO> {
        const students = await this.studentService.getAllStudents();
        if (students.length === 0) {
            return { strengths: [], challenges: [] };
        }
        
        const { anonymizedData: anonymizedStudents, mapping } = this.anonymizationService.anonymize(students, students);
        
        const result = await generateClassroomPulse({
            students: anonymizedStudents,
            language,
        });

        const deAnonymizeItem = (item: { mbeCriterion: string; description: string }) => ({
            ...item,
            description: this.anonymizationService.deAnonymizeText(item.description, mapping),
        });

        const pulseData = {
            strengths: result.strengths.map(deAnonymizeItem),
            challenges: result.challenges.map(deAnonymizeItem),
        };

        await this.repository.saveClassroomPulse(pulseData);
        return pulseData;
    }

    async generatePedagogicalMenu(input: {
        objective: string;
        language: string;
    }): Promise<PedagogicalMenuDTO> {
        const students = await this.studentService.getAllStudents();
        const aiConfig = await this.aiConfigService.getConfiguration();

        const { anonymizedData: anonymizedStudents, mapping } = this.anonymizationService.anonymize(students, students);

        const result = await generatePedagogicalMenu({
            objective: input.objective,
            language: input.language,
            students: anonymizedStudents,
            classContext: {
                subject: aiConfig?.subject,
                ageOrGrade: aiConfig?.ageOrGrade,
            }
        });
        
        const deAnonymizeApproach = (approach: any) => ({
            ...approach,
            title: this.anonymizationService.deAnonymizeText(approach.title, mapping),
            mbeJustification: this.anonymizationService.deAnonymizeText(approach.mbeJustification, mapping),
            adaptationSuggestion: this.anonymizationService.deAnonymizeText(approach.adaptationSuggestion, mapping),
             activities: {
                start: this.anonymizationService.deAnonymizeText(approach.activities.start, mapping),
                development: this.anonymizationService.deAnonymizeText(approach.activities.development, mapping),
                closure: this.anonymizationService.deAnonymizeText(approach.activities.closure, mapping),
            }
        });

        const menuData = {
            objective: input.objective,
            approaches: result.approaches.map(deAnonymizeApproach),
        };
        
        await this.repository.savePedagogicalMenu(menuData);
        return menuData;
    }

    async generateClassroomClimateScenario(input: ClassroomClimateScenarioInput): Promise<ClassroomClimateScenarioOutput> {
        const studentAliases = (await this.studentService.getAllStudents()).slice(0, 4).map(s => s.name);
        const result = await generateClassroomClimateScenario({...input, studentAliases});
        return result;
    }
    
    async generateQuestionAnalysis(input: QuestionAnalysisInput): Promise<QuestionAnalysisOutput> {
        const result = await generateQuestionAnalysis(input);
        await this.repository.saveQuestionAnalysis(result);
        return result;
    }
    
     async generateClassAnalysisFromAudio(input: ClassAnalysisFromAudioInput): Promise<ReadableStream<Uint8Array>> {
        const resultStream = await generateClassAnalysisFromAudio(input);
        return resultStream;
    }
    
    async generateReflectionGuidance(input: ReflectionGuidanceInput): Promise<ReflectionGuidanceOutput> {
        const result = await generateReflectionGuidance(input);
        const newHistory: { role: 'user' | 'model'; text: string; }[] = input.history ? [...input.history, { role: 'user', text: input.teacherReflection }, { role: 'model', text: result.guidance }] : [{ role: 'user', text: input.teacherReflection }, { role: 'model', text: result.guidance }];
        await this.repository.saveReflection({ history: newHistory });
        return result;
    }

    async getLatestClassroomPulse(): Promise<ClassroomPulseDTO | null> {
        const pulse = await this.repository.findLatestClassroomPulse();
        return pulse ? TeacherLabMapper.toClassroomPulseDTO(pulse) : null;
    }

    async getLatestPedagogicalMenu(): Promise<PedagogicalMenuDTO | null> {
        const menu = await this.repository.findLatestPedagogicalMenu();
        return menu ? TeacherLabMapper.toPedagogicalMenuDTO(menu) : null;
    }
    
    async getLatestQuestionAnalysis(): Promise<QuestionAnalysisOutput | null> {
        const analysis = await this.repository.findLatestQuestionAnalysis();
        return analysis ? TeacherLabMapper.toQuestionAnalysisDTO(analysis) : null;
    }

    async getLatestReflection(): Promise<{ role: 'user' | 'model'; text: string; }[] | null> {
        const reflection = await this.repository.findLatestReflection();
        return reflection ? TeacherLabMapper.toReflectionDTO(reflection) : null;
    }
}
