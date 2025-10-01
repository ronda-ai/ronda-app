

import { CurriculumActivity } from "../../domain/curriculum-activity.entity";

export type CreateCurriculumActivityDTO = Partial<Omit<CurriculumActivity, 'id' | 'createdAt' | 'updatedAt'>>;
