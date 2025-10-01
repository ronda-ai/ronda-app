
import { IEncryptionService } from '@/modules/shared/domain-types/encryption-service.interface';
import { ITeacherLabRepository } from '../../../domain/interfaces/teacher-lab-repository.interface';
import { ClassroomPulse, PedagogicalMenu, QuestionAnalysisOutput, Reflection } from '../../../domain/teacher-lab.entity';

export class TeacherLabEncryptionRepository implements ITeacherLabRepository {
  constructor(
    private readonly decoratedRepository: ITeacherLabRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  // ClassroomPulse
  async saveClassroomPulse(data: Omit<ClassroomPulse, 'id' | 'createdAt'>): Promise<ClassroomPulse> {
    const encryptedData = {
        strengths: data.strengths.map(s => ({...s, description: this.encryptionService.encrypt(s.description)})),
        challenges: data.challenges.map(c => ({...c, description: this.encryptionService.encrypt(c.description)})),
    };
    return this.decoratedRepository.saveClassroomPulse(encryptedData);
  }

  async findLatestClassroomPulse(): Promise<ClassroomPulse | null> {
    const pulse = await this.decoratedRepository.findLatestClassroomPulse();
    if (!pulse) return null;
    
    try {
        return {
            ...pulse,
            strengths: pulse.strengths.map(s => ({...s, description: this.encryptionService.decrypt(s.description)})),
            challenges: pulse.challenges.map(c => ({...c, description: this.encryptionService.decrypt(c.description)})),
        };
    } catch(e) {
        return pulse;
    }
  }

  // PedagogicalMenu
  async savePedagogicalMenu(data: Omit<PedagogicalMenu, 'id' | 'createdAt'>): Promise<PedagogicalMenu> {
    const encryptedData = {
        objective: this.encryptionService.encrypt(data.objective),
        approaches: data.approaches.map(a => ({
            ...a,
            title: this.encryptionService.encrypt(a.title),
            mbeJustification: this.encryptionService.encrypt(a.mbeJustification),
            adaptationSuggestion: this.encryptionService.encrypt(a.adaptationSuggestion),
            activities: {
                start: this.encryptionService.encrypt(a.activities.start),
                development: this.encryptionService.encrypt(a.activities.development),
                closure: this.encryptionService.encrypt(a.activities.closure),
            }
        }))
    };
    return this.decoratedRepository.savePedagogicalMenu(encryptedData);
  }

  async findLatestPedagogicalMenu(): Promise<PedagogicalMenu | null> {
    const menu = await this.decoratedRepository.findLatestPedagogicalMenu();
    if(!menu) return null;

    try {
        return {
            ...menu,
            objective: this.encryptionService.decrypt(menu.objective),
            approaches: menu.approaches.map(a => ({
                ...a,
                title: this.encryptionService.decrypt(a.title),
                mbeJustification: this.encryptionService.decrypt(a.mbeJustification),
                adaptationSuggestion: this.encryptionService.decrypt(a.adaptationSuggestion),
                 activities: {
                    start: this.encryptionService.decrypt(a.activities.start),
                    development: this.encryptionService.decrypt(a.activities.development),
                    closure: this.encryptionService.decrypt(a.activities.closure),
                }
            }))
        };
    } catch (e) {
        return menu;
    }
  }

  // QuestionAnalysis
  async saveQuestionAnalysis(data: Omit<QuestionAnalysisOutput, 'id' | 'createdAt'>): Promise<QuestionAnalysisOutput> {
    const encryptedData = {
        summary: this.encryptionService.encrypt(data.summary),
        analyses: data.analyses.map(a => ({
            ...a,
            question: this.encryptionService.encrypt(a.question),
            justification: this.encryptionService.encrypt(a.justification),
            suggestion: this.encryptionService.encrypt(a.suggestion)
        }))
    };
    return this.decoratedRepository.saveQuestionAnalysis(encryptedData);
  }

  async findLatestQuestionAnalysis(): Promise<QuestionAnalysisOutput | null> {
    const analysis = await this.decoratedRepository.findLatestQuestionAnalysis();
    if(!analysis) return null;
    
    try {
        return {
            ...analysis,
            summary: this.encryptionService.decrypt(analysis.summary),
            analyses: analysis.analyses.map(a => ({
                ...a,
                question: this.encryptionService.decrypt(a.question),
                justification: this.encryptionService.decrypt(a.justification),
                suggestion: this.encryptionService.decrypt(a.suggestion)
            }))
        };
    } catch(e) {
        return analysis;
    }
  }

  // Reflection
  async saveReflection(data: Omit<Reflection, 'id' | 'createdAt'>): Promise<Reflection> {
    const encryptedData = {
        history: data.history.map(h => ({...h, text: this.encryptionService.encrypt(h.text)}))
    };
    return this.decoratedRepository.saveReflection(encryptedData);
  }

  async findLatestReflection(): Promise<Reflection | null> {
    const reflection = await this.decoratedRepository.findLatestReflection();
    if(!reflection) return null;

    try {
        return {
            ...reflection,
            history: reflection.history.map(h => ({...h, text: this.encryptionService.decrypt(h.text)}))
        };
    } catch(e) {
        return reflection;
    }
  }
}
