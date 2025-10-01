
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { getAllRiskMapsHandler } from "@/modules/educational-safety/interfaces/controllers/http/educational-safety.api.controller";

export const GET = withAuthorization(getAllRiskMapsHandler, isTeacher);
