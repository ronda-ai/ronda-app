
import { getAllTestsHandler, createTestHandler, updateTestHandler } from "@/modules/test/interfaces/controllers/http/test.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";

export const GET = withAuthorization(getAllTestsHandler, isTeacher);
export const POST = withAuthorization(createTestHandler, isTeacher);
export const PUT = withAuthorization(updateTestHandler, isTeacher);
