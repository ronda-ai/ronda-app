

import { IndividualRelationshipStrategy } from "../../domain/individual-relationship-strategy.entity";
import { StrategyStatus } from "./individual-relationship-strategy.dto";

export type CreateIndividualRelationshipStrategyDTO = Omit<IndividualRelationshipStrategy, 'id' | 'createdAt' | 'updatedAt' | 'studentId' | 'status'> & {
    studentId: string;
};
