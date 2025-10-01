

import { Gender } from "../../domain/student.entity";
import { ChallengeHistoryDTO } from "@/modules/challenge/application/dtos/challenge-history.dto";
import { PersonalizedActivityDTO } from "@/modules/personalized-activity/application/dtos/personalized-activity.dto";
import { ObservationDTO } from "@/modules/observation/application/dtos/observation.dto";
import { SupportPlanDTO } from "@/modules/support-plan/application/dtos/support-plan.dto";
import { FearManagementSuggestionDTO } from "@/modules/fear-management-suggestion/application/dtos/fear-management-suggestion.dto";

export interface StudentDTO {
    id: string;
    name: string;
    participation: number;
    qualities: string[];
    age?: number;
    notes?: string;
    fears?: string[];
    disability?: string;
    neurodiversity?: string;
    goodRelations?: string[];
    badRelations?: string[];
    isAbsent: boolean;
    gender?: Gender;
    publicId?: string | null;
    publicIdExpiresAt?: Date | null;
    publicIdViewed?: boolean;
    isUniqueViewActive?: boolean;
    publicTheme?: string;
    challengeHistory: ChallengeHistoryDTO[];
    personalizedActivities: PersonalizedActivityDTO[];
    observations: ObservationDTO[];
    supportPlans: SupportPlanDTO[];
    fearManagementSuggestions: FearManagementSuggestionDTO[];
}
