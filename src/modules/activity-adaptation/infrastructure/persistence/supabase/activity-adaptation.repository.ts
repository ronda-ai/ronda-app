
import { getSupabaseClient } from "@/lib/supabase";
import { IActivityAdaptationRepository } from "../../../domain/interfaces/activity-adaptation-repository.interface";
import { CreateActivityAdaptationDTO } from "../../../application/dtos/create-activity-adaptation.dto";
import { ActivityAdaptation } from "../../../domain/activity-adaptation.entity";

export class SupabaseActivityAdaptationRepository implements IActivityAdaptationRepository {
    private tableName = 'activity_adaptations';

    private toDomain(record: any): ActivityAdaptation {
        return new ActivityAdaptation(
            record.id,
            record.original_activity,
            record.suggestions,
            new Date(record.created_at),
            new Date(record.updated_at),
            record.age_or_grade,
            record.country,
            record.subject
        );
    }

    async create(data: CreateActivityAdaptationDTO): Promise<ActivityAdaptation> {
        const supabase = getSupabaseClient();
        const { data: result, error } = await supabase
            .from(this.tableName)
            .insert({
                original_activity: data.originalActivity,
                suggestions: data.suggestions,
                age_or_grade: data.ageOrGrade,
                country: data.country,
                subject: data.subject,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating activity adaptation in Supabase:", error);
            throw new Error("Failed to create activity adaptation.");
        }

        return this.toDomain(result);
    }

    async findAll(): Promise<ActivityAdaptation[]> {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching activity adaptations from Supabase:", error);
            throw new Error("Failed to fetch activity adaptations.");
        }

        return data.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        const supabase = getSupabaseClient();
        const { error } = await supabase
            .from(this.tableName)
            .delete()
            .eq('id', id);

        if (error) {
            console.error(`Error deleting activity adaptation with id ${id} from Supabase:`, error);
            throw new Error("Failed to delete activity adaptation.");
        }
    }
}
