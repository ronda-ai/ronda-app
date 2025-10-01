
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { deleteRiskMapHandler } from "@/modules/educational-safety/interfaces/controllers/http/educational-safety.api.controller";

export const DELETE = withAuthorization(deleteRiskMapHandler, isTeacher);
