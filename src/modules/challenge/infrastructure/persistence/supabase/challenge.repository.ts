
import { getSupabaseClient } from "@/lib/supabase";
import { IChallengeRepository } from "../../../domain/interfaces/challenge-repository.interface";
import { CreateChallengeDTO } from "../../../application/dtos/create-challenge.dto";
import { UpdateChallengeDTO } from "../../../application/dtos/update-challenge.dto";
import { Challenge } from "../../../domain/challenge.entity";

export class SupabaseChallengeRepository implements IChallengeRepository {
    private tableName = 'challenges';

    private toDomain(record: any): Challenge {
        return new Challenge(
            record.id,
            record.student_id,
            record.challenge,
            record.tip,
            new Date(record.created_at),
            record.status,
            record.rating,
            record.feedback,
            record.attempts,
            record.ai_configuration,
            record.mood,
            record.selection_mode
        );
    }
    
    private fromDomain(data: Partial<CreateChallengeDTO | UpdateChallengeDTO>): any {
        const record: any = {};
        
        // Use type guards for properties that only exist on CreateChallengeDTO
        if ('challenge' in data && data.challenge) record.challenge = data.challenge;
        if ('tip' in data && data.tip) record.tip = data.tip;

        // These properties can exist on both or just UpdateChallengeDTO
        if (data.status) record.status = data.status;
        if (data.rating) record.rating = data.rating;
        if (data.feedback) record.feedback = data.feedback;
        if (data.attempts) record.attempts = data.attempts;
        if (data.aiConfiguration) record.ai_configuration = data.aiConfiguration;
        if (data.mood) record.mood = data.mood;
        if (data.selectionMode) record.selection_mode = data.selectionMode;

        if ('studentId' in data && data.studentId) {
            record.student_id = data.studentId;
        }

        return record;
    }

    async create(data: CreateChallengeDTO): Promise<Challenge> {
        const supabase = getSupabaseClient();
        const recordToInsert = this.fromDomain(data);
        const { data: result, error } = await supabase
            .from(this.tableName)
            .insert(recordToInsert)
            .select()
            .single();

        if (error) {
            console.error("Error creating challenge in Supabase:", error);
            throw new Error("Failed to create challenge.");
        }
        return this.toDomain(result);
    }

    async findAll(): Promise<Challenge[]> {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from(this.tableName).select('*').order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching all challenges from Supabase:", error);
            throw new Error("Failed to fetch challenges.");
        }
        return data.map(this.toDomain);
    }

    async findByStudentId(studentId: string): Promise<Challenge[]> {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.from(this.tableName).select('*').eq('student_id', studentId).order('created_at', { ascending: false });

        if (error) {
            console.error(`Error fetching challenges for student ${studentId} from Supabase:`, error);
            throw new Error("Failed to fetch challenges for student.");
        }
        return data.map(this.toDomain);
    }

    async update(id: string, data: UpdateChallengeDTO): Promise<Challenge | null> {
        const supabase = getSupabaseClient();
        const recordToUpdate = this.fromDomain(data);
        const { data: result, error } = await supabase
            .from(this.tableName)
            .update(recordToUpdate)
            .eq('id', id)
            .select()
            .single();
            
        if (error) {
            console.error(`Error updating challenge with id ${id} in Supabase:`, error);
            throw new Error("Failed to update challenge.");
        }
        return result ? this.toDomain(result) : null;
    }

    async deleteByStudentId(studentId: string): Promise<void> {
        const supabase = getSupabaseClient();
        const { error } = await supabase.from(this.tableName).delete().eq('student_id', studentId);

        if (error) {
            console.error(`Error deleting challenges for student ${studentId} from Supabase:`, error);
            throw new Error("Failed to delete challenges for student.");
        }
    }
}
