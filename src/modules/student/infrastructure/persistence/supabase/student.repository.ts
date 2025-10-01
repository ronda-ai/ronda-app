
import { getSupabaseClient } from "@/lib/supabase";
import { IStudentRepository } from "../../../domain/interfaces/student-repository.interface";
import { UpdateStudentDTO } from "../../../application/dtos/update-student.dto";
import { Student } from "../../../domain/student.entity";
import { CreateStudentDTO } from "@/modules/student/application/dtos/create-student.dto";

export class SupabaseStudentRepository implements IStudentRepository {
    private tableName = 'students';

    private toDomain(record: any): Student {
        return new Student(
            record.id,
            record.name,
            record.qualities || [],
            record.age,
            record.notes,
            record.fears || [],
            record.disability,
            record.neurodiversity,
            record.good_relations || [], // Supabase uses snake_case
            record.bad_relations || [],  // Supabase uses snake_case
            record.is_absent,
            record.gender,
            record.public_id,
            record.public_id_expires_at ? new Date(record.public_id_expires_at) : null,
            record.public_id_viewed,
            record.is_unique_view_active,
            record.public_theme
        );
    }
    
    private fromDomain(student: Partial<CreateStudentDTO | UpdateStudentDTO>): any {
        const record: any = {};
        if (student.name) record.name = student.name;
        if (student.qualities) record.qualities = student.qualities;
        if (student.age) record.age = student.age;
        if (student.notes) record.notes = student.notes;
        if (student.fears) record.fears = student.fears;
        if (student.disability) record.disability = student.disability;
        if (student.neurodiversity) record.neurodiversity = student.neurodiversity;
        if (student.goodRelations) record.good_relations = student.goodRelations;
        if (student.badRelations) record.bad_relations = student.badRelations;
        if (student.isAbsent !== undefined) record.is_absent = student.isAbsent;
        if (student.gender) record.gender = student.gender;
        
        const updateDto = student as Partial<UpdateStudentDTO>;
        if (updateDto.publicId !== undefined) record.public_id = updateDto.publicId;
        if (updateDto.publicIdExpiresAt !== undefined) record.public_id_expires_at = updateDto.publicIdExpiresAt;
        if (updateDto.publicIdViewed !== undefined) record.public_id_viewed = updateDto.publicIdViewed;
        if (updateDto.isUniqueViewActive !== undefined) record.is_unique_view_active = updateDto.isUniqueViewActive;
        if (updateDto.publicTheme) record.public_theme = updateDto.publicTheme;

        return record;
    }


    async findAll(): Promise<Student[]> {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from(this.tableName).select('*').order('name', { ascending: true });
        if (error) {
            console.error("Error fetching all students from Supabase:", error);
            throw new Error("Failed to fetch students.");
        }
        return data.map(this.toDomain);
    }

    async findById(id: any): Promise<Student | null> {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from(this.tableName).select('*').eq('id', id).single();
        if (error && error.code !== 'PGRST116') { // PGRST116: "exact one row not found"
            console.error(`Error fetching student with id ${id} from Supabase:`, error);
            throw new Error("Failed to fetch student.");
        }
        return data ? this.toDomain(data) : null;
    }

    async findByPublicId(publicId: string): Promise<Student | null> {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from(this.tableName).select('*').eq('public_id', publicId).single();
         if (error && error.code !== 'PGRST116') {
            console.error(`Error fetching student with publicId ${publicId} from Supabase:`, error);
            throw new Error("Failed to fetch student by public ID.");
        }
        return data ? this.toDomain(data) : null;
    }

    async findByName(name: string): Promise<Student | null> {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from(this.tableName).select('*').eq('name', name).single();
         if (error && error.code !== 'PGRST116') {
            console.error(`Error fetching student with name ${name} from Supabase:`, error);
            throw new Error("Failed to fetch student by name.");
        }
        return data ? this.toDomain(data) : null;
    }

    async create(studentData: CreateStudentDTO): Promise<Student> {
        const supabase = getSupabaseClient();
        const recordToInsert = this.fromDomain(studentData);
        const { data, error } = await supabase.from(this.tableName).insert(recordToInsert).select().single();
        if (error) {
            console.error("Error creating student in Supabase:", error);
            throw new Error("Failed to create student.");
        }
        return this.toDomain(data);
    }

    async update(id: any, studentData: UpdateStudentDTO): Promise<Student | null> {
        const supabase = getSupabaseClient();
        const recordToUpdate = this.fromDomain(studentData);
        const { data, error } = await supabase.from(this.tableName).update(recordToUpdate).eq('id', id).select().single();
         if (error) {
            console.error(`Error updating student with id ${id} in Supabase:`, error);
            throw new Error("Failed to update student.");
        }
        return data ? this.toDomain(data) : null;
    }

    async delete(id: any): Promise<void> {
        const supabase = getSupabaseClient();
        const { error } = await supabase.from(this.tableName).delete().eq('id', id);
        if (error) {
            console.error(`Error deleting student with id ${id} from Supabase:`, error);
            throw new Error("Failed to delete student.");
        }
    }
}
