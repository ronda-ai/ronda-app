import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { improveObservationHandler } from "@/modules/improved-observation/interfaces/controllers/http/improved-observation.api.controller";

export const POST = withAuthorization(improveObservationHandler, isTeacher);
