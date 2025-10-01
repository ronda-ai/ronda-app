

import { Gender } from "../../domain/student.entity";

export interface UpdateStudentDTO {
    name?: string;
    participation?: number;
    qualities?: string[];
    age?: number;
    notes?: string;
    fears?: string[];
    disability?: string;
    neurodiversity?: string;
    goodRelations?: string[];
    badRelations?: string[];
    isAbsent?: boolean;
    gender?: Gender;
    publicId?: string | null;
    publicIdExpiresAt?: Date | null;
    publicIdViewed?: boolean;
    isUniqueViewActive?: boolean;
    publicTheme?: string;
}
