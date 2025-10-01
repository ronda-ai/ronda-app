
import { CreateCurriculumActivityDTO } from "../../application/dtos/create-curriculum-activity.dto";
import { CurriculumActivity } from "../curriculum-activity.entity";


export interface ICurriculumActivityRepository {
    create(data: CreateCurriculumActivityDTO): Promise<CurriculumActivity>;
    findAll(): Promise<CurriculumActivity[]>;
    findById(id: string): Promise<CurriculumActivity | null>;
    update(id: string, data: Partial<CurriculumActivity>): Promise<CurriculumActivity | null>;
    delete(id: string): Promise<void>;
}
