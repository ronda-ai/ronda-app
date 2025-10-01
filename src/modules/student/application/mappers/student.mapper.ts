

import { Student } from "../../domain/student.entity";
import { StudentDTO } from "../dtos/student.dto";
import { CreateStudentDTO } from "../dtos/create-student.dto";

export class StudentMapper {
    public static toDTO(student: Student): Omit<StudentDTO, 'challengeHistory' | 'participation' | 'personalizedActivities' | 'observations' | 'supportPlans' | 'fearManagementSuggestions'> {
        return {
            id: student.id,
            name: student.name,
            qualities: student.qualities,
            age: student.age,
            notes: student.notes,
            fears: student.fears,
            disability: student.disability,
            neurodiversity: student.neurodiversity,
            goodRelations: (student.goodRelations || []).map(id => id.toString()),
            badRelations: (student.badRelations || []).map(id => id.toString()),
            isAbsent: student.isAbsent,
            gender: student.gender,
            publicId: student.publicId,
            publicIdExpiresAt: student.publicIdExpiresAt || null,
            publicIdViewed: student.publicIdViewed,
            isUniqueViewActive: student.isUniqueViewActive,
            publicTheme: student.publicTheme,
        };
    }

    public static toDomain(dto: CreateStudentDTO): Omit<Student, 'id' | 'participation' | 'challengeHistory'> {
        return {
            name: dto.name,
            qualities: dto.qualities,
            age: dto.age,
            notes: dto.notes,
            fears: dto.fears,
            disability: dto.disability,
            neurodiversity: dto.neurodiversity,
            goodRelations: dto.goodRelations || [],
            badRelations: dto.badRelations || [],
            isAbsent: dto.isAbsent || false,
            gender: dto.gender,
            publicId: undefined, // Let the service handle publicId generation
            publicIdExpiresAt: null,
            publicIdViewed: false,
            isUniqueViewActive: false,
            publicTheme: undefined,
        };
    }
}
