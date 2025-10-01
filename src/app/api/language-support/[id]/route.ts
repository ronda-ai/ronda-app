
import { deleteSupportHandler, getSupportsForStudentHandler, updateSupportHandler } from "@/modules/language-support/interfaces/controllers/http/language-support.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getSupportsForStudentHandler, isTeacher);
export const PUT = withAuthorization(updateSupportHandler, isTeacher);
export const DELETE = withAuthorization(deleteSupportHandler, isTeacher);
