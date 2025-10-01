
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { MbeConsultation } from '../mbe-expert.entity';

export interface MbeConsultationInput {
  question: string;
  student?: StudentDTO;
  language: string;
}

export interface IMbeExpertService {
  consult(input: MbeConsultationInput): Promise<MbeConsultation>;
  loadMbeDocumentFromUrl(url: string): Promise<{ chunks: number }>;
}
