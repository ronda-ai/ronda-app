
import { DigitalConvivialityActivity } from "../../domain/digital-conviviality.entity";

export type CreateDigitalConvivialityActivityDTO = Omit<DigitalConvivialityActivity, 'id' | 'createdAt' | 'updatedAt'>;
