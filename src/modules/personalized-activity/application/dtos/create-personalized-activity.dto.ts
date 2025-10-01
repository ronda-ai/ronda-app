
import { PersonalizedActivity } from "../../domain/personalized-activity.entity";

export type CreatePersonalizedActivityDTO = Omit<PersonalizedActivity, 'id' | 'createdAt' | 'updatedAt'>;
