

import { CreateStudentDTO } from "../../application/dtos/create-student.dto";
import { StudentDTO } from "../../application/dtos/student.dto";
import { UpdateStudentDTO } from "../../application/dtos/update-student.dto";
import { Gender } from "../student.entity";


export interface IStudentService {
    getAllStudents(): Promise<StudentDTO[]>;
    getStudentById(id: string): Promise<StudentDTO | null>;
    getStudentByPublicId(publicId: string): Promise<StudentDTO | null>;
    getStudentByName(name: string): Promise<StudentDTO | null>;
    createStudent(createStudentDto: CreateStudentDTO): Promise<StudentDTO>;
    updateStudent(id: string, updateStudentDto: UpdateStudentDTO): Promise<StudentDTO | null>;
    deleteStudent(id: string): Promise<void>;
    generatePublicId(id: string, duration?: '24h' | '7d' | 'view-once' | 'never'): Promise<string | null>;
    updatePublicProfileTheme(publicId: string, themeName: string): Promise<void>;
    getParticipationInRange(startDate: string, endDate: string, studentIds: string[]): Promise<{ id: string; name: string; count: number }[]>;
    generateProfileSuggestion(input: { studentName: string, studentAge?: number, studentGender?: Gender, language: string, fieldType: 'qualities' | 'fears' | 'notes' }): Promise<{ suggestion: string }>;
}
