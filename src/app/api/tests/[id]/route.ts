
import { deleteTestHandler, getTestByIdHandler } from "@/modules/test/interfaces/controllers/http/test.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getTestByIdHandler, isTeacher);
export const DELETE = withAuthorization(deleteTestHandler, isTeacher);
