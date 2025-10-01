
import { getObservationsForStudentHandler } from "@/modules/observation/interfaces/controllers/http/observation.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getObservationsForStudentHandler, isTeacher);
