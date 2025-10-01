

import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { createStrategyHandler, getStrategiesForStudentHandler, deleteStrategyHandler, updateStrategyHandler } from "@/modules/individual-relationship-strategy/interfaces/controllers/http/individual-relationship-strategy.api.controller";

export const POST = withAuthorization(createStrategyHandler, isTeacher);
export const GET = withAuthorization(getStrategiesForStudentHandler, isTeacher);
export const DELETE = withAuthorization(deleteStrategyHandler, isTeacher);
export const PUT = withAuthorization(updateStrategyHandler, isTeacher);
