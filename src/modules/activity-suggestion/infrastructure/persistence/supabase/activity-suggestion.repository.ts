import { getSupabaseClient } from "@/lib/supabase";
import { IActivitySuggestionRepository } from "../../../domain/interfaces/activity-suggestion-repository.interface";
import { CreateActivitySuggestionDTO } from "../../../application/dtos/create-activity-suggestion.dto";
import { ActivitySuggestion } from "../../../domain/activity-suggestion.entity";


export class SupabaseActivitySuggestionRepository implements IActivitySuggestionRepository {
    private tableName = 'activity_suggestions';

    private toDomain(record: any): ActivitySuggestion {
        return new ActivitySuggestion(
            record.id,
            record.student_id, // Supabase uses snake_case, but the entity expects ObjectId. This will need adjustment in a real scenario.
            record.topics,
            record.themes,
            new Date(record.created_at),
            new Date(record.updated_at)
        );
    }
    
    async create(data: CreateActivitySuggestionDTO): Promise<ActivitySuggestion> {
        const supabase = getSupabaseClient();
        const { data: result, error } = await supabase
            .from(this.tableName)
            .insert({
                student_id: data.studentId,
                topics: data.topics,
                themes: data.themes,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating activity suggestion in Supabase:", error);
            throw new Error("Failed to create activity suggestion.");
        }

        return this.toDomain(result);
    }
}
