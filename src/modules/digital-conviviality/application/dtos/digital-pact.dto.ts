

import { DigitalPact } from "../../domain/digital-conviviality.entity";

export type DigitalPactDTO = Omit<DigitalPact, 'createdAt' | 'updatedAt' | 'publishedAt'> & {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
};
