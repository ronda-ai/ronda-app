import { getSupabaseClient } from "@/lib/supabase";
import { IAttendanceRepository } from "../../../domain/interfaces/attendance-repository.interface";
import { SetAttendanceDTO } from "../../../application/dtos/set-attendance.dto";
import { Attendance } from "../../../domain/attendance.entity";
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

export class SupabaseAttendanceRepository implements IAttendanceRepository {
    private tableName = 'attendance';

    private toDomain(record: any): Attendance {
        return new Attendance(
            record.id,
            record.student_id,
            new Date(record.date),
            record.status,
            new Date(record.created_at),
            new Date(record.updated_at)
        );
    }
    
    async set(data: SetAttendanceDTO): Promise<Attendance> {
        const supabase = getSupabaseClient();
        const date = format(new Date(data.date), 'yyyy-MM-dd');
        
        const { data: existing, error: findError } = await supabase
            .from(this.tableName)
            .select('id')
            .eq('student_id', data.studentId)
            .eq('date', date)
            .single();

        if (findError && findError.code !== 'PGRST116') { // PGRST116: No rows found
             console.error("Error finding attendance in Supabase:", findError);
             throw new Error("Failed to set attendance.");
        }

        const recordToUpsert = {
            student_id: data.studentId,
            date: date,
            status: data.status,
        };

        if (existing) {
            const { data: result, error } = await supabase
                .from(this.tableName)
                .update(recordToUpsert)
                .eq('id', existing.id)
                .select()
                .single();
            if (error) {
                 console.error("Error updating attendance in Supabase:", error);
                 throw new Error("Failed to update attendance.");
            }
            return this.toDomain(result);
        } else {
             const { data: result, error } = await supabase
                .from(this.tableName)
                .insert(recordToUpsert)
                .select()
                .single();
            if (error) {
                 console.error("Error creating attendance in Supabase:", error);
                 throw new Error("Failed to create attendance.");
            }
            return this.toDomain(result);
        }
    }
    
    async setBulk(data: SetAttendanceDTO[]): Promise<void> {
        const supabase = getSupabaseClient();
        const recordsToUpsert = data.map(item => ({
            student_id: item.studentId,
            date: format(new Date(item.date), 'yyyy-MM-dd'),
            status: item.status,
        }));

        const { error } = await supabase.from(this.tableName).upsert(recordsToUpsert, {
            onConflict: 'student_id,date'
        });

        if (error) {
            console.error("Error bulk setting attendance in Supabase:", error);
            throw new Error("Failed to bulk set attendance.");
        }
    }
    
    async findByDate(date: Date): Promise<Attendance[]> {
        const supabase = getSupabaseClient();
        const formattedDate = format(date, 'yyyy-MM-dd');
        const { data: records, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('date', formattedDate);
        
        if (error) {
            console.error("Error finding attendance by date in Supabase:", error);
            throw new Error("Failed to find attendance by date.");
        }
        return records.map(this.toDomain);
    }
    
    async findByStudentAndDate(studentId: string, date: Date): Promise<Attendance | null> {
        const supabase = getSupabaseClient();
        const formattedDate = format(date, 'yyyy-MM-dd');
        const { data: record, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('student_id', studentId)
            .eq('date', formattedDate)
            .single();

        if (error && error.code !== 'PGRST116') {
             console.error("Error finding attendance by student and date in Supabase:", error);
             throw new Error("Failed to find attendance.");
        }
        return record ? this.toDomain(record) : null;
    }
    
    async findByMonth(month: number, year: number): Promise<Attendance[]> {
        const supabase = getSupabaseClient();
        const startDate = format(startOfMonth(new Date(year, month)), 'yyyy-MM-dd');
        const endDate = format(endOfMonth(new Date(year, month)), 'yyyy-MM-dd');
        
        const { data: records, error } = await supabase
            .from(this.tableName)
            .select('*')
            .gte('date', startDate)
            .lte('date', endDate);

        if (error) {
            console.error("Error finding attendance by month in Supabase:", error);
            throw new Error("Failed to find attendance by month.");
        }
        return records.map(this.toDomain);
    }
    
    async findByDateRange(startDate: Date, endDate: Date, studentIds?: string[] | undefined): Promise<Attendance[]> {
        const supabase = getSupabaseClient();
        let query = supabase
            .from(this.tableName)
            .select('*')
            .gte('date', format(startDate, 'yyyy-MM-dd'))
            .lte('date', format(endDate, 'yyyy-MM-dd'));
            
        if (studentIds && studentIds.length > 0) {
            query = query.in('student_id', studentIds);
        }

        const { data: records, error } = await query;
        
        if (error) {
            console.error("Error finding attendance by date range in Supabase:", error);
            throw new Error("Failed to find attendance by date range.");
        }
        return records.map(this.toDomain);
    }
}
