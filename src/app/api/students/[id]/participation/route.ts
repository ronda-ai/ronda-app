
import { addParticipationHandler, removeLastParticipationHandler } from "@/modules/participation/interfaces/controllers/http/participation.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const POST = withAuthorization(addParticipationHandler, isTeacher);
export const DELETE = withAuthorization(removeLastParticipationHandler, isTeacher);
