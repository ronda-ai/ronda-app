
import { getTestResultsHandler } from "@/modules/test-submission/interfaces/controllers/http/test-submission.api.controller";
import { withAuthorization } from "@/lib/middleware/withAuthorization";
import { isTeacher } from "@/lib/policies/common.policies";


export const GET = withAuthorization(getTestResultsHandler, isTeacher);
