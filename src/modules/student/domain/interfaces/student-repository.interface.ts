
import { UpdateStudentDTO } from "../../application/dtos/update-student.dto";
import { Student } from "../student.entity";

export interface IStudentRepository {
    findAll(): Promise<Student[]>;
    findById(id: any): Promise<Student | null>;
    findByPublicId(publicId: string): Promise<Student | null>;
    findByName(name: string): Promise<Student | null>;
    create(student: Omit<Student, 'id' | 'participation'>): Promise<Student>;
    update(id: any, student: UpdateStudentDTO): Promise<Student | null>;
    delete(id: any): Promise<void>;
}
