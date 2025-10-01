

import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";
import { deletePactHandler, updatePactHandler } from "@/modules/digital-conviviality/interfaces/controllers/http/digital-conviviality.api.controller";

export const DELETE = withAuthorization(deletePactHandler, isTeacher);
export const PUT = withAuthorization(updatePactHandler, isTeacher);
