
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { adjustStrategyHandler } from "@/modules/individual-relationship-strategy/interfaces/controllers/http/individual-relationship-strategy.api.controller";

export const POST = withAuthorization(adjustStrategyHandler, isTeacher);
