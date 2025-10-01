
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { deleteProtocolHandler } from "@/modules/educational-safety/interfaces/controllers/http/educational-safety.api.controller";

export const DELETE = withAuthorization(deleteProtocolHandler, isTeacher);
