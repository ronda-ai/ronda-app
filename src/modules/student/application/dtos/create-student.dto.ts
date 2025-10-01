
import { Gender } from "../../domain/student.entity";

export interface CreateStudentDTO {
    name: string;
    qualities: string[];
    age?: number;
    notes?: string;
    fears?: string[];
    disability?: string;
    neurodiversity?: string;
    goodRelations?: string[];
    badRelations?: string[];
    isAbsent?: boolean;
    gender?: Gender;
}

    
