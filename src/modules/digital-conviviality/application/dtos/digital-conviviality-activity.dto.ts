
import { ActivityType } from "@/ai/flows/generate-digital-conviviality-activity";

export interface DigitalConvivialityActivityDTO {
    id: string;
    title: string;
    introduction: string;
    materials: string[];
    pedagogicalObjectives: string[];
    steps: string[];
    studentInstructions: string;
    activityType: ActivityType;
    customPrompt?: string;
    createdAt: string;
}
