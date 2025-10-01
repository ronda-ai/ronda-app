
import { CreatePersonalizedActivityDTO } from "../../application/dtos/create-personalized-activity.dto";
import { PersonalizedActivity } from "../personalized-activity.entity";

export interface IPersonalizedActivityRepository {
    create(data: CreatePersonalizedActivityDTO): Promise<PersonalizedActivity>;
    findByStudentId(studentId: string): Promise<PersonalizedActivity[]>;
    findAll(): Promise<PersonalizedActivity[]>;
    findById(id: string): Promise<PersonalizedActivity | null>;
    update(id: string, data: Partial<Omit<PersonalizedActivity, 'id' | 'studentId' | 'createdAt' | 'updatedAt'>>): Promise<PersonalizedActivity | null>;
    delete(id: string): Promise<void>;
}
