
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

export type AnonymizationMapping = Map<string, string>;

export interface AnonymizedData<T> {
  anonymizedData: T;
  mapping: AnonymizationMapping;
}

export interface IAnonymizationService {
  anonymize<T>(data: T, studentList: Partial<StudentDTO>[]): AnonymizedData<T>;
  deAnonymizeText(text: string, mapping: AnonymizationMapping): string;
}
