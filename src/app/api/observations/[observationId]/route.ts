
import { deleteObservationHandler } from "@/modules/observation/interfaces/controllers/http/observation.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const DELETE = withAuthorization(deleteObservationHandler, isTeacher);
