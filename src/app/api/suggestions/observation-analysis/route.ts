import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { analyzeObservationHandler } from "@/modules/observation/interfaces/controllers/http/observation.api.controller";

export const POST = withAuthorization(analyzeObservationHandler, isTeacher);
